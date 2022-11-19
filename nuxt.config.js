import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    target: "static",
    ssr: true,
    modules: ['@nuxt/content', "@nuxtjs/tailwindcss"],
    content: {
        documentDriven: true
    },
    vuestic: {
        css: true,
        fonts: true
    },
    runtimeConfig: {
        githubApiToken: process.env.API_TOKEN,
        public: {
            owner: "michiexile",
            homepage: "https://mikael.johanssons.org",
            cv: "https://cv.mikael.johanssons.org",
            scholar: "http://scholar.google.com/citations?hl=en&user=XJN1TGIAAAAJ",
            twitter: "https://twitter.com/michiexile",
            facebook: "https://facebook.com/michiexile",
            instagram: "https://instagram.com/michiexile"
        }
    }
})

