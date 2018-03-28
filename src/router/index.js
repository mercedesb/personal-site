import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '../components/pages/Home.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: HomePage }
  ]
})