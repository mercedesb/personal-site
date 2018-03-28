import Vue from 'vue'
import App from './App.vue'


// register globally used common components
import AppHeader from './components/AppHeader.vue'
Vue.component('app-header', AppHeader)

new Vue({
  el: '#app',
  render: h => h(App)
})
