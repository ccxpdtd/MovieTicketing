<template>
  <div class="schedule-manage-container">
    <!-- 搜索栏 -->
    <div class="manage-header">
      <div class="search-box">
        <input type="text" v-model="searchVal" class="search-input" placeholder="搜索电影或影厅..." />
        <button class="search-btn">搜索</button>
      </div>
    </div>

    <!-- 排片记录表格 -->
    <div class="table-wrapper">
      <table class="schedule-table">
        <thead>
          <tr class="table-header">
            <th>电影名</th>
            <th>影厅名</th>
            <th>日期</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>价格</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 空状态 -->
          <tr v-if="filteredList.length === 0" class="empty-row">
            <td colspan="8" class="empty-text">暂无排片记录</td>
          </tr>

          <!-- 数据行 -->
          <tr v-else v-for="(item, index) in filteredList" :key="index" class="table-row">
            <td class="movie-name">《{{ item.movie }}》</td>
            <td class="hall-name">{{ item.hall }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>{{ item.price }} 元</td>
            <td>
              <span :class="['status-tag', item.status === '已排片' ? 'status-active' : 'status-cancel']">
                {{ item.status }}
              </span>
            </td>
            <td class="schedule-actions">
              <button class="action-btn action-edit" @click="editSchedule(index)">编辑</button>
              <button class="action-btn action-cancel" @click="cancelSchedule(index)">取消</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchVal = ref('')

const scheduleList = ref([
  {
    movie: '爱乐之城',
    hall: 'IMAX巨幕1号厅',
    date: '2025-10-01',
    startTime: '14:30',
    endTime: '16:50',
    price: 68,
    status: '已排片'
  },
  {
    movie: '波西米亚狂想曲',
    hall: 'VIP豪华厅',
    date: '2025-10-02',
    startTime: '19:00',
    endTime: '21:20',
    price: 98,
    status: '已取消'
  }
])

// 搜索过滤
const filteredList = computed(() =>
  scheduleList.value.filter(item =>
    item.movie.includes(searchVal.value) || item.hall.includes(searchVal.value)
  )
)

// 空函数防止报错
const editSchedule = (i) => console.log('编辑排片', i)
const cancelSchedule = (i) => console.log('取消排片', i)
</script>

<style scoped>
/* ===== 容器整体 ===== */
.schedule-manage-container {
  width: 95%;
  margin: 20px auto;
  color: #e0e0e0;
}

/* ===== 搜索栏 ===== */
.manage-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  width: 260px;
  padding: 10px 14px;
  background: #2d2d2d;
  border: 1px solid #3d3d3d;
  border-radius: 6px;
  color: #e0e0e0;
}

.search-input::placeholder {
  color: #666;
}

.search-btn {
  padding: 10px 18px;
  background: #3d3d3d;
  border: none;
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #555;
}

/* ===== 表格容器 ===== */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  background: #1a1a1a;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* ===== 表格样式 ===== */
.schedule-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.table-header {
  background: #252525;
}

th {
  padding: 16px 15px;
  font-size: 15px;
  color: #b0b0b0;
  border-bottom: 1px solid #3d3d3d;
}

.table-row {
  transition: background 0.3s;
}

.table-row:hover {
  background: #222;
}

td {
  padding: 16px 15px;
  font-size: 14px;
  color: #d0d0d0;
  border-bottom: 1px solid #3d3d3d;
}

/* 名称超长省略 */
.movie-name,
.hall-name {
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 状态标签 */
.status-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
}

.status-active {
  background: rgba(76, 175, 80, 0.2);
  color: #81c784;
}

.status-cancel {
  background: rgba(211, 47, 47, 0.2);
  color: #ef9a9a;
}

/* 操作按钮 */
.schedule-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.action-btn:hover {
  opacity: 0.9;
}

.action-edit {
  background: #1976d2;
  color: #fff;
}

.action-cancel {
  background: #d32f2f;
  color: #fff;
}

/* 空状态 */
.empty-row td {
  text-align: center;
  padding: 40px 0;
  color: #666;
  border-bottom: none;
}
</style>
