import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAccessTestPassed: false
  },
  actions: {
    [ACTIONS.SET_ACCESS_TEST_PASSED_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS, payload)
    }
  },
  mutations: {
    [MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS](state, payload) {
      state.isAccessTestPassed = payload.isAccessTestPassed
    }
  },
  getters: {
    [GETTERS.GET_ACCESS_TEST_PASSED_STATUS]: state => state.isAccessTestPassed
  }
})
