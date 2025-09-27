<template>
  <div class="auth-container">
    <div class="auth-box">
      <!-- 登录/注册切换 -->
      <div class="tabs">
        <button :class="{ active: isLogin }" @click="isLogin = true">登录</button>
        <button :class="{ active: !isLogin }" @click="isLogin = false">注册</button>
      </div>

      <!-- 登录表单（包含忘记密码模式） -->
      <el-form v-if="isLogin" @submit.prevent="isResetPassword ? handleResetPassword() : handleLogin()"
        :rules="login_rules" ref="loginFormRef" :model="loginForm">
        <el-form-item class="form-item" prop="email">
          <label>邮箱</label>
          <input type="email" v-model="loginForm.email" placeholder="请输入邮箱" />
        </el-form-item>

        <!-- 普通登录密码输入 -->
        <el-form-item class="form-item" v-if="loginMethod === 'password' && !isResetPassword" prop="password">
          <label>密码</label>
          <input type="password" v-model="loginForm.password" placeholder="请输入密码" />
        </el-form-item>

        <!-- 验证码输入 -->
        <el-form-item class="form-item code-item" v-if="loginMethod === 'code' || isResetPassword" prop="code">
          <input type="text" v-model="loginForm.code" placeholder="请输入验证码" />
          <button type="button" class="code-btn" @click="postEmailCode">发送验证码</button>
        </el-form-item>

        <!-- 重置密码输入 -->
        <el-form-item class="form-item" v-if="isResetPassword" prop="newPassword">
          <label>新密码</label>
          <input type="password" v-model="loginForm.newPassword" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item class="form-item" v-if="isResetPassword" prop="confirmPassword">
          <label>确认密码</label>
          <input type="password" v-model="loginForm.confirmPassword" placeholder="请再次输入密码" />
        </el-form-item>

        <!-- 链接区域：左边忘记密码/返回登录，右边切换登录方式 -->
        <div style="display: flex; justify-content: space-between; margin: 15px 0 20px; font-size: 14px;">
          <!-- 左边 -->
          <div @click="isResetPassword ? backToLogin() : forgotPassword()" style="color: #764ba2; cursor: pointer;">
            {{ isResetPassword ? '返回登录' : '忘记密码？' }}
          </div>
          <!-- 右边 -->
          <div v-if="!isResetPassword" @click="toggleLoginMethod()" style="color: #764ba2; cursor: pointer;">
            {{ loginMethod === 'password' ? '使用验证码登录' : '使用密码登录' }}
          </div>
        </div>

        <button type="submit" class="submit-btn">{{ isResetPassword ? '重置密码' : '登录' }}</button>
      </el-form>

      <!-- 注册表单 -->
      <el-form v-else @submit.prevent="handleRegister" :rules="register_rules" ref="registerFormRef"
        :model="registerForm">
        <el-form-item class="form-item" prop="name">
          <label>用户名</label>
          <input type="text" v-model="registerForm.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item class="form-item" prop="email">
          <label>邮箱</label>
          <input type="email" v-model="registerForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item class="form-item code-item" prop="code">
          <input type="text" v-model="registerForm.code" placeholder="请输入验证码" />
          <button type="button" class="code-btn" @click="postEmailCode">发送验证码</button>
        </el-form-item>
        <el-form-item class="form-item" prop="password">
          <label>密码</label>
          <input type="password" v-model="registerForm.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item class="form-item" prop="confirmPassword">
          <label>确认密码</label>
          <input type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
        </el-form-item>
        <button type="submit" class="submit-btn">注册</button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RegisterRules, LoginRules } from '../../utils/rules'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
const $router = useRouter()
import useLoginRegisterStore from '../../store/modules/loginRegister'
let LoginRegister = useLoginRegisterStore()

const isLogin = ref(true)
const loginMethod = ref('password')
const isResetPassword = ref(false) // 新增：重置密码状态

const loginForm = ref({
  email: '',
  password: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})
const loginFormRef = ref()

const registerForm = ref({
  name: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})
const registerFormRef = ref()

const register_rules = computed(() => RegisterRules(registerForm.value))
const login_rules = computed(() => LoginRules(loginForm.value))

