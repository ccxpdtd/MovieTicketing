<template>
  <div class="home-container">
    <div class="carousel">
      <Carousel></Carousel>
    </div>
    <div class="all-movies">
      <Movies></Movies>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Carousel from './carousel/index.vue'
import Movies from './all/index.vue'



</script>

<style scoped>
.home-container {
  padding: 50px 0px;
  margin: 0 auto;
}

.carousel {
  width: 1060px;
  height: 463px;
  margin: 0 auto;
}

.all-movies {
  margin: 0 auto;
}
</style>