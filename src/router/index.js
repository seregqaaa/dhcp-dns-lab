import Vue from 'vue'
import VueRouter from 'vue-router'

import { GETTERS, ROUTE_NAMES, ROUTE_PATHS } from '@/constants'

import store from '@/store'

Vue.use(VueRouter)

const DEFAULT_TITLE = 'Принципы работы DHCP, DNS и почтового серверов'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
  if (
    !store.getters[GETTERS.GET_USER_AUTH_STATUS] &&
    routeTo.name !== ROUTE_NAMES.HOME
  ) {
    next({ name: ROUTE_NAMES.HOME })
  } else {
    next()
  }
})

router.beforeEach((routeTo, _, next) => {
  if (store.getters[GETTERS.GET_FINAL_TEST_PASSED_STATUS]) {
    next(false)
  }
  next()
})

export default router
