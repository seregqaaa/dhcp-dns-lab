import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS } from '../constants'

import ApiManager from '../api/Manager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessTest: [],
    accessTestResult: 0,
    isAccessTestPassed: false,
    isModalActive: false
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
      const test = payload.test
      const intervalId = setInterval(() => {
        test.length
          ? state.accessTest.push(test.pop())
          : clearInterval(intervalId)
      }, 300)
    },
    [MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS](state, payload) {
      state.isAccessTestPassed = payload.isAccessTestPassed
    },
    [MUTATIONS.SET_MODAL_STATUS](state, payload) {
      state.isModalActive = payload.status
    }
  },
  getters: {
    [GETTERS.GET_ACCESS_TEST]: state => state.accessTest,
    [GETTERS.GET_ACCESS_TEST_PASSED_STATUS]: state => state.isAccessTestPassed,
    [GETTERS.GET_IS_MODAL_ACTIVE]: state => state.isModalActive
  }
})
