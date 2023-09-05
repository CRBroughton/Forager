# Forager

Forager is a web based application for mapping publicly accessible foods.

Foragers current functionality includes:

- Pinning locations of interest as dots
- Clustered areas when zoomed out
- Adding images(URLS)
- Setting a home location

Forager utilises the below software stack:

- [Vue 3](https://v3.vuejs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Mapbox](https://www.mapbox.com/)
- [Pocketbase](https://github.com/pocketbase/pocketbase)

All pinned locations are stored via [Pocketbase](https://github.com/pocketbase/pocketbase).

## Disclaimer

    Please be aware of and follow all applicable laws for
    where ever you may be foraging. I am not responsible for 
    any trespassing that may occur during the usage of this application, 
    nor any other legal issues you may face.

    Foraging can be a hazardous endeavour; Ensure you are aware of
    your surroundings at all times. I am not responsible for any
    injury that may occur, be it through the act of foraging, consuming
    foraged foods, or any other activity.


## Installation

Regardless of installation method, Forager requires a [Mapbox](https://www.mapbox.com/) API key. Provide your API key via the `.env` file, which you can generate
by copying the existing `.env.example` file.

Once provided, you can build the front-end by running `pnpm run build`

Forager requires a running instance of [Pocketbase](https://github.com/pocketbase/pocketbase).

You can deploy the built front-end via Netlify, or any other deployment option
that supports static pages.

You can utilise Pocketbase via a domain you own; Check [Pocketbases Going to Production documentation](https://pocketbase.io/docs/going-to-production/).

### Build from source

Building from source requires:

- both an active Mapbox account and API key
- A Pocketbase server

Dependant on your operating system's architecture, download the latest release of
[Pocketbase](https://github.com/pocketbase/pocketbase) and extract the executable
into the db folder. When running `pnpm run pocketbase:serve` for the first time,
the database migrations will ensure the correct tables are created.

## Progressive Web Application (PWA)

Forager is a Progressive Web Application (PWA), and therefore can be installed via any browser. The URL for the live version is:

[https://forager.crbroughton.me](https://forager.crbroughton.me)

Please note that this live version may have restrictions during active development,
assume data is not persistent on this instance.

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

### Create Pocketbase types
```
pnpm run pocketbase:types
```

### Compiles and minifies for production
```
pnpm run build
```