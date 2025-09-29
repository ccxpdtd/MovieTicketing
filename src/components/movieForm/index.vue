<template>
  <div class="movie-upload-container">
    <form class="movie-form">
      <!-- 新增 Flex 容器：包裹电影名、时长、上映时间，实现同行显示 -->
      <div class="form-row">
        <!-- 电影名字段 -->
        <div class="form-group form-group-inline">
          <label for="movieName" class="form-label">电影名</label>
          <input type="text" autocomplete="off" id="movieName" v-model="UploadformData.name" class="form-input"
            placeholder="请输入电影名称" required>
        </div>

        <!-- 电影时长字段 -->
        <div class="form-group form-group-inline">
          <label for="movieDuration" class="form-label">电影时长 (分钟)</label>
          <input type="number" autocomplete="off" id="movieDuration" v-model="UploadformData.duration"
            class="form-input" placeholder="请输入分钟数" min="1" required>
        </div>

        <!-- 上映时间字段 -->
        <div class="form-group form-group-inline">
          <label for="releaseDate" autocomplete="off" class="form-label">上映时间</label>
          <input type="date" id="releaseDate" v-model="UploadformData.release_date" class="form-input" required>
        </div>
      </div>

      <!-- 海报链接字段（保持原样） -->
      <div class="form-group">
        <label for="moviePoster" class="form-label">海报图片链接</label>
        <input type="url" autocomplete="off" id="moviePoster" v-model="UploadformData.poster" class="form-input"
          placeholder="请输入图片链接" required>
        <p class="form-hint">提示：上传图片到图床后，将链接粘贴到此处</p>
      </div>

      <!-- 电影简介字段（保持原样） -->
      <div class="form-group">
        <label for="movieDescription" class="form-label">电影简介</label>
        <textarea autocomplete="off" id="movieDescription" v-model="UploadformData.description" class="form-textarea"
          placeholder="请输入电影简介..." rows="5" required></textarea>
      </div>

      <!-- 提交按钮（保持原样） -->
      <div class="form-actions">
        <button class="submit-btn" @click="uploadMovie">
          上传
        </button>
        <button type="reset" class="reset-btn">重置</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useMoviesStore from '../../store/modules/movies'
import { ElNotification } from 'element-plus';
const useMovies = useMoviesStore()

// const UploadformData = ref({
//   name: '',
//   duration: '',
//   poster: '',
//   description: '',
//   release_date: ''
// });

let props = defineProps(['UploadformData'])

const uploadMovie = async () => {
  // console.log('表单数据:', UploadformData.value);
  const url = '/api/upload_movies'
  const payload = props.UploadformData
  const data = await useMovies.post(url, payload)
  if (data.code === 200)
    ElNotification({ type: 'success', message: data.msg })
  else
    ElNotification({ type: 'error', message: data.msg })
};
</script>

<style scoped>
.movie-upload-container {
  width: 70%;
  margin: 0 auto;
}

.movie-form {
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 35px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

}

/* 新增：Flex 父容器，控制三个字段同行显示 */
.form-row {
  display: flex;
  gap: 20px;
  /* 字段之间的间距 */
  margin-bottom: 0;
  /* 与下方海报字段的间距，替代原form-group的margin-bottom */
}

/* 新增：同行字段的样式调整，避免宽度溢出 */
.form-group-inline {
  flex: 1;
  /* 三个字段平均分配父容器宽度 */
  margin-bottom: 0;
  /* 取消单个字段的底部间距，由form-row统一控制 */
}

/* 原有form-group样式（海报、简介用） */
.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: #b0b0b0;
  font-size: 15px;
  transition: color 0.3s ease;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 14px 18px;
  background-color: #2d2d2d;
  border: 1px solid #3d3d3d;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #666;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #7b7b7b;
  box-shadow: 0 0 0 3px rgba(123, 123, 123, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-hint {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  font-style: italic;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}

.submit-btn,
.reset-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.submit-btn {
  background-color: #3d3d3d;
  color: #e0e0e0;
}

.submit-btn:hover {
  background-color: #555;
  transform: translateY(-2px);
}

.reset-btn {
  background-color: #2d2d2d;
  color: #aaa;
}

.reset-btn:hover {
  background-color: #383838;
  color: #ccc;
}

.icon-upload {
  margin-right: 8px;
}

/* 响应式调整：屏幕小时自动换行，避免挤压 */
@media (max-width: 992px) {
  .form-row {
    flex-direction: column;
    /* 垂直排列 */
    gap: 15px;
    /* 垂直方向的间距 */
  }
}

@media (max-width: 600px) {
  .movie-form {
    padding: 25px;
  }

  .form-actions {
    flex-direction: column;
  }

  .submit-btn,
  .reset-btn {
    width: 100%;
  }
}
</style>