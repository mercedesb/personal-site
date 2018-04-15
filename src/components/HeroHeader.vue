<template>
  <main :class="'Hero Hero--' + color">
    <img class="Hero-image" :src="image" />
    <h3 class="Hero-text">{{ title }}</h3>
  </main>
</template>

<script>
export default {
  props: {
    title: String,
    color: String,
    image: String
  }
}
</script>

<style lang="scss">
</style>