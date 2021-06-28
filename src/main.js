import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './components/app/App'
import router from './router'
import store from './store'

import beforeUnload from './utils/beforeUnload'

import '@/assets/reset.scss'
import '@/assets/colors.scss'

Vue.config.productionTip = false

if (process.env.NODE_ENV !== 'development') {
  window.addEventListener('beforeunload', beforeUnload)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
