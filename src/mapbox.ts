import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
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
  const lng = ref()
  const lat = ref()
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
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
        },
      })

      // Add label layer
      map?.addLayer({
        id: 'marker-labels',
        type: 'symbol',
        source: 'items',
        layout: {
          'text-field': ['get', 'description'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-variable-anchor': ['top'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'icon-image': ['get', 'icon'],
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
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff',
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

  const moveToSelectedPosition = () => {
    map?.on('click', (e: MapMouseEvent) => {
      map?.flyTo({ center: e.lngLat })
      lng.value = e.lngLat.lng
      lat.value = e.lngLat.lat
    })
  }

  const addMarker = async (lng: number, lat: number, name: string) => {
    // Create a new marker.
    const { items, createItem } = usePocketBase()

    const newItem = {
      date: new Date().toISOString(),
      lastForaged: new Date().toISOString(),
      lng,
      lat,
      name,
    }

    await createItem(newItem)

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
  }

  const returnHome = (home: LngLatLike) => {
    map?.flyTo({ center: home })
  }

  return {
    map,
    lat,
    lng,
    initMapbox,
    moveToSelectedPosition,
    addMarker,
    returnHome,
    addinitMarkers,
  }
}

const storeKey: InjectionKey<ReturnType<typeof mapBoxStore>> = Symbol('mapbox-store')

export function provideMapboxStore(vars?: Mapbox) {
  const store = mapBoxStore(vars)
  provide(storeKey, store)
  return store
}

export function injectMapboxStore() {
  return inject(storeKey)!
}
