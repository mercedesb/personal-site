<template>
  <div>
    <PageHeader
      :color="page.color"
      :title="page.title"
      :preamble="page.preamble"
      :media="iconUrl"></PageHeader>
    <div v-if="page.mainContent" class='FlexContainer FlexContainer--justifyCenter'>
      <p class="PageContent">
        <parse-markdown :source="page.mainContent" />
      </p>
    </div>
    <div v-if="ctaLinks.length" class='FlexContainer FlexContainer--justifyCenter'>
      <div class='PageContent PageContent--wide FlexContainer FlexContainer--wrap'>
      <CTALink
        v-for="ctaLink in ctaLinks"
        v-bind="ctaLink"
      />
    </div>
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

function fetchPage (urlSegment) {
  return client.getEntries(
    {
      'fields.urlSegment': urlSegment,
      content_type: 'landingPage',
      include: 2
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
      if (this.page.ctaLinks && this.page.ctaLinks.length) {
        this.page.ctaLinks.forEach((cta, index) => {
          links.push({
            key: cta.sys.id,
            color: cta.fields.color,
            title: cta.fields.title,
            icon: getImageUrl(cta.fields.icon),
            url: cta.fields.externalLink || cta.fields.internalLink.fields.urlSegment,
            external: !!cta.fields.externalLink
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