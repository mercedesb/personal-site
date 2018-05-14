import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DevStore } from './store/dev'

// register globally used common components
import AppHeader from './components/AppHeader.vue'
import ParseMarkdown from './components/ParseMarkdown.vue'
import SmartLink from './components/SmartLink.vue'
Vue.component('app-header', AppHeader)
Vue.component('parse-markdown', ParseMarkdown)
Vue.component('smart-link', SmartLink)

Vue.mixin({
  methods: {
    getImageUrl(image) {
      if (image && image.fields && image.fields.file) {
        return image.fields.file.url
      }
      return ''
    }
  }
})

// const contentStore = process.env.NODE_ENV === 'production' ? store : DevStore
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
