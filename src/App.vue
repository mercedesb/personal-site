<template>
  <div id="app">
  <SideNavigation v-if="$route.path !== '/'" />
  <router-view class="FlexContainer" v-cloak :key="$route.fullPath">
  </router-view>
</div>
</template>

<script>
import SideNavigation from './components/SideNavigation.vue'
export default {
  name: 'app',
  components: {
    SideNavigation
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
