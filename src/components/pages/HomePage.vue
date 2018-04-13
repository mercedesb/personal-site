<template>
  <div>
  <HeroHeader title='Home' color='brown'></HeroHeader>
  <div class='FlexContainer' v-if="landingPages.length">
      <ContentColumn
        v-for="landingPage in landingPages"
        :key="landingPage.id"
        :metadata="landingPage"
      />
  </div>
</div>
</template>

<script>
import HeroHeader from '../HeroHeader.vue'
import ContentColumn from '../ContentColumn.vue'

const contentful = require('contentful')
const config = require('../../../config.json');

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: cdaToken
})

// Load all entries for a given Content Type from Contentful
function fetchHomePage () {
  return client.getEntries({
      content_type: 'home'
    })
  .then((response) => response.items[0])
  .catch((error) => {
    console.log(`\nError occurred while fetching Entries for home:`)
    console.error(error)
  })
}

function getLandingPages () {
  return fetchHomePage()
  .then((homePage) => {
    const landingPages = []
    homePage.fields.children.forEach((child) => {
      landingPages.push({
        id: child.sys.id,
        title: child.fields.title,
        description: child.fields.preamble,
        icon: child.fields.icon
      })

    })
    return landingPages
  })
}

export default {
  components: {
    HeroHeader, ContentColumn
  },
  data () {
    return {
      landingPages: [],
      errors: []
    }
  },
  created () {
    return getLandingPages()
    .then((landingPages) => {
      this.landingPages = landingPages
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
</style>