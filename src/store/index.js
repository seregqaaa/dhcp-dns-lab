import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS } from '../constants'

import ApiManager from '../api/Manager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessTest: [],
    isAccessTestPassed: false
  },
  actions: {
    [ACTIONS.SET_ACCESS_TEST_PASSED_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS, payload)
    },
    async [ACTIONS.FETCH_ACCESS_TEST](store) {
      const test = await ApiManager.accessTest.getTest()
      store.commit(MUTATIONS.SET_ACCESS_TEST, { test })
    }
  },
  mutations: {
    [MUTATIONS.SET_ACCESS_TEST](state, payload) {
      state.accessTest = [...payload.test]
    },
    [MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS](state, payload) {
      state.isAccessTestPassed = payload.isAccessTestPassed
    }
  },
  getters: {
    [GETTERS.GET_ACCESS_TEST]: state => state.accessTest,
    [GETTERS.GET_ACCESS_TEST_PASSED_STATUS]: state => state.isAccessTestPassed
  }
})
