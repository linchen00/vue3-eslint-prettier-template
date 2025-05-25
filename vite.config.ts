import tailwindcss from '@tailwindcss/vite'
import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: true,
      routesFolder: 'src/views'
    }),
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      dts: true,
      eslintrc: {
        enabled: true,
        globalsPropValue: true
      },
      imports: ['vue', VueRouterAutoImports, 'pinia', 'vue-i18n', '@vueuse/core'],
      resolvers: [VantResolver()]
    }),
    Icons({
      compiler: 'vue3',
      iconSource: 'legacy',
      customCollections: {
        custom: FileSystemIconLoader('./src/assets/icons')
      }
    }),
    Components({
      dts: true,
      resolvers: [
        VueUseComponentsResolver(),
        IconsResolver({
          customCollections: ['custom']
        }),
        VantResolver(),
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