// 登录
const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
  } catch (error) {
    return
  }
  const url = '/api/login'
  const payload = loginMethod.value === 'password' ?
    {
      email: loginForm.value.email,
      password: loginForm.value.password,
      method: 'password'
    } : {
      email: loginForm.value.email,
      code: loginForm.value.code,
      method: 'code'
    }

  const data = await LoginRegister.post(url, payload)
  if (data.code === 200) {
    ElNotification({ type: 'success', message: '登录成功' })
    $router.push('/')
  } else
    ElNotification({ type: 'error', message: data.msg })

}

// 注册
const handleRegister = async () => {
  try {
    await registerFormRef.value.validate()
  } catch (error) {
    return
  }
  const url = '/api/register'
  const payload = {
    email: registerForm.value.email,
    password: registerForm.value.password,
    name: registerForm.value.name,
    code: registerForm.value.code
  }
  const data = await LoginRegister.post(url, payload)
  if (data.code === 200) {
    ElNotification({ type: 'success', message: '注册成功' })
  } else
    ElNotification({ type: 'error', message: data.msg })

}
// 忘记密码
const handleResetPassword = async () => {
  try {
    await loginFormRef.value.validate()
  } catch (error) {
    return
  }
  const url = '/api/forget'
  const payload = {
    email: loginForm.value.email,
    code: loginForm.value.code,
    password: loginForm.value.newPassword
  }
  const data = await LoginRegister.post(url, payload)
  if (data.code === 200) {
    ElNotification({ type: 'success', message: data.msg })
    backToLogin()
  } else
    ElNotification({ type: 'error', message: data.msg })

}

//单独邮箱规则校验
const beforePost = async () => {
  if (!isLogin.value && !registerForm.value.email.trim()
    || isLogin.value && !loginForm.value.email.trim()) {
    ElNotification({ type: 'error', message: '邮箱不能为空！' })
    return 0
  }
  try {
    isLogin.value ?
      await loginFormRef.value.validateField('email') :
      await registerFormRef.value.validateField('email')
    return 1
  } catch (error) {
    ElNotification({ type: 'error', message: '请输入正确的邮箱格式' })
    return 0
  }
}

// 发送验证码
const postEmailCode = async () => {
  const ok = await beforePost()
  if (!ok) return

  const url = '/api/sendCode'
  const payload =
    isLogin.value ?
      isResetPassword ?
        { email: loginForm.value.email, method: 'forget' } :
        { email: loginForm.value.email, method: 'login' } :
      { email: registerForm.value.email, method: 'register' }

  const data = await LoginRegister.post(url, payload)
  if (data.code === 200) {
    ElNotification({ type: 'success', message: data.msg })
  } else
    ElNotification({ type: 'error', message: data.msg })
}

// 切换登录方式
const toggleLoginMethod = () => {
  loginMethod.value = loginMethod.value === 'password' ? 'code' : 'password'
}

// 点击忘记密码
const forgotPassword = () => {
  isResetPassword.value = true
  loginMethod.value = 'code'
  loginForm.value.password = ''
  loginForm.value.newPassword = ''
  loginForm.value.confirmPassword = ''
}

// 点击返回登录
const backToLogin = () => {
  isResetPassword.value = false
  loginMethod.value = 'password'
  loginForm.value.password = ''
  loginForm.value.code = ''
  loginForm.value.newPassword = ''
  loginForm.value.confirmPassword = ''
}


</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-box {
  width: 420px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
  border-bottom: 2px solid #eee;
}

.tabs button {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 17px;
  color: #999;
  font-weight: 500;
}

.tabs button.active {
  color: #764ba2;
  border-bottom: 3px solid #764ba2;
}

.form-item {
  margin-bottom: 18px;
}

.form-item label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

.form-item input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
}

.form-item input:focus {
  border-color: #764ba2;
  box-shadow: 0 0 8px rgba(118, 75, 162, 0.3);
}

.code-item {
  display: flex;
  align-items: center;
}

.code-item input {
  flex: 1;
  margin-right: 10px;
}

.code-btn {
  padding: 8px 12px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.code-btn:hover {
  background: linear-gradient(90deg, #764ba2, #667eea);
}

.help-meta {
  text-align: right;
  margin-bottom: 6px;
  font-size: 14px;
  color: #764ba2;
  cursor: pointer;
}

.forgot-password {
  text-align: right;
  margin-bottom: 18px;
  font-size: 14px;
  color: #ff4d4f;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover {
  background: linear-gradient(90deg, #764ba2, #667eea);
}
</style>
