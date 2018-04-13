<template>
  <div class='ContentColumn'>
    <img class='ContentColumn-icon' src='' />
    <router-link :to="data.urlSegment">
      <h2 class='ContentColumn-title'>{{ data.title }}</h2>
    </router-link>
    <div class='ContentColumn-description'>
      <p>{{ data.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
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