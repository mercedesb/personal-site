import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import router from './router'
import store from './store'

// register globally used common components
import SmartLink from './components/SmartLink.vue'

Vue.config.productionTip = false
Vue.component('smart-link', SmartLink)
Vue.use(Meta)

new Vue({ // eslint-disable-line no-new
  router,
  store: store,
  el: '#app',
  render: h => h(App)
})
