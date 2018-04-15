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
    <div v-if="ctaLinks.length" class='FlexContainer FlexContainer--wrap'>
      <CTALink
        v-for="ctaLink in ctaLinks"
        v-bind="ctaLink.cta"
        :color="ctaLink.color"
      />
    </div>
  </div>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import CTALink from '../CTALink.vue'

const contentful = require('contentful')
const config = require('../../../config.json');

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaToken
})

const colors = ['yellow', 'blue', 'red', 'brown', 'gray']

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

function getImageUrl (image) {
  if (image && image.fields && image.fields.file) {
    return image.fields.file.url
  }
  return ''
}

export default {
  components: {
    PageHeader, CTALink
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
      return getImageUrl(this.page.icon)
    },
    ctaLinks: function () {
      const links = []
      const colorToFilter = this.color
      const colorSubset = colors.filter(current => current !== colorToFilter);
      if (this.page.ctaLinks && this.page.ctaLinks.length) {
        this.page.ctaLinks.forEach((cta, index) => {
          links.push({
            color: colorSubset[index % colorSubset.length],
            cta: {
              key: cta.sys.id,
              title: cta.fields.title,
              icon: getImageUrl(cta.fields.icon),
              url: cta.fields.externalLink || cta.fields.internalLink.fields.urlSegment,
              external: !!cta.fields.externalLink
            }
          })
        })
      }
      return links
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