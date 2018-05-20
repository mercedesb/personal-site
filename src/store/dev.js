import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const DevStore = new Vuex.Store({
  state: {
    errors: [],
    blogPosts: [],
    blogPost: {},
    landingPage: {},
    homePage: {},
    navLinks: [],
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
    clearEntries (state) {
      state.entries = []
    }
  },
  actions: {
    getBlogPosts (context) {
      context.commit('clearBlogPosts')
      context.commit('blogPosts', [
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        }
      ])
    },
    getBlogPost (context, urlSegment) {
      context.commit('clearBlogPost')
      context.commit('blogPost', {
        title: '',
        preamble: '',
        mainContent: '',
        urlSegment: urlSegment,
        tags: [],
        publishDate: ''
      })
    },
    getLandingPage (context, urlSegment) {
      context.commit('clearLandingPage')
      let lp = {}// landingPages[urlSegment]
      if (!lp) {
        lp = {
          title: '',
          preamble: '',
          icon: '',
          mainContent: '',
          ctaLinks: '',
          urlSegment: '',
          externalLink: '',
          color: '',
          showContact: '',
          showBlogPosts: ''
        }
      }
      context.commit('landingPage', lp)
    },
    getHomePage (context) {
      debugger
      context.commit('clearHomePage')
      const homePage = {
        id: 'homepage',
        preamble: 'here is the dev homepage preamble, it\'s a little long to be more realistic',
        mainImage: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        children: '',
        backgroundImages: [
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          },
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          },
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          }
        ]
      }
      context.commit('homePage', homePage)
    },
    getNavLinks (context) {
      context.commit('clearNavLinks')
      context.commit('navLinks', [
        {

        },
        {

        },
        {

        },
        {

        }
      ])
    }
  }
})

export { DevStore }
