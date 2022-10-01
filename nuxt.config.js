import { defineNuxtConfig } from "nuxt";

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
        githubApiToken: process.env.GITHUB_API_TOKEN,
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

