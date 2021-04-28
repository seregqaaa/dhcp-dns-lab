import Vue from 'vue'
import App from './components/app/App'
import router from './router'

// import beforeUnload from './utils/beforeUnload'

import '@/assets/reset.scss'

Vue.config.productionTip = false

// window.addEventListener('beforeunload', beforeUnload)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
