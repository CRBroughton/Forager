import type { MapMouseEvent } from 'mapbox-gl'
import type { Feature } from 'geojson'
import mapboxgl from 'mapbox-gl'
import { usePocketBase } from './pocketbase'
import type { ItemsRecordWithID, LandmarksRecordWithID, UserImage } from './types'
import { createLandmarks, createLayers } from './mapbox/layers'
import { createGeolocator } from './mapbox/geoLocator'
import type { LandmarksRecord } from './pocketbase-types'


export const useMapbox = defineStore('mapbox-store', () => {
  const userStore = usePocketBase()
  mapboxgl.accessToken = userStore.user?.mapboxAPIKey
  let map: mapboxgl.Map | undefined
  const lng = ref(0)
  const lat = ref(0)
  const markerUIHidden = ref(true)
  const selectedItem = ref<string | undefined>(undefined)
  const selectedCollection = ref('')
  const detailsHidden = ref(true)
  const items = ref<ItemsRecordWithID[] | null>(null)
  const landmarks = ref<LandmarksRecordWithID[]>([])

  const translateItemToLayerItem = (items: ItemsRecordWithID[] | LandmarksRecordWithID[]) => {
    const records = ref<Feature[]>([])

    const setItemForageColour = (item: ItemsRecordWithID & LandmarksRecordWithID) => {
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

    const checkIfItemOrLandmark = (item: ItemsRecordWithID | LandmarksRecordWithID) => {
      if ('lastForaged' in item)
        return setItemForageColour(item)
      return ''
    }

    items?.forEach((item) => {
      if (item.lng && item.lat && item.name) {
        records.value.push({
          type: 'Feature',

          properties: {
            id: item.id,
            description: item.name,
            colour: checkIfItemOrLandmark(item),
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

  const addinitLandmark = async () => {
    const { getLandmarks } = usePocketBase()

    landmarks.value = await getLandmarks()

    const itemLayer = ref<Feature[]>([])

    if (landmarks.value)
      itemLayer.value = translateItemToLayerItem(landmarks.value)

    return itemLayer.value
  }


  const initMapbox = async () => {
    const pocketbaseStore = usePocketBase()
    const { user } = storeToRefs(pocketbaseStore)
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [user?.value?.lng, user?.value?.lat] ?? [0, 0],
      zoom: user?.value?.lat === 0 && user?.value?.lng === 0 ? 2 : 14,
    })

    map.on('load', async () => {
      const markers = await addinitMarkers()
      const landmarks = await addinitLandmark()

      map?.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error)
            throw error
          map?.addImage('custom-marker', image as HTMLImageElement)

          map?.addSource('landmarks', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: landmarks,
            },
          })

          if (map) 
            createLandmarks(map)
        })

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
      if (user.value?.lat === 0 && user.value.lng === 0) {
        const { setUserLocation } = usePocketBase()
        await setUserLocation(e.lngLat)
        map?.flyTo({ center: e.lngLat, zoom: 14 })
        lng.value = e.lngLat.lng
        lat.value = e.lngLat.lat
        user.value!.lat = e.lngLat.lat
        user.value!.lng = e.lngLat.lng
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
      selectedCollection.value = 'items'
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

    map.on('click', 'landmark', async (e) => {
      markerUIHidden.value = true
      detailsHidden.value = false
      selectedItem.value = e.features![0].properties!.id
      selectedCollection.value = 'landmarks'
    })
    map.on('mouseenter', 'landmark', () => {
      if (map) 
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'landmark', () => {
      if (map) 
        map.getCanvas().style.cursor = ''
    })
  }

  const addLandmark = async (landmark: Omit<LandmarksRecord, 'owner'>) => {
    const settingsStore = usePocketBase()

    const newLandmark = {
      ...landmark,
      owner: settingsStore.user?.id,
    }

    await settingsStore.createLandmark(newLandmark)

    landmarks.value = await settingsStore.getLandmarks()

    const source = map?.getSource('landmarks') as mapboxgl.GeoJSONSource

    const itemLayer = ref<Feature[]>([])

    if (landmarks.value)
      itemLayer.value = translateItemToLayerItem(landmarks.value)

    source.setData({
      type: 'FeatureCollection',
      features: itemLayer.value,
    })

  }

  const addMarker = async (lng: number, lat: number, selectedImage: UserImage) => {
    // Create a new marker.
    const settingsStore = usePocketBase()

    const newItem = {
      date: new Date().toISOString(),
      lastForaged: undefined,
      lng,
      lat,
      name: selectedImage.name,
      owner: settingsStore.user?.id,
      colour: selectedImage.colour,
      startMonth: selectedImage.startMonth,
      endMonth: selectedImage.endMonth,
      imageURL: selectedImage.url,
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
    const { getItems, getLandmarks, deleteItem } = usePocketBase()

    await deleteItem(id, selectedCollection.value)

    if (selectedCollection.value === 'items') {

      items.value = await getItems()

      const itemLayer = ref<Feature[]>([])

      // Get the GeoJSON source by ID
      const source = map?.getSource(selectedCollection.value) as mapboxgl.GeoJSONSource

      if (items.value)
        itemLayer.value = translateItemToLayerItem(items.value)

      source.setData({
        type: 'FeatureCollection',
        features: itemLayer.value,
      })
    }
    if (selectedCollection.value === 'landmarks') {
      landmarks.value = await getLandmarks()

      const itemLayer = ref<Feature[]>([])

      // Get the GeoJSON source by ID
      const source = map?.getSource(selectedCollection.value) as mapboxgl.GeoJSONSource

      if (landmarks.value)
        itemLayer.value = translateItemToLayerItem(landmarks.value)

      source.setData({
        type: 'FeatureCollection',
        features: itemLayer.value,
      })
    }
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
    addLandmark,
    selectedCollection,
  }
})
