<template>
  <div>
    <PageHeader
      :color="color"
      :title="page.title"
      :preamble="page.preamble"
      :media="iconUrl"></PageHeader>
    <div class='FlexContainer FlexContainer--justifyCenter'>
      <p class="PageContent">
        <parse-markdown :source="page.mainContent" />
      </p>
    </div>
  </div>
</template>

<script>
import PageHeader from '../PageHeader.vue'

const contentful = require('contentful')
const config = require('../../../config.json');

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaToken
})

function fetchPage (urlSegment) {
  return client.getEntries(
    {
      'fields.urlSegment': urlSegment,
      content_type: 'landingPage'
    }
  )
  .then((response) => response.items[0])
  .catch((error) => {
    console.log(`\nError occurred while fetching entries for ${urlSegment}:`)
    console.error(error)
  })
}

export default {
  components: {
    PageHeader
  },
  props: {
    urlSegment: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'brown'
    }
  },
  data () {
    return {
      page: {},
      errors: []
    }
  },
  computed: {
    iconUrl: function() {
      if (this.page.icon && this.page.icon.fields && this.page.icon.fields.file) {
        return this.page.icon.fields.file.url
      }
      return ''
    }
  },
  created () {
    return fetchPage(this.urlSegment)
    .then((page) => {
      this.page = page.fields
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
</style>