<template>
  <div class="all-movies-container">
    <h1>全部</h1>
    <!-- 使用movies-container作为flex容器 -->
    <div class="movies-container">
      <MovieCard :movies="movies"></MovieCard>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import MovieCard from '../../../../components/movieCard/index.vue'

import useMoviesStore from '../../../../store/modules/movies'
import { ElNotification } from 'element-plus'
const useMovies = useMoviesStore()

let movies = ref<any>([])

onMounted(() => {
  getMovies()
})

const getMovies = async () => {
  const url = '/api/get_movies'
  const data = await useMovies.get(url)
  if (data.code === 200)
    movies.value = useMovies.movies
  else
    ElNotification({ type: 'error', message: data.msg })
}

</script>

<style>
.all-movies-container {
  color: #d5d5d5;
  padding: 0 55px;
  width: 89%;
  margin: 0 auto;
  /* 居中显示 */
}

.all-movies-container h1 {
  margin: 40px 0 30px;
}

/* 关键：flex容器设置，允许换行 */
.movies-container {
  display: flex;
  flex-wrap: wrap;
  /* 允许内容换行 */
  gap: 25px;
  /* 卡片之间的间距（水平和垂直方向） */
  padding-bottom: 50px;
  /* 底部留白 */
}
</style>
