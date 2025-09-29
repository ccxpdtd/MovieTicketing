<template>
  <!-- 子组件内部循环渲染每个电影卡片 -->
  <div class="movie-card-container" v-for="m in movies" :key="m.id">
    <img :src="m.poster" :alt="m.name">
    <p class="movie-name">{{ m.name }}</p>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';

// 明确props类型定义
let props = defineProps<{
  movies: Array<{
    id: number;
    name: string;
    poster: string;
  }>
}>()

onMounted(() => {
  // console.log('movies', props.movies);
})


</script>

<style scoped>
.movie-card-container {
  width: 164px;
  /* 固定卡片宽度 */
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* 图片和文字之间的间距 */
}

.movie-card-container img {
  width: 100%;
  height: 232px;
  /* 固定海报高度 */
  border-radius: 10px;
  object-fit: cover;
  /* 保持图片比例，裁剪多余部分 */
  transition: transform 0.3s ease;
  /* hover动画效果 */
}

.movie-card-container :hover {
  cursor: pointer;
  transform: scale(1.03);
  /* 鼠标悬停时轻微放大 */
}

.movie-name {
  font-size: 16px;
  /* 调整字体大小 */
  text-align: center;
  margin: 0;
  white-space: nowrap;
  /* 防止文字换行 */
  overflow: hidden;
  /* 隐藏溢出内容 */
  text-overflow: ellipsis;
  /* 溢出部分显示省略号 */
}
</style>
