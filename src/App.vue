<template>
  <div id="app">
    <div v-cloak>
    <app-header :classModifier="$route.path === '/' ? 'justifyCenter' : 'spaceBetween'"/>
    <router-view :key="$route.fullPath">
    </router-view>
  </div>
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
