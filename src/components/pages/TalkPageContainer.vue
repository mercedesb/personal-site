<template>
   <TalkPage :page="page" />
</template>

<script>
import TalkPage from './TalkPage.vue'
import objects from '../../mixins/objects'
import images from '../../mixins/images'

const moment = require('moment')

export default {
  components: {
    TalkPage
  },
  mixins: [
    objects, images
  ],
  metaInfo () {
    return {
      title: this.page.title,
      titleTemplate: '%s | Mercedes Bernard',
      meta: [
        { name: 'description', vmid: 'description', content: this.page.preamble },
        { name: 'og:title', vmid: 'og:title', content: this.page.title },
        // Twitter Card data
        { name: 'twitter:card', vmid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', vmid: 'twitter:site', content: '@mercedescodes' },
        { name: 'twitter:title', vmid: 'twitter:title', content: this.page.title },
        { name: 'twitter:description', vmid: 'twitter:description', content: this.page.preamble },
        { name: 'twitter:creator', vmid: 'twitter:creator', content: '@mercedescodes' },
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.page.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        { property: 'og:description', vmid: 'og:description', content: this.page.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  computed: {
    page () {
      const talk = this.$store.state.talk
      let givenAt = []
      if (talk && talk.givenAt) {
        givenAt = talk.givenAt.map(ga => {
          return {
            id: ga.sys.id,
            ...ga.fields,
            date: moment(ga.fields.date).format('MMMM DD, YYYY'),
            slidesLink: this.getImageUrl(ga.fields.slidesLink)
          }
        })
      }
      return {
        ...talk,
        iconSvg: talk.iconSvg ? talk.iconSvg.fields.svg : null,
        givenAt: givenAt
      }
    }
  },
  created () {
    this.$store.dispatch('getTalk', this.$route.params.urlSegment)
      .then((page) => {
        if (this.isEmpty(page)) {
          this.$router.push({name: 'pageNotFound'})
        }

        this.$store.dispatch('getNavLinks')
          .then(() => {
            document.dispatchEvent(new Event('custom-render-trigger'))
          })
      })
  }
}
</script>