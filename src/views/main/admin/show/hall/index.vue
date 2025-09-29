<template>
  <div class="hall-manage-container">
    <!-- 搜索栏 -->
    <div class="manage-header">
      <div class="search-box">
        <input type="text" v-model="searchVal" class="search-input" placeholder="搜索影厅名...">
        <button class="search-btn">搜索</button>
      </div>
    </div>

    <!-- 影厅管理表格 -->
    <div class="table-wrapper">
      <table class="hall-table">
        <thead>
          <tr class="table-header">
            <th>影厅名</th>
            <th>座位数</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 空状态 -->
          <tr v-if="filteredList.length === 0" class="empty-row">
            <td colspan="4" class="empty-text">暂无影厅数据</td>
          </tr>

          <!-- 数据行 -->
          <tr v-else v-for="(hall, index) in filteredList" :key="index" class="table-row">
            <td class="hall-name">{{ hall.name }}</td>
            <td>{{ hall.seats }}</td>
            <td>
              <span :class="['status-tag', hall.status === '启用' ? 'status-active' : 'status-closed']">
                {{ hall.status }}
              </span>
            </td>
            <td class="hall-actions">
              <button class="action-btn action-edit" @click="editHall(index)">编辑</button>
              <button class="action-btn action-delete" @click="deleteHall(index)">删除</button>
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
const hallList = ref([
  { name: 'IMAX巨幕1号厅', seats: 220, status: '启用' },
  { name: '杜比全景声2号厅', seats: 150, status: '停用' },
  { name: 'VIP豪华厅', seats: 60, status: '启用' }
])

// 搜索过滤
const filteredList = computed(() =>
  hallList.value.filter(h => h.name.includes(searchVal.value))
)

// 防止报错的空函数
const editHall = (index) => console.log('编辑影厅', index)
const deleteHall = (index) => console.log('删除影厅', index)
</script>

<style scoped>
/* ===== 容器整体 ===== */
.hall-manage-container {
  width: 80%;
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
  width: 240px;
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
.hall-table {
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
.hall-name {
  max-width: 200px;
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

.status-closed {
  background: rgba(211, 47, 47, 0.2);
  color: #ef9a9a;
}

/* 操作按钮 */
.hall-actions {
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

.action-delete {
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
