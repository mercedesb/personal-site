<template>
  <main>
    <div :class="'Hero Hero--' + color">
      <h2>{{ title }}</h2>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    title: String,
    color: String
  }
}
</script>

<style lang="scss">
</style>