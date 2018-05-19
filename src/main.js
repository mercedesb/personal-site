import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// register globally used common components
import SmartLink from './components/SmartLink.vue'
Vue.component('smart-link', SmartLink)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
