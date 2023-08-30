import mapboxgl from 'mapbox-gl'

export function createGeolocator(map: mapboxgl.Map) {
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
}
