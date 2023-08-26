import type { GeoJSONSource, LngLatLike, MapMouseEvent } from 'mapbox-gl'
import type { Feature } from 'geojson'
import mapboxgl from 'mapbox-gl'
import { usePocketBase } from './pocketbase'
import type { ItemsRecord } from './pocketbase-types'

const accessToken = import.meta.env.VITE_MAPBOX_KEY
mapboxgl.accessToken = accessToken

interface Mapbox {
  home?: LngLatLike
  container: string
}

let map: mapboxgl.Map | undefined

export function mapBoxStore(vars?: Mapbox) {
  const translateItemToLayerItem = (items: ItemsRecord[]) => {
    const records = ref<Feature[]>([])
    items?.forEach((item) => {
      if (item.lng && item.lat && item.name) {
        records.value.push({
          type: 'Feature',
          properties: {
            description: item.name,
          },
          geometry: {
            type: 'Point',
            coordinates: [item.lng, item.lat],
          },
        })
      }
    })

    return records.value
  }
  const addinitMarkers = async () => {
    const { items, getItems } = usePocketBase()

    await getItems()

    const itemLayer = ref<Feature[]>([])

    if (items.value)
      itemLayer.value = translateItemToLayerItem(items.value)

    return itemLayer.value
  }

  const initMapbox = async () => {
    map = new mapboxgl.Map({
      container: vars!.container,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: vars!.home,
      zoom: 12,
    })

    const markers = await addinitMarkers()

    map.on('load', () => {
      map?.addSource('items', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers,
        },
        cluster: true,
        clusterMaxZoom: 12,
        clusterRadius: 50,
      })

      map?.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'items',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      })
      // Add clustering layer
      map?.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'items',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      })

      // Add count layer
      map?.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'items',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      })
    })
  }

  const addMarker = async () => {
    // Create a new marker.
    map?.on('click', async (e: MapMouseEvent) => {
      map?.flyTo({ center: e.lngLat })

      const { items, createItem } = usePocketBase()

      const newItem = {
        date: new Date().toISOString(),
        lastForaged: new Date().toISOString(),
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        name: 'date-test',
      }

      await createItem(newItem)

      items.value?.push(newItem)

      // Get the GeoJSON source by ID
      const source = map?.getSource('items') as mapboxgl.GeoJSONSource

      // Add the new feature to the source's data

      const itemLayer = ref<Feature[]>([])

      if (items.value)
        itemLayer.value = translateItemToLayerItem(items.value)

      source.setData({
        type: 'FeatureCollection',
        features: itemLayer.value,
      })
    })
  }

  const returnHome = (home: LngLatLike) => {
    map?.flyTo({ center: home })
  }

  return {
    map,
    initMapbox,
    addMarker,
    returnHome,
    addinitMarkers,
  }
}
