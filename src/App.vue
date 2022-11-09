<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="title green"><h1>TODO</h1></div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  display: flex;
  justify-content: center;
  place-items: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

h1 {
  font-weight: 500;
  font-size: 2rem;
  margin: 8px;
}

h3 {
  font-size: 1.2rem;
}

h1,
h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  h1,
  h3 {
    font-size: 2.6rem;
    text-align: left;
  }
}
</style>
