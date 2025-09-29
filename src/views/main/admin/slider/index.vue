<template>
  <div class="slider-container">
    <ul class="my-list">
      <li v-for="route in myAdminMenuRoutes" :key="route.name">
        <router-link :to="{ name: route.name }" class="nav-link" exact-active-class="nav-link-active">
          {{ route.meta.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { myRoutes } from '../../../../router/routes'
let myAdminMenuRoutes = ref<any[]>([])
onMounted(() => {
  const myLayout = myRoutes.find(item => item.name === 'myLayout')
  const myAdmin = myLayout?.children?.find(item => item.name === 'myAdmin')
  myAdminMenuRoutes.value = myAdmin?.children || []
  // console.log('myMenuRoutes', myMenuRoutes.value);

})
</script>

<style scoped>
.slider-container {
  justify-content: center;
  padding-top: 100px;
  height: 100vh;
}

.my-list {
  width: 100%;
  list-style: none;
}

.my-list li {
  width: 100%;
  height: 70px;
  font-size: 18px;
  font-weight: 200;
  text-align: center;
  line-height: 70px;
  padding: 0;
}

.my-list li:hover {
  cursor: pointer;
  background: rgb(61, 61, 61);
}

.nav-link {
  display: block;
  /* 转为块级元素 */
  width: 100%;
  /* 宽度充满父元素 */
  height: 100%;
  /* 高度充满父元素 */
  padding: 0;
  color: #d5d5d5;
  font-weight: 350;
  background: none;
}

.nav-link-active {
  font-weight: 400 !important;
  color: #aaa61f !important;

}
</style>