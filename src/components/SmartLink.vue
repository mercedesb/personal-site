<template>
  <div>
    <router-link :to="to" v-if="!isExternal">
      <span>
        <slot></slot>
      </span>
    </router-link>
    <a :href="to" target='_blank' v-if="isExternal">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    isExternal: Boolean
  }
}
</script>

<style lang="scss">
</style>