import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DevStore } from './store/dev'

// const contentStore = process.env.NODE_ENV === 'production' ? store : DevStore
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
