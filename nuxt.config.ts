// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/google-fonts"
  ],
  nitro: {
    minify: true
  },
  
  imports: {
    dirs: ['./stores'],
  },
  pages: true,
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  $development: {
    //
  },
  googleFonts: {
    families: {
      'Noto+Sans':{
        wght: [700],
      },
      'Open+Sans':true,
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'Order Taobao',
      meta: [
        { name: 'description', content: 'Everything about - Nuxt-3' }
      ],
    }
  },
  runtimeConfig: {
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'https://localhost:7132/api'
    }
  }
})
