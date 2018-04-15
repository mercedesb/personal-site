import Vue from 'vue'
import App from './App.vue'
import router from './router'

// register globally used common components
import AppHeader from './components/AppHeader.vue'
import ParseMarkdown from './components/ParseMarkdown.vue'
Vue.component('app-header', AppHeader)
Vue.component('parse-markdown', ParseMarkdown)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
