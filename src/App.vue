<template>
  <div id="app">
    <AppHeader v-if="$route.path !== '/'" :classModifier="'spaceBetween'"/>
    <router-view v-cloak :key="$route.fullPath">
    </router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
