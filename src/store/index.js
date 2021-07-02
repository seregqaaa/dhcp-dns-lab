import Vue from 'vue'
import Vuex from 'vuex'

import { ACTIONS, GETTERS, MUTATIONS } from '@/constants'

import { fillGradually } from '@/utils/arrays'

import ApiManager from '@/api/Manager'

import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessTest: [],
    accessTestResult: 0,
    isAccessTestPassed: false,
    isModalActive: false,
    isFinalTestPassed: false,
    isPracticePassed: false,
    isAuthorized: false,
    finalTest: [],
    finalTestResult: {},
    attemptsCount: 2,
    disabledUntil: null,
    userName: '',
    userGroup: ''
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
      const response = await ApiManager.finalTest.getResult({
        answers: payload.answers,
        userName: store.state.userName,
        userGroup: store.state.userGroup
      })
      store.commit(MUTATIONS.SET_FINAL_TEST_RESULT, {
        finalTestResult: response.result,
        isPassed: response.isPassed
      })
    },
    [ACTIONS.SET_ACCESS_TEST_PASSED_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_ACCESS_TEST_PASSED_STATUS, payload)
    },
    [ACTIONS.SET_MODAL_STATUS](store, payload) {
      store.commit(MUTATIONS.SET_MODAL_STATUS, payload)
    },
    [ACTIONS.SET_FINAL_TEST_DISABLED_UNTIL](store, payload) {
      store.commit(MUTATIONS.SET_FINAL_TEST_DISABLED_UNTIL, payload)
    },
    [ACTIONS.SET_USER_DATA](store, payload) {
      store.commit(MUTATIONS.SET_USER_DATA, payload)
    },
    [ACTIONS.SET_PRACTICE_RESULT](store) {
      store.commit(MUTATIONS.SET_PRACTICE_RESULT)
    }
  },
  mutations: {
    [MUTATIONS.SET_USER_DATA](state, payload) {
      state.isAuthorized = true
      state.userGroup = payload.group
      state.userName = payload.name
    },
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
      state.finalTestResult = {}
      state.isFinalTestPassed = false
      fillGradually(payload.test, state.finalTest)
    },
    [MUTATIONS.SET_FINAL_TEST_RESULT](state, payload) {
      state.attemptsCount -= 1
      state.finalTestResult = { ...payload.finalTestResult }
      state.isFinalTestPassed = payload.isPassed
    },
    [MUTATIONS.SET_FINAL_TEST_DISABLED_UNTIL](state, payload) {
      state.disabledUntil = payload.until
    },
    [MUTATIONS.SET_PRACTICE_RESULT](state) {
      state.isPracticePassed = true
    }
  },
  getters: {
    [GETTERS.GET_ACCESS_TEST]: state => state.accessTest,
    [GETTERS.GET_ACCESS_TEST_PASSED_STATUS]: state => state.isAccessTestPassed,
    [GETTERS.GET_IS_MODAL_ACTIVE]: state => state.isModalActive,
    [GETTERS.GET_FINAL_TEST]: state => state.finalTest,
    [GETTERS.GET_FINAL_TEST_RESULT]: state => state.finalTestResult,
    [GETTERS.GET_FINAL_TEST_PASSED_STATUS]: state => state.isFinalTestPassed,
    [GETTERS.GET_FINAL_TEST_ATTEMPTS_COUNTER]: state => state.attemptsCount,
    [GETTERS.GET_FINAL_TEST_DISABLED_UNTIL]: state => state.disabledUntil,
    [GETTERS.GET_USER_AUTH_STATUS]: state => state.isAuthorized,
    [GETTERS.GET_PRACTICE_RESULT]: state => state.isPracticePassed
  }
})
