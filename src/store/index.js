import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS } from '../constants'

import { fillGradually } from '../utils/arrays'

import ApiManager from '../api/Manager'

import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessTest: [],
    accessTestResult: 0,
    isAccessTestPassed: true,
    isModalActive: false,
    finalTest: [],
    finalTestResult: {}
  },
  actions: {
    async [ACTIONS.FETCH_ACCESS_TEST](store) {
      const test = await ApiManager.accessTest.getTest()
      store.commit(MUTATIONS.SET_ACCESS_TEST, { test })
    },
    async [ACTIONS.SEND_ACCESS_TEST_RESULT](store, payload) {
      const response = await ApiManager.accessTest.getResult(payload.answers)
      store.commit(MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS, {
        isAccessTestPassed: response.isPassed
      })
    },
    async [ACTIONS.FETCH_FINAL_TEST](store) {
      if (!store.state.isAccessTestPassed) {
        router.push({ name: 'home' })
      }
      const test = await ApiManager.finalTest.getTest()
      store.commit(MUTATIONS.SET_FINAL_TEST, { test })
    },
    async [ACTIONS.SEND_FINAL_TEST_RESULT](store, payload) {
      const response = await ApiManager.finalTest.getResult(payload.answers)
      store.commit(MUTATIONS.SET_FINAL_TEST_RESULT, {
        finalTestResult: response.result
      })
    },
    [ACTIONS.SET_ACCESS_TEST_PASSED_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS, payload)
    },
    [ACTIONS.SET_MODAL_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_MODAL_STATUS, payload)
    }
  },
  mutations: {
    [MUTATIONS.SET_ACCESS_TEST](state, payload) {
      state.accessTest = []
      fillGradually(payload.test, state.accessTest)
    },
    [MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS](state, payload) {
      state.isAccessTestPassed = payload.isAccessTestPassed
    },
    [MUTATIONS.SET_MODAL_STATUS](state, payload) {
      state.isModalActive = payload.status
    },
    [MUTATIONS.SET_FINAL_TEST](state, payload) {
      state.finalTest = []
      fillGradually(payload.test, state.finalTest)
    },
    [MUTATIONS.SET_FINAL_TEST_RESULT](state, payload) {
      state.finalTestResult = { ...payload.finalTestResult }
    }
  },
  getters: {
    [GETTERS.GET_ACCESS_TEST]: state => state.accessTest,
    [GETTERS.GET_ACCESS_TEST_PASSED_STATUS]: state => state.isAccessTestPassed,
    [GETTERS.GET_IS_MODAL_ACTIVE]: state => state.isModalActive,
    [GETTERS.GET_FINAL_TEST]: state => state.finalTest,
    [GETTERS.GET_FINAL_TEST_RESULT]: state => state.finalTestResult
  }
})
