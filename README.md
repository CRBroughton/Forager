# Forager

Forager is a web based application for mapping publicly accessible foods. Forager is currently in early development, and has basic functionality.

Forager utilises the below software stack:

- [Vue 3](https://v3.vuejs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Mapbox](https://www.mapbox.com/)
- [Pocketbase](https://github.com/pocketbase/pocketbase)
- [Workbox](https://developers.google.com/web/tools/workbox)

All pinned locations are stored via [Pocketbase](https://github.com/pocketbase/pocketbase).


## Installation

Regardless of installation method, Forager requires a [Mapbox](https://www.mapbox.com/) API key.

Forager is released as a single binary file, making installation easy. Simply
download the binary for your architecture of choice and run the binary
(optionally, move the binary into a $PATH DIR). 

### Build from source

Building from source requires:

- both an active Mapbox account and API key
- A Pocketbase server

Dependant on your operating system's architecture, download the latest release of
[Pocketbase](https://github.com/pocketbase/pocketbase) and extract the executable
into the db folder. When running `ppnpm run pocketbase:serve` for the first time,
the database migrations will ensure the correct tables are created.

## Live Version

Forager is a Progressive Web Application, and therefore can be installed via any browser. The URL for the live version is:

[https://forager.crbroughton.me](https://forager.crbroughton.me)

Please note that this live version may have restrictions during active development.

## Project setup
```
pnpm i
```

### Compiles and hot-reloads for front-end development
```
pnpm run dev
```

### Runs the backend server
```
pnpm run pocketbase:serve
```

### Compiles and minifies for production
```
pnpm run build
```