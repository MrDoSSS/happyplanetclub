import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { guardPipeline } from './guard-pipeline'
import Home from '@/views/Home.vue'
import BaseLayout from '@/layouts/Base.vue'
import { useAuthStore } from '@/store/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/Empty.vue'),
    children: [
      {
        path: '/admin/login',
        name: 'admin-login',
        component: () => import('@/views/admin/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        name: 'admin-whitelist-index',
        path: 'whitelist',
        component: () => import('@/views/admin/Whitelist.vue'),
      },
      {
        name: 'admin-airdrop-index',
        path: 'airdrop',
        component: () => import('@/views/admin/Airdrop.vue'),
      },
    ],
    meta: {
      guard: ['admin'],
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  guardPipeline({ to, from, next, store })()
})
