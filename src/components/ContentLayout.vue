<template>
  <div class="ContentLayout">
    <transition name="fade" mode="out-in">
      <router-view v-cloak :key="$route.fullPath" />
    </transition>
  </div>
</template>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  .ContentLayout {
    width: 100%;
  }
</style>
