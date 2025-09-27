import Login from '../views/login/index.vue'
import Layout from "../layout/index.vue"


export const myRoutes = [
  {
    path: "/",
    component: Layout,
    name: 'myLayout',
  },
  {
    path: "/login",
    component: Login,
    name: 'myLogin',
    meta: { title: '登录' }
  },
]
