import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SmartLink from '../src/components/SmartLink.vue'

export default {
  configure() {
    Vue.component('smart-link', SmartLink)
    Vue.use(Vuex)
  },
  shallow(Component, config = {}) {
    return shallowMount(Component, {
      ...this.defaultConfiguration,
      ...config
    })
  },
  defaultConfiguration: {
    stubs: {
      RouterLink: RouterLinkStub
    },
    mocks: {
      $route: {
        params: {
          urlSegment: 'somePath'
        }
      }
    }
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
  },
  blogPosts: [
    {
      id: 'blogPost1',
      title: 'blog post 1 title',
      preamble: 'blog post 1 preamble',
      mainContent: '',
      urlSegment: '',
      tags: [],
      publishDate: '2018-04-25T00:00-05:00'
    },
    {
      id: 'blogPost2',
      title: 'blog post 2 title',
      preamble: 'blog post 2 preamble',
      mainContent: '',
      urlSegment: '',
      tags: [],
      publishDate: '2018-04-23T00:00-05:00'
    },
    {
      id: 'blogPost3',
      title: 'blog post 3 title',
      preamble: 'blog post 3 preamble',
      mainContent: '',
      urlSegment: '',
      tags: [],
      publishDate: '2018-04-22T00:00-05:00'
    }
  ]
}
