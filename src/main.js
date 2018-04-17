import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// register globally used common components
import AppHeader from './components/AppHeader.vue'
import ParseMarkdown from './components/ParseMarkdown.vue'
Vue.component('app-header', AppHeader)
Vue.component('parse-markdown', ParseMarkdown)
console.log(store)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
