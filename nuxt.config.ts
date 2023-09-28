// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Coding Fundi',
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css",
        },
      ],
    },
  },
  css: ["~/assets/styles/scss/index.scss"],
  build: {
    transpile: ["mdb-vue-ui-kit"],
  },
  devServer: {
    host: "192.168.1.106", // default: "localhost
    port: 3000,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/content',
  ],
  pinia: {
    autoImports: [
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  generate: {
    routes: [
      '/categoryView/id',
      '/articleDetails/id',
    ]
  },
  nitro: { 
    preset: 'azure',
    },
});
