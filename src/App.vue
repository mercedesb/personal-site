<template>
  <div id="app">
    <app-header v-if="$route.path !== '/'"/>
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
