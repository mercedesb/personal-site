<template>
  <div>
  <HeroHeader
    :title="page.preamble"
    color='brown'
    :mainImage="mainImageUrl"
    :backgroundImages="backgroundImageUrls"></HeroHeader>
  <div class='FlexContainer FlexContainer--column'>
  <div class='FlexContainer' v-if="columns.length">
      <ContentColumn
        v-for="column in columns"
        :key="column.key"
        v-bind="column"
      />
  </div>
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

function getImageUrl (image) {
  if (image && image.fields && image.fields.file) {
    return image.fields.file.url
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
      backgroundImageUrls: [],
      columns: [],
      errors: []
    }
  },
  created () {
    return fetchHomePage()
    .then((homePage) => {
      this.page = homePage.fields
      this.mainImageUrl = getImageUrl(homePage.fields.mainImage)

      homePage.fields.backgroundImages.forEach((bgdImage) => {
        this.backgroundImageUrls.push(getImageUrl(bgdImage))
      })

      homePage.fields.children.forEach((child, index) => {
        this.columns.push({
          key: child.sys.id,
          title: child.fields.title,
          color: child.fields.color,
          preamble: child.fields.preamble,
          icon: child.fields.icon,
          externalLink: child.fields.externalLink,
          urlSegment: child.fields.urlSegment
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