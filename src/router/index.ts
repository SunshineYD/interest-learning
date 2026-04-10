import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/chinese',
    name: 'Chinese',
    component: () => import('@/views/subjects/Chinese.vue')
  },
  // {
  //   path: '/math',
  //   name: 'Math',
  //   component: () => import('@/views/subjects/Math.vue')
  // },
  // {
  //   path: '/english',
  //   name: 'English',
  //   component: () => import('@/views/subjects/English.vue')
  // },
  // {
  //   path: '/record',
  //   name: 'Record',
  //   component: () => import('@/views/Record.vue')
  // },
  // {
  //   path: '/checkin',
  //   name: 'Checkin',
  //   component: () => import('@/views/Checkin.vue')
  // },
  // {
  //   path: '/statistics',
  //   name: 'Statistics',
  //   component: () => import('@/views/Statistics.vue')
  // },
  // {
  //   path: '/knowledge',
  //   name: 'Knowledge',
  //   component: () => import('@/views/Knowledge.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
