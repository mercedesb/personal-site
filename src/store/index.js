import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    errors: [],
    blogPosts:[],
    landingPage: {},
    homePage: {}
  },
  mutations:{
    blogPosts(state,blogPosts) {
      state.blogPosts = blogPosts
    },
    landingPage(state,landingPage) {
      state.landingPage = landingPage
    },
    homePage(state,homePage){
       state.homePage = homePage
    },
    clearBlogPosts(state) {
      state.blogPosts = []
    },
    clearLandingPage(state) {
      state.landingPage = {}
    },
    clearHomePage(state) {
      state.homePage = {}
    }
  },
  actions:{
    getBlogPosts(context) {
      context.commit('clearBlogPosts')
      context.dispatch('getEntries', {
        content_type: 'blogPost',
        order: `-fields.publishDate`
      })
      .then((entries) => {
        context.commit('blogPosts', entries)
      })
    },
    getLandingPage(context, urlSegment) {
      context.commit('clearLandingPage')
      context.dispatch('getEntries', {
        'fields.urlSegment': urlSegment,
        content_type: 'landingPage',
        include: 2
      })
      .then((entries) => {
        context.commit('landingPage', entries.length ? entries[0] : {})
      })
    },
    getHomePage(context) {
      context.commit('clearHomePage')
      context.dispatch('getEntries', {content_type: 'home'})
      .then((entries) => {
        context.commit('homePage', entries.length ? entries[0] : {})
      })
    },
    getEntries(context, query) {
      const contentful = require('contentful')
      const config = require('../../config.json')

      const client = contentful.createClient({
        space: config.spaceId,
        accessToken: config.cdaToken
      })

      return client.getEntries(query)
      .then((response) => response)
      .then(res => {
        return res.items.map((item) => {
          return {
            id: item.sys.id,
            ...item.fields
          }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
})
