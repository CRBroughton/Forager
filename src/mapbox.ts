import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'

interface Mapbox {
  home: LngLatLike
  container: string
}

export function mapBoxStore(vars: Mapbox) {
  const accessToken = import.meta.env.VITE_MAPBOX_KEY

  let map: mapboxgl.Map | undefined
  mapboxgl.accessToken = accessToken

  const initMapbox = () => {
    map = new mapboxgl.Map({
      container: vars.container,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: vars.home,
      zoom: 12,
    })
    map.on('load', () => {})
  }

  return {
    map,
    initMapbox,
  }
}
