import Login from '../views/login/index.vue'
import Layout from "../layout/index.vue"

import Home from "../views/main/home/index.vue"
import Movie from "../views/main/movie/index.vue"
import MyOrder from "../views/main/myorder/index.vue"
import Settings from "../views/main/settings/index.vue"

import Admin from "../views/main/admin/index.vue"
import Upload from "../views/main/admin/show/upload/index.vue"
import MovieManagement from "../views/main/admin/show/movieManagement/index.vue"
import UserManagement from "../views/main/admin/show/userManagement/index.vue"
import Schedule from "../views/main/admin/show/schedule/index.vue"
import Hall from "../views/main/admin/show/hall/index.vue"


export const myRoutes = [
  {
    path: "/",
    redirect: '/home',
    name: 'myLayout',
    component: Layout,
    meta: {
      title: ''
    },
    children: [
      {
        path: "home",
        name: 'myHome',
        component: Home,
        meta: {
          title: '首页'
        },
      },
      {
        path: "movie",
        name: 'myMovie',
        component: Movie,
        meta: {
          title: '电影'
        },
      },
      {
        path: "order",
        name: 'myOrder',
        component: MyOrder,
        meta: {
          title: '我的订单'
        },
      },
      {
        path: "settings",
        name: 'mySettings',
        component: Settings,
        meta: {
          title: '设置'
        },
      },
      {
        path: "admin",
        name: 'myAdmin',
        component: Admin,
        meta: {
          title: '管理员入口'
        },
        children: [
          {
            path: "upload",
            name: 'myUpload',
            component: Upload,
            meta: {
              title: '上传电影'
            },
          },
          {
            path: "movieManagement",
            name: 'myMovieManagement',
            component: MovieManagement,
            meta: {
              title: '电影管理'
            },
          },
          {
            path: "hall",
            name: 'myHall',
            component: Hall,
            meta: {
              title: '影厅管理'
            },
          },
          {
            path: "schedule",
            name: 'mySchedule',
            component: Schedule,
            meta: {
              title: '排片记录'
            },
          },
          {
            path: "userManagement",
            name: 'myUserManagement',
            component: UserManagement,
            meta: {
              title: '用户管理'
            },
          },
        ]
      },

    ]
  },
  {
    path: "/login",
    component: Login,
    name: 'myLogin',
    meta: { title: '登录' }
  },
]
