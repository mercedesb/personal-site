<template>
  <div id="app">
    <HomeLayout v-if="$route.path === '/'" />
    <ContentLayout v-if="$route.path !== '/'" />
  </div>
</template>

<script>
import HomeLayout from './components/HomeLayout.vue'
import ContentLayout from './components/ContentLayout.vue'
export default {
  name: 'app',
  components: {
    HomeLayout, ContentLayout
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
