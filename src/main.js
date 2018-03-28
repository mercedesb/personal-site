import Vue from 'vue'
import App from './App.vue'
import router from './router'

// register globally used common components
import AppHeader from './components/AppHeader.vue'
Vue.component('app-header', AppHeader)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
