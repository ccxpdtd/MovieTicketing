<template>
  <div class="movie-manage-container">
    <!-- 标题与搜索栏 -->
    <div class="manage-header">
      <div class="search-box">
        <input type="text" v-model="searchVal" class="search-input" placeholder="搜索电影名...">
        <button class="search-btn">搜索</button>
      </div>
    </div>

    <!-- 电影管理表格 -->
    <div class="table-wrapper">
      <table class="movie-table">
        <thead>
          <tr class="table-header">
            <th>电影名</th>
            <th>电影简介</th>
            <th>上映时间</th>
            <th>电影状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 表格空状态 -->
          <tr v-if="movieList.length === 0" class="empty-row">
            <td colspan="5" class="empty-text">暂无电影数据</td>
          </tr>
          <!-- 电影数据行 -->
          <tr v-else v-for="(movie, index) in filmovieList" :key="index" class="table-row">
            <td class="movie-name">《{{ movie.name }}》</td>
            <td class="movie-desc">
              <!-- 简介超出部分省略 -->
              <div class="desc-wrapper">{{ movie.description }}</div>
            </td>
            <td class="movie-date">{{ movie.release_date }}</td>
            <td class="movie-status">
              <!-- 根据状态显示不同颜色标签 -->
              <span :class="['status-tag', `status-${movie.state === 1 ? 'showing' : 'upcoming'}`]">
                {{ movie.state === 1 ? '正在热映' : '即将上映' }}
              </span>
            </td>
            <td class="movie-actions">
              <button class="action-btn action-schedule">排片</button>
              <el-popconfirm title="确定下架该电影吗？" @confirm="offlineMovie(movie.id)">
                <template #reference>
                  <button class="action-btn action-offline">下架</button>
                </template>
              </el-popconfirm>
              <button class="action-btn action-edit" @click="editMovie(index)">编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页（基础结构） -->
    <div class="pagination">
      <button class="page-btn" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">
        第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
      </span>
      <button class="page-btn" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import useMoviesStore from '../../../../../store/modules/movies'
import { ElNotification } from 'element-plus'

import { useRouter } from 'vue-router'
const $router = useRouter()
const useMovies = useMoviesStore()

const searchVal = ref('');

const movieList = ref < any > ([]);
const filmovieList = ref < any > ([]);
// 分页数据（防止分页组件报错）
const currentPage = ref(1);
const totalPages = ref(Math.ceil(movieList.value.length / 10)); // 假设每页10条数据

watch(searchVal, (newValue) => {
  filmovieList.value = movieList.value.filter((m: any) =>
    m.name.indexOf(newValue) !== -1
  )
})

onMounted(() => {
  getMovies()
})

const getMovies = async () => {
  const url = '/api/get_movies'
  const data = await useMovies.get(url)
  if (data.code === 200) {
    movieList.value = useMovies.movies
    filmovieList.value = useMovies.movies
  }
  else
    ElNotification({ type: 'error', message: data.msg })
}

const editMovie = (index: number) => {
  try {
    $router.push({ path: "/admin/upload", query: { index } })
  } catch (error) {
    ElNotification({ type: 'error', message: '编辑失败' })
  }
}

const offlineMovie = async (id: number) => {
  const url = '/api/delete_movie'
  const data = await useMovies.post(url, { id })
  if (data.code === 200) {
    getMovies()
    ElNotification({ type: 'success', message: data.msg })
  }
  else
    ElNotification({ type: 'error', message: data.msg })
}

// 空操作函数（防止按钮点击报错，实际业务逻辑对接后替换）
const handleSchedule = (index: number) => {
  console.log(`进行排片操作`, index);
};

const handlePageChange = (type: 'prev' | 'next') => {
  if (type === 'prev' && currentPage.value > 1) currentPage.value--;
  if (type === 'next' && currentPage.value < totalPages.value) currentPage.value++;
};
</script>

<style scoped>
/* 容器整体样式 */
.movie-manage-container {
  width: 95%;
  margin: 20px auto;
  color: #e0e0e0;
}

/* 头部标题与搜索栏 */
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  width: 240px;
  padding: 10px 14px;
  background-color: #2d2d2d;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  color: #e0e0e0;
  font-size: 14px;
}

.search-input::placeholder {
  color: #666;
}

.search-btn {
  padding: 10px 18px;
  background-color: #3d3d3d;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-btn:hover {
  background-color: #555;
}

/* 表格容器（处理滚动） */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  background-color: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* 表格样式 */
.movie-table {
  width: 100%;
  border-collapse: collapse;
}


/* 表头样式 */
.table-header {
  background-color: #252525;
  text-align: center;
}

th {
  padding: 16px 15px;
  font-size: 15px;
  font-weight: 400;
  color: #b0b0b0;
  border-bottom: 1px solid #3d3d3d;
}

/* 表格行样式 */
.table-row {
  transition: background-color 0.3s ease;
  text-align: center;
}

.table-row:hover {
  background-color: #222;
}

td {
  padding: 16px 15px;
  font-size: 14px;
  color: #d0d0d0;
  border-bottom: 1px solid #3d3d3d;
}

.movie-name {
  max-width: 200px;
  /* 👉 控制列最大宽度 */
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 超出隐藏 */
  text-overflow: ellipsis;
  /* 超出显示“...” */
}

.movie-desc {
  width: 300px;
}

/* 表格内容特殊样式 */
.movie-desc .desc-wrapper {
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 状态标签样式 */
.status-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 300;
}

.status-showing {
  background-color: rgba(76, 175, 80, 0.2);
  color: #81c784;
}

.status-upcoming {
  background-color: rgba(33, 150, 243, 0.2);
  color: #64b5f6;
}

/* 操作按钮样式 */
.movie-actions {
  display: flex;
  gap: 8px;

}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-schedule {
  background-color: #424242;
  color: #e0e0e0;
}

.action-offline {
  background-color: #d32f2f;
  color: #fff;
}

.action-edit {
  background-color: #1976d2;
  color: #fff;
}

/* 空状态样式 */
.empty-row td {
  text-align: center;
  padding: 40px 0;
  color: #666;
  border-bottom: none;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 10px 0;
}

.page-btn {
  padding: 8px 16px;
  background-color: #2d2d2d;
  border: 1px solid #3d3d3d;
  border-radius: 4px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #252525;
}

.page-btn:hover:not(:disabled) {
  background-color: #3d3d3d;
}

.page-info {
  font-size: 14px;
  color: #b0b0b0;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .movie-desc .desc-wrapper {
    width: 350px;
  }
}

@media (max-width: 768px) {
  .manage-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .search-box {
    width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .movie-desc .desc-wrapper {
    width: 150px;
  }
}
</style>