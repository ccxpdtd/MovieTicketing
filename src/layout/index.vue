<template>
  <div class="layout-container">
    <div class="tabbar-container">
      <Tabbar></Tabbar>
    </div>
    <div class="main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'
</script>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
}

.tabbar-container {
  width: 100%;
  height: 60px;
  top: 0;
  /* background-color: rgb(127, 127, 127); */

}

.main {
  /* padding: 50px 20px; */
  width: 100%;
  height: calc(100vh - 60px);
}
</style>