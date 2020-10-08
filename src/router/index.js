import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('../views/home/Course.vue')
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/home/Teacher.vue')
  },
  {
    path: '/hotinfo',
    name: 'HotInfo',
    component: () => import('../views/home/HotInfo.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/smslogin',
    name: 'Smslogin',
    component: () => import('../views/login/Smslogin.vue')
  },
  {
    path: '/getback',
    name: 'Getback',
    component: () => import('../views/login/Getback.vue')
  },
  {
    path: '/userdeal',
    name: 'Userdeal',
    component: () => import('../views/login/userdeal/Userdeal.vue')
  },
  {
    path: '/guarddeal',
    name: 'Guarddeal',
    component: () => import('../views/login/userdeal/guarddeal.vue')
  },
  {
    path: '/setpwd',
    name: 'Setpwd',
    component: () => import('../views/login/userdeal/Setpwd.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user/User.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
