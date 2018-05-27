<template>
  <nav class="Navigation">
    <SideNavigation
      :navLinks="navLinks"
      :backgroundImages="backgroundImages"
    />
    <MobileNavigation
      :navLinks="navLinks"
    />
  </nav>
</template>

<script>
import SideNavigation from './SideNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'
import images from '../mixins/images'

export default {
  components: {
    SideNavigation, MobileNavigation
  },
  mixins: [
    images
  ],
  computed: {
    navLinks () {
      return this.$store.state.navLinks.map((link) => {
        return {
          parsedLink: link.externalLink ? link.externalLink : `/${link.urlSegment}`,
          ...link
        }
      })
    },
    backgroundImages () {
      const bgdImgs = this.$store.state.backgroundImages
      if (!bgdImgs || !bgdImgs.length) return []
      return this.$store.state.backgroundImages.map((bgdImage) => {
        return this.getImageUrl(bgdImage)
      })
    }
  },
  created () {
    this.$store.dispatch('getNavLinks')
    this.$store.dispatch('getBackgroundImages')
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.Navigation {
  display: flex; 
  background-color: $brown;
}
</style>
