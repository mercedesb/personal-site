<template>
  <div class="ContentLayout">
    <SideNavigation />
    <router-view v-cloak :key="$route.fullPath" />
  </div>
</template>

<script>
import SideNavigation from './SideNavigation.vue'
export default {
  components: {
    SideNavigation
  }
}
</script>

<style lang="scss">
  .ContentLayout {
    display: flex;
    flex: 1;
    height: 100vh;
    overflow: hidden;
  }
</style>