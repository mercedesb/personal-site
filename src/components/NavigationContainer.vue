<template>
  <Navigation :navLinks="navLinks" :homeLink="homeLink" />
</template>

<script>
import Navigation from './Navigation.vue'
import images from '../mixins/images'

export default {
  components: {
    Navigation
  },
  mixins: [
    images
  ],
  computed: {
    navLinks () {
      return this.$store.state.navLinks.slice(1).map((link) => {
        return {
          parsedLink: link.externalLink ? link.externalLink : `/${link.urlSegment}`,
          ...link,
          iconSvg: link.iconSvg.fields.svg
        }
      })
    },
    homeLink () {
      const link = this.$store.state.navLinks[0]
      if (link) {
        return {
          parsedLink: '/',
          ...link,
          iconSvg: link.icon.fields.svg
        }
      } else {
        return {
          parsedLink: '/',
          iconSvg: ''
        }
      }
    }
  }
}
</script>