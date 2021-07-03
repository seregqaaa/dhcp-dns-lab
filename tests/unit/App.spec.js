import { mount } from '@vue/test-utils'

import router from '@/router'
import store from '@/store'

import App from '@/components/app/App.vue'

describe('App.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, { router, store })
  })

  it('renders data', () => {
    expect(wrapper.text()).toContain('Группа')
  })

  it('not displays modal', () => {
    expect(wrapper.vm.isModalActive).toEqual(false)
  })
})
