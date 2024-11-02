// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    'dayjs-nuxt',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@prisma/nuxt'
  ],
  dayjs: {
    locales: ['en', 'id'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'id',
    defaultTimezone: 'Asia/Jakarta'
  },
  colorMode: {
    preference: 'dark'
  },
  ui: {
    global: true
  },
  prisma: {
    generateClient: false
  }
})
