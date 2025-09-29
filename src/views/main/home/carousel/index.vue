<template>
  <div class="carousel-container">
    <img class="carousel-img" :src="movies[activeIndex].img" :alt="movies[activeIndex].name" />
    <ul class="my-list">
      <li v-for="(movie, i) in movies" :key="movie.name" :class="{ active: i === activeIndex }"
        @mouseenter="activeIndex = i">
        {{ movie.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const movies = [
  { name: '《Her》', img: 'her.jpg' },
  { name: '《机器人之梦》', img: 'RobotDreams.jpg' },
  { name: '《波西米亚狂想曲》', img: 'BohemianRhapsody.jpg' },
  { name: '《还有明天》', img: 'TheresStillTomorrow.jpg' },
  { name: '《爱乐之城》', img: 'LaLaLand.jpg' },
  { name: '《时空恋旅人》', img: 'AboutTime.jpg' }
]

const activeIndex = ref(0)
</script>

<style scoped>
.carousel-container {
  position: relative;
  /* li 可以绝对定位在上面 */
  /* width: 100%; */
  height: 100%;
  /* 高度可根据需求调整 */
  border-radius: 15px;
  overflow: hidden;
}


/* 渐变叠加在图片左侧 */
.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
  pointer-events: none;
  /* 不阻挡鼠标 */
  z-index: 2;
}

.carousel-container::before {
  background: linear-gradient(to right, rgba(28, 28, 28, 0.8), transparent);
  left: 0;
}

.carousel-container::after {
  width: 40%;
  background: linear-gradient(to left, rgba(28, 28, 28, 0.8), transparent);
  right: 0;
}

/* 图片填充并裁剪 */
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 右侧列表悬浮在图片上 */
.my-list {
  position: absolute;
  top: 50%;
  right: 20px;
  /* 距离右边 20px */
  transform: translateY(-50%);
  list-style: none;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 18px;
  z-index: 2;
}

.my-list li {
  margin: 10px 0;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;
}

.my-list li:hover {
  transform: scale(1.05);
  color: #ffd700;
}

/* 激活状态高亮 */
.my-list li.active {
  font-weight: bold;
  color: #fbdd30;
}
</style>
