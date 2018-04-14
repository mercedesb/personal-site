<template>
  <main :class="'PageHeader PageHeader--' + color">
    <div class="PageHeader-media">
      <img :src="media" />
    </div>
    <div class="PageHeader-text">
      <h1>{{ title }}</h1>
      <p class="PageHeader-description">{{ preamble }}</p>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    color: String,
    title: String,
    preamble: String,
    media: String
  }
}
</script>

<style lang="scss">
</style>