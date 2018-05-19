import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '../components/pages/HomePage.vue'
import BlogPostPage from '../components/pages/BlogPostPage.vue'
import LandingPage from '../components/pages/LandingPage.vue'
import PageNotFound from '../components/pages/PageNotFound.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: HomePage },
    { path: '/blog/:urlSegment', name: 'blogPost', component: BlogPostPage, props: true },
    { path: '/:urlSegment', component: LandingPage, props: true },
    { path: '/404', alias: '*', name: 'pageNotFound', component: PageNotFound }
  ]
})