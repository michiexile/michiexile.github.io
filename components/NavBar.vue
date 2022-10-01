<template>
  <div class="navbar-start">
    <a class="btn btn-sm btn-circle text-xl" :href="homepage"><IconHouse /></a>
    <a class="btn btn-sm btn-circle text-xl" :href="githubURL"><IconGithub /></a>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl" to="/">{{ owner }}</a>
  </div>
  <div class="navbar-end">
    <a v-if="config.cv" class="btn btn-sm btn-circle text-xl" :href="config.cv"><IconCv /></a>
    <a v-if="config.scholar" class="btn btn-sm btn-circle text-xl" :href="config.scholar"><IconGoogleScholar /></a>
  </div>
</template>

<script setup>
import { IconGithub } from "@iconify-prerendered/vue-fa6-brands"
import { IconHouse } from "@iconify-prerendered/vue-fa6-solid"
import {IconCv, IconGoogleScholar} from "@iconify-prerendered/vue-academicons"

const config = useRuntimeConfig()
const owner = config.owner
const githubURL = `https://${owner}.github.com`
const homepage = config.homepage
const cv = config.cv

const name = "NavBar"
</script>

<style>

</style>