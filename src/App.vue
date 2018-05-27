<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component v-bind:is="currentComponent"></component>
    </transition>
  </div>
</template>

<script>
import HomeLayout from './components/HomeLayout.vue'
import ContentLayout from './components/ContentLayout.vue'
export default {
  name: 'app',
  components: {
    HomeLayout, ContentLayout
  },
  computed: {
    currentComponent () {
      if (this.$route.path === '/') {
        return HomeLayout
      }
      else {
        return ContentLayout
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
