<template>
  <div id="app">
    <AppHeader :classModifier="$route.path === '/' ? 'justifyCenter' : 'spaceBetween'"/>
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
