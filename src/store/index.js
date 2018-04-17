import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    entry:[],
    entries:[],
    erros: []
  },
  mutations:{
    entry(state,entry) {
      state.entry = entry;
    },
    entries(state,entries){
       state.entries = entries;
    },
    clearEntry(state) {
      state.entry = {};
    },
    clearEntries(state) {
      state.entries = [];
    }
  },
  actions:{
    getEntries(context,query) {
      context.commit('clearEntries')
      context.commit('clearEntry')
      const contentful = require('contentful')
      const config = require('../../config.json')

      const client = contentful.createClient({
        space: config.spaceId,
        accessToken: config.cdaToken
      })

      client.getEntries(query)
      .then((response) => response)
      .then(res => {
        const entries = res.items.map((item) => {
          return {
            id: item.sys.id,
            ...item.fields
          }
        })
        context.commit('entries', entries)
        context.commit('entry', entries.length ? entries[0] : {})
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
})
