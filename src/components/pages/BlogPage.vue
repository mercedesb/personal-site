<template>
  <LandingPage v-bind:urlSegment="urlSegment">
  </LandingPage>
</template>

<script>
import LandingPage from './LandingPage.vue'

export default {
  components: {
    LandingPage
  },
  computed: {
    urlSegment: function () {
      return this.$route.path.replace(/^\//, '')
    }
  }
}
</script>

<style lang="scss">
</style>