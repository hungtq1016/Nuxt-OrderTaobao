// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@pinia/nuxt',
    "@nuxtjs/google-fonts",
    'nuxt-headlessui',
    '@nuxt/ui',
    // 'nuxt-sweetalert2'
  ],
  nitro: {
    minify: true
  },
  imports: {
    dirs: ['./stores'],
  },
  routeRules:{
    '/auth': { redirect: '/auth/login' },
    '/admin/users/edit': { redirect: '/admin/users' },
    '/admin/users/edit/': { redirect: '/admin/users' },
    '/auth/**': { ssr: false ,prerender:true},
    '/admin/**': { ssr: false },
  },
  headlessui: {
    prefix: 'Headless'
  },
  pages: true,

  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  router: {
    options: {
        strict: false
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
      apiBase: 'https://localhost:8001/api'
    }
  }
  
})
