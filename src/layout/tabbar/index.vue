<template>
  <div class="tabbar-container">
    <!-- logo -->
    <div class="left">
      影票通
    </div>
    <!-- --- -->
    <div class="center">
      <ul class="my-list">
        <li v-for="route in myMenuRoutes" :key="route.name">
          <router-link :to="{ name: route.name }" class="nav-link" exact-active-class="nav-link-active">
            {{ route.meta.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="right">
      <div class="user">
        <el-icon size="20" color="#d5d5d5">
          <User />
        </el-icon>
        <p>用户名</p>
      </div>
      <el-icon size="20" color="#d5d5d5">
        <Setting />
      </el-icon>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { myRoutes } from '../../router/routes'
import { User, Setting } from '@element-plus/icons-vue'
let myMenuRoutes = ref<any[]>([])
onMounted(() => {
  const myLayout = myRoutes.find(item => item.name === 'myLayout')
  myMenuRoutes.value = myLayout?.children || []
  // console.log('myMenuRoutes', myMenuRoutes.value);

})
</script>

<style scoped>
.tabbar-container {
  width: 100%;
  height: 100%;

  position: fixed;
  /* 2. 顶部对齐导航栏（与原top:60px保持一致） */
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  /* ✅ 垂直居中关键 */
  justify-content: space-between;
  padding: 0 40px;
  /* opacity: 1; */
  border-bottom: 1px solid rgba(76, 76, 76, 0.5);
  background-color: rgba(17, 17, 17, 0.5);
}

.left {
  color: #d5d5d5;
  font-weight: 500;
  font-size: 17px;
  margin-right: 45px;
}

.my-list {
  list-style: none;
  display: flex;
  flex-direction: row;
}

.my-list li {
  margin: 0 20px;
}

.my-list a {
  display: inline-block;
  /* ✅ 允许 transform 缩放 */
  text-decoration: none;
  color: #d5d5d5;
  font-weight: 400;
  font-size: 17px;
  transition: color 0.3s ease, font-weight 0.3s ease, transform 0.3s ease;
}

.my-list a:hover {
  font-weight: 450;
  color: #ffffff;
  transform: scale(1.05);
  background: none;
}

.nav-link {
  padding: 0;
}

.nav-link-active {
  font-weight: 450 !important;
  color: #ffffff !important;
}

.right {
  display: flex;
  justify-content: flex-end;
  /* 水平方向靠右 */
  align-items: center;
  /* 垂直居中，可选 */
  gap: 30px
}

.user {
  color: #d5d5d5;
  display: flex;
  gap: 10px;
  font-size: 16px;
}
</style>