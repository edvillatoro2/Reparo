// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // Enables Nuxt 4 features
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  // TypeScript strict mode — catches mistakes before they become bugs
  typescript: {
    strict: true,
    typeCheck: true,
  },

  //API keys live here, server ones stay secret
  runtimeConfig: {
    googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY,
  }

  // Tells Vite to pre-bundle these packages so the dev server
  // doesn't restart every time you open the app
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
