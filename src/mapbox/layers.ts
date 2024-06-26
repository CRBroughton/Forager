import type mapboxgl from 'mapbox-gl'

export function createLayers(map: mapboxgl.Map, usersSavedColours: string[]) {
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'items',
    filter: ['!', ['has', 'point_count']],
    paint: {
      // Color circles, using a `match` expression.
      'circle-color': [
        'match',
        ['get', 'colour'],
        ...usersSavedColours,
        /* other */ '#ccc',
      ],
      'circle-radius': 8,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#fff',
    },
  })

  // Add label layer
  map.addLayer({
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
  map.addLayer({
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
  map.addLayer({
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

  // Add line layer
  // map.addLayer({
  //   id: 'routes',
  //   type: 'line',
  //   source: 'routes',
  //   layout: {
  //     'line-join': 'round',
  //     'line-cap': 'round',
  //   },
  //   paint: {
  //     'line-color': '#888',
  //     'line-width': 4,
  //   },
  // })
}

export function createLandmarks(map: mapboxgl.Map) {
  map.addLayer({
    id: 'landmark',
    type: 'symbol',
    source: 'landmarks',
    minzoom: 14,
    layout: {
      'icon-image': 'custom-marker',
      'text-field': ['get', 'description'],
      'text-font': [
        'Open Sans Semibold',
        'Arial Unicode MS Bold',
      ],
      'icon-size': 0.6,
      'text-offset': [0, 0.8],
      'text-anchor': 'top',
    },
  })
}
