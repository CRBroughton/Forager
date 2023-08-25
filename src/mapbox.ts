import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import { usePocketBase } from './pocketbase'

const accessToken = import.meta.env.VITE_MAPBOX_KEY
mapboxgl.accessToken = accessToken

interface Mapbox {
  home?: LngLatLike
  container: string
}

let map: mapboxgl.Map | undefined

export function mapBoxStore(vars?: Mapbox) {
  const initMapbox = () => {
    map = new mapboxgl.Map({
      container: vars!.container,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: vars!.home,
      zoom: 12,
    })
    map.on('load', () => {})
  }

  const addMarker = async () => {
    // Create a new marker.
    map?.on('click', async (e: MapMouseEvent) => {
      map?.flyTo({ center: e.lngLat })

      const { createItem } = usePocketBase()

      await createItem({
        date: new Date().toDateString(),
        lastForaged: new Date().toDateString(),
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        name: 'test',
      })

      new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map!)
    })
  }

  const returnHome = (home: LngLatLike) => {
    map?.flyTo({ center: home })
  }

  const addinitMarkers = async () => {
    const { items, getItems } = usePocketBase()

    await getItems()

    items.value?.forEach((item) => {
      if (item.lat && item.lng) {
        new mapboxgl.Marker()
          .setLngLat([item.lng, item.lat])
          .addTo(map!)
      }
    })
  }

  return {
    map,
    initMapbox,
    addMarker,
    returnHome,
    addinitMarkers,
  }
}
