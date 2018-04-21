<template>
  <div id="app">
    <app-header :classModifier="$route.path === '/' ? 'justifyCenter' : 'spaceBetween'"/>
    <router-view v-cloak :key="$route.fullPath">
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
