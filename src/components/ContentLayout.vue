<template>
  <div class="ContentLayout">
    <Navigation />
    <transition name="fade" mode="out-in">
      <router-view v-cloak :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
import Navigation from './Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';
  
  .ContentLayout {
    display: flex;
    flex: 1;
    height: 100vh;
    overflow: hidden;

    flex-direction: column;

    @include media($min-desktop) {
      flex-direction: row;
    }
  }
</style>