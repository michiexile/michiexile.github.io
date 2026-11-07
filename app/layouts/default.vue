<template>
  <div>
    <nav class="navbar bg-indigo-700 text-teal-50 m-0">
      <NavBar />
    </nav>
    <main class="prose p-15">
      <slot />
    </main>
    <div class="footer footer-center items-center bg-indigo-700 text-teal-50 p-4 m-0">
      <Footer />
    </div>
  </div>
</template>

<script setup>
const name = "default"
</script>

<style>
main {
  padding: 30px;
}
</style>