<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <router-link :to="data.urlSegment">
      <h2 class='ContentColumn-title'>{{ data.title }}</h2>
    </router-link>
    <img class='ContentColumn-icon' :src="iconUrl" />

    <div class='ContentColumn-description'>
      <p>{{ data.preamble }}</p>
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
    },
    color: String
  },
  computed: {
    iconUrl: function() {
      if (this.data.icon && this.data.icon.fields && this.data.icon.fields.file) {
        return this.data.icon.fields.file.url
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
</style>