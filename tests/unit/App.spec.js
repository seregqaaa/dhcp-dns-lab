import { mount } from '@vue/test-utils'

import router from '@/router'
import store from '@/store'

import App from '@/components/app/App.vue'

describe('App.vue', () => {
  let wrapper = mount(App, { router, store })

  it('not displays modal window', () => {
    expect(wrapper.vm.isModalActive).toEqual(false)
  })
})
