<template>
  <LandingPage :landingPage="landingPage" :iconSvg="iconSvg" :ctaLinks="ctaLinks" :pageNumber="page" />
</template>

<script>
import LandingPage from './LandingPage.vue'
import images from '../../mixins/images'
import objects from '../../mixins/objects'

export default {
  components: {
    LandingPage
  },
  mixins: [
    images, objects
  ],
  metaInfo () {
    return {
      title: this.landingPage.title,
      titleTemplate: '%s | Mercedes Bernard',
      meta: [
        { name: 'description', vmid: 'description', content: this.landingPage.preamble },
        { name: 'og:title', vmid: 'og:title', content: this.landingPage.title },
        // Twitter Card data
        { name: 'twitter:card', vmid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', vmid: 'twitter:site', content: '@mercedescodes' },
        { name: 'twitter:title', vmid: 'twitter:title', content: this.landingPage.title },
        { name: 'twitter:description', vmid: 'twitter:description', content: this.landingPage.preamble },
        { name: 'twitter:creator', vmid: 'twitter:creator', content: '@mercedescodes' },
        // Twitter Summary card images must be at least 120x120px
        // { name: 'twitter:image', content: 'http://www.example.com/image.jpg' },
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.landingPage.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        // { property: 'og:image', content: 'http://example.com/image.jpg' }
        { property: 'og:description', vmid: 'og:description', content: this.landingPage.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  props: {
    urlSegment: String,
    page: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      path: this.urlSegment,
      intialPageSize: 10
    }
  },
  computed: {
    landingPage () {
      return this.$store.state.landingPage
    },
    iconSvg () {
      return this.landingPage.iconSvg.fields.svg
    },
    ctaLinks () {
      if (!this.landingPage.ctaLinks) return []

      let url

      return this.landingPage.ctaLinks.map((cta) => {
        if (cta.fields.externalLink) {
          url = cta.fields.externalLink
        } else if (cta.fields.internalLink) {
          url = `/${cta.fields.internalLink.fields.urlSegment}`
        } else {
          url = `/${cta.fields.urlSegment}`
        }
        return {
          id: cta.sys.id,
          color: this.landingPage.color,
          title: cta.fields.title,
          iconSvg: cta.fields.iconSvg ? cta.fields.iconSvg.fields.svg : null,
          url: url,
          external: !!cta.fields.externalLink
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getLandingPage', this.path)
      .then((landingPage) => {
        if (this.isEmpty(landingPage)) {
          this.$router.push({name: 'pageNotFound'})
        }

        this.$store.dispatch('getNavLinks')
          .then(() => {
            if (landingPage.showBlogPosts) {
              this.$store.dispatch('getBlogPosts', { page: this.page, pageSize: this.intialPageSize })
                .then(() => {
                  document.dispatchEvent(new Event('custom-render-trigger'))
                })
            }

            if (landingPage.showTalks) {
              this.$store.dispatch('getTalks')
            }
          })
      })
  }
}
</script>