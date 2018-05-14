import Vue from 'vue'
import Vuex from 'vuex'
import SmartLink from '../src/components/SmartLink.vue'

export default {
  configure() {
    Vue.component('smart-link', SmartLink)
    Vue.use(Vuex)
  },
  landingPages: {
    about: {
      title: 'About',
      preamble: '',
      icon: '',
      mainContent: '',
      ctaLinks: '',
      urlSegment: 'about',
      externalLink: '',
      color: 'blue',
      showContact: false,
      showBlogPosts: false
    },
    blog: {
      title: 'Blog',
      preamble: '',
      icon: '',
      mainContent: '',
      ctaLinks: '',
      urlSegment: 'blog',
      externalLink: '',
      color: 'gray',
      showContact: false,
      showBlogPosts: true
    },
    connect: {
      title: 'Connect',
      preamble: '',
      icon: '',
      mainContent: '',
      ctaLinks: '',
      urlSegment: 'connect',
      externalLink: '',
      color: 'red',
      showContact: true,
      showBlogPosts: false
    },
    shop: {
      title: 'Shop',
      preamble: '',
      icon: '',
      mainContent: '',
      ctaLinks: '',
      urlSegment: '',
      externalLink: 'https://etsy.com/shop/blinddogyarns',
      color: 'yellow',
      showContact: false,
      showBlogPosts: false
    }
  }
}
