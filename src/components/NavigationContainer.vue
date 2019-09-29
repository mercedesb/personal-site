<template>
  <div class="NavigationContainer">
    <Navigation :navLinks="navLinks" :homeLink="homeLink" />
    <MobileNavigation :navLinks="navLinks" :color="color" />
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
import MobileNavigation from './MobileNavigation.vue'
import images from '../mixins/images'

export default {
  components: {
    Navigation, MobileNavigation
  },
  mixins: [
    images
  ],
  props: {
    color: String
  },
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

<style lang="scss">
  .NavigationContainer {
    width: 100%;
  }
</style>