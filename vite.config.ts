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
    Components({ dirs: ['src/components', 'src/views'], dts: true }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Forager',
        short_name: 'Forager',
        theme_color: '#d3fcd9',
        background_color: '#fafafa',
        display: 'standalone',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'assets/manifest-icon-512.maskable.png',
            sizes: '512x512',
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
})
