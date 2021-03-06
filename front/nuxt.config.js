export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:"https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      },
      {
        rel: "stylesheet",
        href:"https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/css/flag-icon.min.css"
      }

    ],
    script:[
      {
        src: "https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js",
        body: true
      },
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
          type: "text/javascript"
      }
    ]
  },

  css: [
    '@/assets/css/style.bundle.css',
    '@/assets/css/tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/v-tooltip.js",
    "~/plugins/v-qr.js",
    { src: '@/plugins/vue-qr-reader.js', mode: 'client' },
    {src: '~/plugins/vue-chart.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {

    component:'fa',
    icons:{
      solid: ["faStore", "faUser", "faSignOutAlt"],
      brands: false
    }

  },

  auth: {
    strategies:{
      "local":{
        token: {
          property: 'access_token',
        },
        endpoints:{
          login:{url: 'login', method:"post"},
          logout:{url: 'logout', method:"post"},
          user:{url: 'user', method:"get"},
        },

      },
    },
    watchLoggedIn: true,
    redirect: {
      logout: '/',
      callback: '/login',
      home: 'app/dashboard'
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/api',
    //baseURL: 'http://fanshop.sytes.net/api',
  },

  publicRuntimeConfig: {
    axios: {
      //browserBaseURL: "http://fanshop.sytes.net/api"
      browserBaseURL: "http://localhost:8000/api"
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
