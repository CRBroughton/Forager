import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
import type { Feature } from 'geojson'
import mapboxgl from 'mapbox-gl'
import { usePocketBase } from './pocketbase'
import type { ItemsRecordWithID } from './types'

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
  const markerUIHidden = ref(true)
  const selectedItem = ref()
  const detailsHidden = ref(true)

  const translateItemToLayerItem = (items: ItemsRecordWithID[]) => {
    const records = ref<Feature[]>([])
    items?.forEach((item) => {
      if (item.lng && item.lat && item.name) {
        records.value.push({
          type: 'Feature',
          properties: {
            id: item.id,
            description: item.name,
            colour: item.colour,
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
      zoom: 14,
    })

    map.on('load', async () => {
      const markers = await addinitMarkers()

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
          // Color circles by ethnicity, using a `match` expression.
          'circle-color': [
            'match',
            ['get', 'colour'],
            'blue',
            'blue',
            'red',
            'red',
            'purple',
            'purple',
            'orange',
            'orange',
            'deeppink',
            'deeppink',
            'cadetblue',
            'cadetblue',
            /* other */ '#ccc',
          ],
          'circle-radius': 8,
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

      const geoLocator = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },

        trackUserLocation: true,
        showUserHeading: true,
        showUserLocation: true,
        showAccuracyCircle: false,

      })

      map?.addControl(
        geoLocator,
      )

      geoLocator.on('geolocate', () => {
        map?.flyTo({
          zoom: map.getZoom(),
        })
      })
    })

    map?.on('click', (e: MapMouseEvent) => {
      markerUIHidden.value = false
      map?.flyTo({ center: e.lngLat })
      lng.value = e.lngLat.lng
      lat.value = e.lngLat.lat
    })

    map?.on('click', 'unclustered-point', async (e) => {
      markerUIHidden.value = true
      detailsHidden.value = false
      selectedItem.value = e.features![0].properties!.id
    })

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'unclustered-point', () => {
      if (map)
        map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'unclustered-point', () => {
      if (map)
        map.getCanvas().style.cursor = ''
    })
  }

  const addMarker = async (lng: number, lat: number, name: string, colour: string) => {
    // Create a new marker.
    const { items, createItem, user } = usePocketBase()

    const newItem = {
      date: new Date().toISOString(),
      lastForaged: new Date().toISOString(),
      lng,
      lat,
      name,
      owners: [user.value!.id],
      colour,
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

  const deleteMarker = async (id: string) => {
    const { items, getItems, deleteItem } = usePocketBase()

    await deleteItem(id)

    await getItems()

    const itemLayer = ref<Feature[]>([])

    // Get the GeoJSON source by ID
    const source = map?.getSource('items') as mapboxgl.GeoJSONSource

    if (items.value)
      itemLayer.value = translateItemToLayerItem(items.value)

    source.setData({
      type: 'FeatureCollection',
      features: itemLayer.value,
    })
  }

  const returnHome = () => {
    const { user } = usePocketBase()
    map?.flyTo({ center: [user.value?.lng, user.value?.lat], zoom: 14 })
  }

  return {
    map,
    lat,
    lng,
    initMapbox,
    addMarker,
    returnHome,
    addinitMarkers,
    markerUIHidden,
    selectedItem,
    deleteMarker,
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
