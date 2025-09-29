<template>
  <div>
    <div class="movie-tabbar">
      <ol class="my-list">
        <li @click="filterMovies(1)">正在热映</li>
        <li @click="filterMovies(0)">即将上映</li>
      </ol>
    </div>
    <div class="movie">
      <MovieCard :movies="filMovies"></MovieCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from '../../../components/movieCard/index.vue'

import { onMounted, ref } from 'vue'
import useMoviesStore from '../../../store/modules/movies'
const useMovies = useMoviesStore()

let movies = ref<any>([])
let filMovies = ref<any>([])

onMounted(() => {
  filterMovies(0)
})


const getMovies = async () => {
  const url = '/api/get_movies'
  await useMovies.get(url)
  movies.value = useMovies.movies
}

const filterMovies = async (state: number) => {
  await getMovies()
  filMovies.value = movies.value.filter((m: any) => m.state === state)
}



</script>

<style scoped>
.movie-tabbar {
  width: 100%;
  height: 60px;
  background-color: rgb(30, 30, 30);
  color: #d5d5d5;
  /* display: flex; */
  margin-bottom: 50px;
}

.my-list {
  display: flex;
  justify-content: center;
  align-content: center;
  list-style: none;
  gap: 120px;
  line-height: 60px;
}

.my-list li:hover {
  cursor: pointer;
  color: #fff;
}

/* 关键：flex容器设置，允许换行 */
.movie {
  width: 81%;
  /* padding: 23px; */
  display: flex;
  flex-wrap: wrap;
  /* 允许内容换行 */
  gap: 25px;
  /* 卡片之间的间距（水平和垂直方向） */
  /* 底部留白 */
  margin: 0 auto;
}
</style>