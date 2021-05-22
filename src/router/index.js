import Vue from 'vue'
import VueRouter from 'vue-router'

import { ROUTE_NAMES, ROUTE_PATHS } from '../constants'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'Принципы работы DHCP, DNS и почтового серверов'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTE_PATHS.HOME,
      name: ROUTE_NAMES.HOME,
      component: () => import('@/components/pages/MainPage'),
      meta: {
        title: 'Главная страница'
      }
    },
    {
      path: ROUTE_PATHS.THEORY,
      name: ROUTE_NAMES.THEORY,
      component: () => import('@/components/pages/AppTheory'),
      meta: {
        title: 'Теория'
      }
    },
    {
      path: ROUTE_PATHS.ACCESS_TEST,
      name: ROUTE_NAMES.ACCESS_TEST,
      component: () => import('@/components/pages/AccessTest'),
      meta: {
        title: 'Тест для допуска'
      }
    },
    {
      path: ROUTE_PATHS.PRACTICE,
      name: ROUTE_NAMES.PRACTICE,
      component: () => import('@/components/pages/PracticeTask'),
      meta: {
        title: 'Практика'
      }
    },
    {
      path: ROUTE_PATHS.FINAL_TEST,
      name: ROUTE_NAMES.FINAL_TEST,
      component: () => import('@/components/pages/FinalTest'),
      meta: {
        title: 'Финальный тест'
      }
    }
  ]
})

router.beforeEach((routeTo, _, next) => {
  document.title = routeTo.meta.title ?? DEFAULT_TITLE
  next()
})

export default router
