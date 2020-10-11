import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 首页页面
  {
    path: '/',//首页
    name: 'Home',
    component: Home,
    meta:{
      show:true,
    }
  },
  {
    path: '/course',//课程详情
    name: 'Course',
    component: () => import('../views/home/Course.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/teacher',//教师详情
    name: 'Teacher',
    component: () => import('../views/home/Teacher.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/hotinfo',//热门资讯
    name: 'HotInfo',
    component: () => import('../views/home/HotInfo.vue'),
    meta:{
      show:false,
    }
  },

  // 课程页面
  {
    path: '/courses',//课程页面
    name: 'Courses',
    component: () => import('../views/course/index.vue'),
    meta:{
      show:true,
    }
  },
  {
    path: '/coursearch',
    name: 'CourSearch',
    component: () => import('../views/course/CourSearch.vue'),
    meta:{
      show:false,
    }
  },

  // 资讯页面
  {
    path: '/message',//资讯页面
    name: 'Message',
    component: () => import('../views/message/index.vue'),
    meta:{
      show:true,
    }
  },

  // 图书页面
  {
    path: '/books',//图书页面
    name: 'Books',
    component: () => import('../views/books/index.vue'),
    meta:{
      show:true,
    }
  },

  // 我的页面
  {
    path: '/user',//我的页面
    name: 'User',
    component: () => import('../views/user/User.vue'),
    meta:{
      show:true,
    }
  },

  // 登录页面
  {
    path: '/login',//密码登录
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/smslogin',//验证码登录
    name: 'Smslogin',
    component: () => import('../views/login/Smslogin.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/getback',//找回密码
    name: 'Getback',
    component: () => import('../views/login/Getback.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/userdeal',//用户注册协议
    name: 'Userdeal',
    component: () => import('../views/login/userdeal/Userdeal.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/guarddeal',//隐私保护协议
    name: 'Guarddeal',
    component: () => import('../views/login/userdeal/guarddeal.vue'),
    meta:{
      show:false,
    }
  },
  {
    path: '/setpwd',//设置密码
    name: 'Setpwd',
    component: () => import('../views/login/userdeal/Setpwd.vue'),
    meta:{
      show:false,
    }
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
