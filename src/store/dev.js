import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const json = require('../../test/testData.json')
const landingPages = json['landingPages']

const DevStore = new Vuex.Store({
  state: {
    errors: [],
    blogPosts: [],
    blogPost: {},
    landingPage: {},
    homePage: {},
    navLinks: [],
    backgroundImages: [],
    entries: []
  },
  mutations: {
    blogPosts (state, blogPosts) {
      state.blogPosts = blogPosts
    },
    blogPost (state, blogPost) {
      state.blogPost = blogPost
    },
    landingPage (state, landingPage) {
      state.landingPage = landingPage
    },
    homePage (state, homePage) {
      state.homePage = homePage
    },
    navLinks (state, navLinks) {
      state.navLinks = navLinks
    },
    backgroundImages (state, backgroundImages) {
      state.backgroundImages = backgroundImages
    },
    entries (state, entries) {
      state.entries = entries
    },
    clearBlogPosts (state) {
      state.blogPosts = []
    },
    clearBlogPost (state) {
      state.blogPost = {}
    },
    clearLandingPage (state) {
      state.landingPage = {}
    },
    clearHomePage (state) {
      state.homePage = {}
    },
    clearNavLinks (state) {
      state.navLinks = []
    },
    clearBackgroundImages (state) {
      state.backgroundImages = []
    },
    clearEntries (state) {
      state.entries = []
    }
  },
  actions: {
    getBlogPosts (context) {
      context.commit('clearBlogPosts')
      context.commit('blogPosts', [
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
      ])
    },
    getBlogPost (context, urlSegment) {
      context.commit('clearBlogPost')
      const bp = {
        id: 'blogPost1',
        title: 'blog post 1 title',
        preamble: 'blog post 1 preamble',
        mainContent: '',
        urlSegment: urlSegment,
        tags: [],
        publishDate: '2018-04-25T00:00-05:00'
      }
      context.commit('blogPost', bp)
      return bp
    },
    getLandingPage (context, urlSegment) {
      context.commit('clearLandingPage')
      let lp
      if (landingPages[urlSegment]) {
        lp = {
          id: landingPages[urlSegment].sys.id,
          ...landingPages[urlSegment].fields
        }
      }
      else {
        lp = {
          title: 'Test',
          preamble: '',
          icon: {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          },
          mainContent: '',
          ctaLinks: [],
          urlSegment: 'test',
          externalLink: '',
          color: 'red',
          showContact: false,
          showBlogPosts: false
        }
      }
      context.commit('landingPage', lp)
      return lp
    },
    getHomePage (context) {
      context.commit('clearHomePage')
      const homePage = {
        ...json['homePage'],
        children: Object.keys(landingPages).map((key) => {
          return landingPages[key]
        })
      }
      context.commit('homePage', homePage)
    },
    getNavLinks (context) {
      context.commit('clearNavLinks')
      context.commit('navLinks', Object.keys(landingPages).map((key) => {
        return {
          id: landingPages[key].sys.id,
          ...landingPages[key].fields
        }
      }))
    },
    getBackgroundImages (context) {
      context.commit('clearBackgroundImages')
      context.commit('backgroundImages', [
        ...json['homePage']['backgroundImages']
      ])
    }
  }
})

export { DevStore }
