import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HomePage from '../components/pages/HomePage.vue'
import BlogPage from '../components/pages/BlogPage.vue'
import BlogPostPage from '../components/pages/BlogPostPage.vue'
import LandingPage from '../components/pages/LandingPage.vue'

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: HomePage },
    { path: '/blog', component: BlogPage },
    { path: '/blog/:urlSegment', name: 'blogPost', component: BlogPostPage },
    { path: '/:urlSegment', component: LandingPage, props: true }
  ]
})