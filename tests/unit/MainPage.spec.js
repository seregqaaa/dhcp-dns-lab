import { mount } from '@vue/test-utils'

import router from '@/router'
import store from '@/store'

import MainPage from '@/components/pages/MainPage.vue'

describe('MainPage.vue', () => {
  let wrapper = mount(MainPage, { router, store })

  it('is not authorized', () => {
    expect(wrapper.vm.isAuthorized).toEqual(false)
  })

  it('is access test not passed', () => {
    expect(wrapper.vm.isAccessTestPassed).toEqual(false)
  })

  it('is practice not passed', () => {
    expect(wrapper.vm.isPracticePassed).toEqual(false)
  })

  it('is final test not passed', () => {
    expect(wrapper.vm.isFinalTestPassed).toEqual(false)
  })

  it('has 2 attempts for final test', () => {
    expect(wrapper.vm.attemptsCount).toEqual(2)
  })

  it('has nullish final test `disabledUntil` timer', () => {
    expect(wrapper.vm.finalTestDisabledUntil).toBeNull()
  })
})
