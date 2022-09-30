<template>
  <NuxtLink :to="url">{{ props.repository.nameWithOwner }}</NuxtLink>:
  {{ props.repository.description }}
</template>

<script setup>
const name = "LinkToGithubIo";
const props = defineProps(["repository"]);
const githubio_host = `${props.repository.owner.login}.github.io`
const url = (props.repository.name == githubio_host) ?
    githubio_host :
    `https://${githubio_host}/${props.repository.name}`;

</script>

<style scoped>

</style>