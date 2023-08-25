import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  server: {
    port: 4000,
  },
  plugins: [
    Vue(),
    Components({ dts: true }),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: '<Application Name>',
        short_name: '<Application Short Name >',
        theme_color: '#1976d2',
        background_color: '#fafafa',
        display: 'standalone',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'assets/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable any',
          },
          {
            src: 'assets/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any',
          },
          {
            src: 'assets/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any',
          },
          {
            src: 'assets/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable any',
          },
          {
            src: 'assets/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable any',
          },
        ],
      },
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        '@vueuse/core',
        'vitest',
      ],
    }),
  ],

  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ],
  },
  optimizeDeps: {
    include: [
      'vue-router',
    ],
  },
})
