<template>
  <div>
  <HeroHeader :title="page.preamble" color='brown' :image="mainImageUrl"></HeroHeader>
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

function fetchHomePage () {
  return client.getEntries({
      content_type: 'home'
    })
  .then((response) => {
    return response.items[0]
  })
  .catch((error) => {
    console.log(`\nError occurred while fetching Entries for home:`)
    console.error(error)
  })
}

function getMainImageUrl (homePage) {
  if (homePage.mainImage && homePage.mainImage.fields && homePage.mainImage.fields.file) {
    return homePage.mainImage.fields.file.url
  }
  return ''
}

export default {
  components: {
    HeroHeader, ContentColumn
  },
  data () {
    return {
      page: {},
      mainImageUrl: '',
      columns: [],
      errors: []
    }
  },
  created () {
    return fetchHomePage()
    .then((homePage) => {
      this.page = homePage.fields
      this.mainImageUrl = getMainImageUrl(this.page)

      homePage.fields.children.forEach((child, index) => {
        this.columns.push({
          color: colors[index % colors.length],
          landingPage: {
            ...child.fields
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