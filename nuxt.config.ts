// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
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
  output: {
    publicPath: ''
  },
});
