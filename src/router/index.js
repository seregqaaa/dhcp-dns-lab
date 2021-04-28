import Vue from 'vue'
import VueRouter from 'vue-router'

import { ROUTE_NAMES, ROUTE_PATHS } from '../constants'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: ROUTE_PATHS.HOME,
      name: ROUTE_NAMES.HOME,
      component: () => import('@/components/pages/MainPage')
    },
    {
      path: ROUTE_PATHS.THEORY,
      name: ROUTE_NAMES.THEORY,
      component: () => import('@/components/pages/AppTheory')
    },
    {
      path: ROUTE_PATHS.ACCESS_TEST,
      name: ROUTE_NAMES.ACCESS_TEST,
      component: () => import('@/components/pages/AccessTest')
    },
    {
      path: ROUTE_PATHS.PRACTICE,
      name: ROUTE_NAMES.PRACTICE,
      component: () => import('@/components/pages/PracticeTask')
    },
    {
      path: ROUTE_PATHS.FINAL_TEST,
      name: ROUTE_NAMES.FINAL_TEST,
      component: () => import('@/components/pages/FinalTest')
    }
  ]
})
