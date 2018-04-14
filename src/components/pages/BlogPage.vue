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
  data: {
    urlSegment: ''
  },
  created() {
    this.urlSegment = this.$route.path.replace(/^\//, '')
  }
}
</script>

<style lang="scss">
</style>