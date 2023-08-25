# My Vite Template

This is my Vite template, which includes:

- Vite
- Vue 3.2
- Vitest
- VueUse
- Typescript
- MSW
- ESLint (antfu/eslint-config)
- unplugin-vue-components
- unplugin-auto-import
- vite-plugin-pwa
- TailwindCSS
- SASS
- @/ Alias

## Installation

It's recommended to use pnpm to install this template:

```
pnpm i
```

To use the dockerisation of this template first install your dependencies as normal, then run:

```
docker compose up -d
```

which will expose the docker container on port 4000. You'll no longer have to run `npm run dev`

## Checking For Updates

This template is regularly updated, however if you need to manually update a package, use the `pnpm:check` script, or run the below command:

```
NPM_CHECK_INSTALLER=pnpm npm-check -u
```

## Recommended Extensions

I've included all the extensions I use on a daily basis. Feel free to disable
or not install any that you feel you wouldn't use.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
