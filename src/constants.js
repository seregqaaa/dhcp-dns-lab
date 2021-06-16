export const ROUTE_NAMES = {
  HOME: 'home',
  THEORY: 'theory',
  ACCESS_TEST: 'access-test',
  FINAL_TEST: 'final-test',
  PRACTICE: 'practice'
}

export const ROUTE_PATHS = {
  HOME: '/',
  THEORY: '/theory',
  ACCESS_TEST: '/access-test',
  FINAL_TEST: '/final-test',
  PRACTICE: '/practice'
}

export const ACTIONS = {
  FETCH_ACCESS_TEST: 'fetchAccessTest',
  SEND_ACCESS_TEST_RESULT: 'sendAccessTestResult',
  SET_ACCESS_TEST_PASSED_STATUS: 'setAccessTestPassedStatus',
  SET_MODAL_STATUS: 'setModalStatus',
  FETCH_FINAL_TEST: 'fetchFinalTest',
  SEND_FINAL_TEST_RESULT: 'sendFinalTestResult',
  SET_FINAL_TEST_DISABLED_UNTIL: 'setFinalTestDisabledUntil',
  SET_USER_DATA: 'setUserData',
  SET_PRACTICE_RESULT: 'setPracticeResult'
}

export const MUTATIONS = {
  SET_ACCESS_TEST: 'setAccessTest',
  SET_ACCESS_TEST_PASSED_STATUS: 'setAccessTestPassedStatus',
  SET_MODAL_STATUS: 'setModalStatus',
  SET_FINAL_TEST: 'setFinalTest',
  SET_FINAL_TEST_RESULT: 'setFinalTestResult',
  SET_FINAL_TEST_DISABLED_UNTIL: 'setFinalTestDisabledUntil',
  SET_USER_DATA: 'setUserData',
  SET_PRACTICE_RESULT: 'setPracticeResult'
}

export const GETTERS = {
  GET_ACCESS_TEST: 'getAccessTest',
  GET_ACCESS_TEST_PASSED_STATUS: 'getIsAccessTestPassed',
  GET_IS_MODAL_ACTIVE: 'getIsModalActive',
  GET_FINAL_TEST: 'getFinalTest',
  GET_FINAL_TEST_RESULT: 'getFinalTestResult',
  GET_FINAL_TEST_PASSED_STATUS: 'getFinalTestPassedStatus',
  GET_FINAL_TEST_ATTEMPTS_COUNTER: 'getFinalTestAttemptsCounter',
  GET_FINAL_TEST_DISABLED_UNTIL: 'getFinalTestDisabledUntil',
  GET_USER_AUTH_STATUS: 'getIsUserAuthorized',
  GET_PRACTICE_RESULT: 'getPracticeResult'
}
