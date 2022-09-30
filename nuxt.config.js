import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
    target: "static",
    ssr: true,
    modules: ['@nuxt/content'],
    content: {
        documentDriven: true
    },
    runtimeConfig: {
        githubApiToken: process.env.GITHUB_API_TOKEN
    }
})

