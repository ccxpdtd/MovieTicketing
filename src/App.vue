<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang='ts'>

</script>

<style>
/* 全局样式重置 - 放在非scoped样式中 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 确保padding和border不影响元素总宽度 */
}

html,
body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  /* 防止水平滚动 */
}

#app {
  padding: 0;
  display: block;
}
</style>