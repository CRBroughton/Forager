# Forager

Forager is a web based application for mapping publicly accessible foods. Forager is currently in early development, and has basic functionality.

Forager utilises the below software stack:

- [Vue 3](https://v3.vuejs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/)
- [Localbase](https://github.com/dannyconnell/localbase)
- [Workbox](https://developers.google.com/web/tools/workbox)

Forager utilises [Workbox](https://developers.google.com/web/tools/workbox) to cache map images and the entire app on your device. For offline use, please ensure you have a minimum of 2GB as Forager will store a maximum of 100 map images on your device, and that you have already cached the desired map data. 

Please note that if you exceed the cache limit, previously cached map data will be automatically deleted from your device. 

To re-cache map data, simply be online and load the desired map location.

Uncached maps will simply show a gray screen.

All pinned locations are stored locally on your device using [Localbase](https://github.com/dannyconnell/localbase).

## Installation

Forager is a Progressive Web Application, and therefore can be installed via any browser. The current URL for the live test version is:

[https://wonderful-shockley-3760b4.netlify.app](https://wonderful-shockley-3760b4.netlify.app)

## Known bugs

- After selecting your home location, app will hang on first launch. 
- Select location popup briefly appears during startup.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
