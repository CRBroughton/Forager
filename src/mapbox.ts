import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
import type { Feature } from 'geojson'
import mapboxgl from 'mapbox-gl'
import type { AuthModel } from 'pocketbase'
import { usePocketBase } from './pocketbase'
import type { ItemsRecordWithID } from './types'
import { createLayers } from './mapbox/layers'
import { createGeolocator } from './mapbox/geoLocator'

const accessToken = import.meta.env.VITE_MAPBOX_KEY
mapboxgl.accessToken = accessToken

interface Mapbox {
  home?: LngLatLike
  container: string
}

let map: mapboxgl.Map | undefined

export function mapBoxStore(vars?: Mapbox, user?: AuthModel) {
  const lng = ref()
  const lat = ref()
  const markerUIHidden = ref(true)
  const selectedItem = ref()
  const detailsHidden = ref(true)
  const items = ref<ItemsRecordWithID[]>([])

  const translateItemToLayerItem = (items: ItemsRecordWithID[]) => {
    const records = ref<Feature[]>([])

    const setItemForageColour = (item: ItemsRecordWithID) => {
      const today = new Date().toLocaleDateString()
      const foragedDate = new Date(item.lastForaged!).toLocaleDateString()

      if (item.colour && foragedDate !== today)
        return item.colour

      if (item.lastForaged) {
        if (today === foragedDate)
          return 'gray'
      }

      return 'gray'
    }

    items?.forEach((item) => {
      if (item.lng && item.lat && item.name) {
        records.value.push({
          type: 'Feature',
          properties: {
            id: item.id,
            description: item.name,
            colour: setItemForageColour(item),
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
    const { getItems } = usePocketBase()

    items.value = await getItems()

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
      zoom: user?.lat === 0 && user?.lng === 0 ? 2 : 14,
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


      // const { getRoute } = usePocketBase()
      // const lineCoords = await getRoute('4t2ttp1beq31p2r')

      // map?.addSource('routes', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [
      //       {
      //         type: 'Feature',
      //         properties: {},
      //         geometry: {
      //           type: 'LineString',
      //           coordinates: lineCoords?.points.coords,
      //         },
      //       },
      //     ],
      //   },
      // })

      if (map) {
        createLayers(map)
        createGeolocator(map)
      }
    })

    const state = useStorage('forager-store', {
      map3D: false,
    })

    if (map && state.value.map3D) {
      map.on('style.load', () => {
        map?.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        })
        // add the DEM source as a terrain layer with exaggerated height
        map?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 })
      })

    }
    map.on('click', async (e: MapMouseEvent) => {
      if (user?.lat === 0 && user?.lng === 0) {
        const { setUserLocation } = usePocketBase()
        await setUserLocation(e.lngLat)
        map?.flyTo({ center: e.lngLat, zoom: 14 })
        lng.value = e.lngLat.lng
        lat.value = e.lngLat.lat
        user.lat = e.lngLat.lat
        user.lng = e.lngLat.lng
        return
      }
      markerUIHidden.value = false
      map?.flyTo({ center: e.lngLat })
      lng.value = e.lngLat.lng
      lat.value = e.lngLat.lat
    })

    map.on('click', 'unclustered-point', async (e) => {
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

  const addMarker = async (lng: number, lat: number, name: string, colour: string, startMonth: string, endMonth: string, imageURL: string) => {
    // Create a new marker.
    const settingsStore = usePocketBase()

    const newItem = {
      date: new Date().toISOString(),
      lastForaged: undefined,
      lng,
      lat,
      name,
      owner: settingsStore.user?.id,
      colour,
      startMonth,
      endMonth,
      imageURL,
    }

    await settingsStore.createItem(newItem)
    items.value = await settingsStore.getItems()

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
    const { getItems, deleteItem } = usePocketBase()

    await deleteItem(id)

    items.value = await getItems()

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

  const updateMarkerLayer = async () => {
    const { getItems } = usePocketBase()

    items.value = await getItems()

    const itemLayer = ref<Feature[]>([])

    const source = map?.getSource('items') as mapboxgl.GeoJSONSource

    if (items.value)
      itemLayer.value = translateItemToLayerItem(items.value)

    source.setData({
      type: 'FeatureCollection',
      features: itemLayer.value,
    })
  }

  const returnHome = () => {
    const settingsStore = usePocketBase()
    map?.flyTo({ center: [settingsStore.user?.lng, settingsStore.user?.lat], zoom: 14 })
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
    items,
    updateMarkerLayer,
  }
}

const storeKey: InjectionKey<ReturnType<typeof mapBoxStore>> = Symbol('mapbox-store')

export function provideMapboxStore(vars?: Mapbox, user?: AuthModel) {
  const store = mapBoxStore(vars, user)
  provide(storeKey, store)
  return store
}

export function injectMapboxStore() {
  return inject(storeKey)!
}
