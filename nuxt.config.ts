export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      title: 'ดุอาอ์ — ห้องสมุดอิสลาม',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#211006' },
        { name: 'description', content: 'เว็บ E-book สำหรับอ่านดุอาอ์' }
      ]
    }
  },
  nitro: { preset: 'static' },
  compatibilityDate: '2025-01-01'
})
