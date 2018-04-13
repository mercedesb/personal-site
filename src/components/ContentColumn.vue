<template>
  <div class='ContentColumn'>
    <img class='ContentColumn-icon' src='' />
    <h2 class='ContentColumn-title'>{{ metadata.title }}</h2>
    <div class='ContentColumn-description'>
      <p>{{ metadata.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
      required: true,
      validator: value => {
        return !!value.title
      }
    }
  }
}
</script>

<style lang="scss">
</style>