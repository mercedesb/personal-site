<template>
  <div>
    <span v-if="!linkExists">
      <slot></slot>
    </span>
    <router-link :to="to" v-if="!isExternal && linkExists" :class="{'router-link-exact-active': subIsActive(to)}">
      <slot></slot>
    </router-link>
    <a :href="to" target='_blank' v-if="isExternal && linkExists">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    isExternal: Boolean
  },
  computed: {
    linkExists() {
      return !!this.to
    }
  },
  methods: {
    subIsActive (path) {
      if (path !== '/') {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      } else {
        return this.$route.path === path
      }
    }
  }
}
</script>

<style lang="scss">
</style>
