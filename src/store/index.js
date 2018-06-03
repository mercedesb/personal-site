import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  errors: [],
  blogPosts: [],
  blogPost: {},
  landingPage: {},
  homePage: {},
  navLinks: [],
  backgroundImages: [],
  entries: []
}

export const mutations = {
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
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {
    getBlogPosts (context) {
      context.commit('clearBlogPosts')
      context.dispatch('getEntries', {
        content_type: 'blogPost',
        order: `-fields.publishDate`
      })
        .then((entries) => {
          context.commit('blogPosts', entries)
        })
    },
    getBlogPost (context, urlSegment) {
      context.commit('clearBlogPost')
      const { blogPosts } = context.state
      if (blogPosts.length) {
        const matching = blogPosts.filter(blogPost => blogPost.urlSegment === urlSegment)
        if (matching && matching.length) {
          context.commit('blogPost', matching[0])
          return matching[0]
        }
      } else {
        return context.dispatch('getEntries', {
          content_type: 'blogPost',
          'fields.urlSegment': urlSegment
        })
          .then((entries) => {
            const blogPost = entries.length ? entries[0] : {}
            context.commit('blogPost', blogPost)
            return blogPost
          })
      }
    },
    getLandingPage (context, urlSegment) {
      context.commit('clearLandingPage')
      return context.dispatch('getEntries', {
        'fields.urlSegment': urlSegment,
        content_type: 'landingPage',
        include: 2
      })
        .then((entries) => {
          const landingPage = entries.length ? entries[0] : {}
          context.commit('landingPage', landingPage)
          return landingPage
        })
    },
    getHomePage (context) {
      context.commit('clearHomePage')

      return context.dispatch('getEntries', {content_type: 'home'})
        .then((entries) => {
          const homePage = entries.length ? entries[0] : {}
          context.commit('homePage', homePage)
          return homePage
        })
    },
    getNavLinks (context) {
      context.commit('clearNavLinks')
      const { homePage } = context.state
      if (Object.keys(homePage).length > 0) {
        const children = homePage.children.map((item) => {
          return {
            id: item.sys.id,
            ...item.fields
          }
        })
        context.commit('navLinks', children)
      } else {
        context.dispatch('getHomePage')
          .then((homePage) => {
          // TODO: refactor this so we only do it once...
            const children = homePage.children.map((item) => {
              return {
                id: item.sys.id,
                ...item.fields
              }
            })
            context.commit('navLinks', children)
          })
      }
    },
    getBackgroundImages (context) {
      context.commit('clearBackgroundImages')

      let bgdImgPromise
      if (Object.keys(context.state.homePage).length > 0) {
        bgdImgPromise = new Promise((resolve) => {
          resolve(context.state.homePage)
        })
      } else {
        bgdImgPromise = context.dispatch('getHomePage')
      }

      bgdImgPromise
        .then((homePage) => {
          const backgroundImages = homePage.backgroundImages.map((item) => {
            return {
              id: item.sys.id,
              ...item.fields
            }
          })
          context.commit('backgroundImages', backgroundImages)
        })
    },
    getEntries (context, query) {
      const client = require('contentful')
        .createClient({
          space: process.env.SPACE_ID,
          accessToken: process.env.CDA_TOKEN
        })

      context.commit('clearEntries')

      return client.getEntries(query)
        .then((response) => response)
        .then(res => {
          const entries = res.items.map((item) => {
            return {
              id: item.sys.id,
              ...item.fields
            }
          })
          context.commit('entries', entries)
          return entries
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
})
