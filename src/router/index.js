import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '../components/pages/HomePage.vue'
import AboutPage from '../components/pages/About.vue'
import ConnectPage from '../components/pages/Connect.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/connect', component: ConnectPage }
  ]
})