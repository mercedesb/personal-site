<template>
  <div>
  <HeroHeader title='Home' color='brown'></HeroHeader>
  <div class='FlexContainer' v-if="columns.length">
      <ContentColumn
        v-for="column in columns"
        :key="column.landingPage.id"
        :data="column.landingPage"
        :color="column.color"
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
  accessToken: config.cdaToken
})

const colors = ['blue', 'yellow', 'gray', 'red']

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
        ...child.fields
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
      columns: [],
      errors: []
    }
  },
  created () {
    return getLandingPages()
    .then((landingPages) => {
      landingPages.forEach((child, index) => {
        this.columns.push({
          color: colors[index % colors.length],
          landingPage: {
            ...child
          }
        })
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
</style>