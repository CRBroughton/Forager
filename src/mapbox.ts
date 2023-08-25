import type { LngLatLike, MapMouseEvent } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

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

  const addMarker = () => {
    // Create a new marker.
    map?.on('click', (e: MapMouseEvent) => {
      map?.flyTo({ center: e.lngLat })
      return new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map!)
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
  }
}
