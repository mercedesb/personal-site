import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dev from './store/dev'

// register globally used common components
import SmartLink from './components/SmartLink.vue'
Vue.component('smart-link', SmartLink)

const contentStore = process.env.NODE_ENV === 'production' ? store : dev
debugger
new Vue({
  router,
  store: contentStore,
  el: '#app',
  render: h => h(App)
})
