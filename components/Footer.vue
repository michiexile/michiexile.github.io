<template>
  <span class="footer-title">Social</span>
  <div class="grid grid-flow-col text-2xl gap-4">
    <a v-if="config.twitter" :href="config.twitter"><IconTwitter /></a>
    <a v-if="config.facebook" :href="config.facebook"><IconFacebook /></a>
    <a v-if="config.instagram" :href="config.instagram"><IconInstagram /></a>
  </div>
</template>

<script setup>
import { IconTwitter, IconFacebook, IconInstagram } from "@iconify-prerendered/vue-fa6-brands"

const config = useRuntimeConfig()

const name = "Footer"
</script>

<style scoped>

</style>