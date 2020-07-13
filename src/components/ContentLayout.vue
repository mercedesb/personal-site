<template>
  <div class="ContentLayout">
    <router-view v-cloak :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
@import "../assets/styles/variables.scss";

.ContentLayout {
  width: 100%;
}
</style>
