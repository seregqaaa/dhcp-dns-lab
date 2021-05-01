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
  SET_ACCESS_TEST_PASSED_STATUS: 'setAccessTestPassedStatus'
}

export const MUTATIONS = {
  SET_ACCESS_TEST: 'setAccessTest',
  SET_ACCESS_TEST_PASSED_STATUS: 'setAccessTestPassedStatus'
}

export const GETTERS = {
  GET_ACCESS_TEST: 'getAccessTest',
  GET_ACCESS_TEST_RESULT: 'getAccessTestResult',
  GET_ACCESS_TEST_PASSED_STATUS: 'getIsAccessTestPassed'
}
