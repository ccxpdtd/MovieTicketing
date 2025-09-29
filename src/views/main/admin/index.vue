<template>
  <div class="admin-container">
    <div class="slider">
      <Slider></Slider>
    </div>
    <div class="show">
      <Show></Show>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Slider from './slider/index.vue'
import Show from './show/index.vue'
</script>

<style>
.admin-container {
  display: flex;
}

.slider {
  width: 250px;
  position: fixed;
  /* 2. 顶部对齐导航栏（与原top:60px保持一致） */
  top: 60px;
  /* 3. 底部贴紧视口底部，实现"充满视口高度" */
  bottom: 0;
  background-color: rgb(30, 30, 30);
}

.show {
  flex: 1;
  margin-left: 250px;
}
</style>