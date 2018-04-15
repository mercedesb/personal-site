<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <router-link v-if="!isExternal" :to="{ name: 'landing', params: { urlSegment: data.urlSegment, color: color } }">
      <h2 class='ContentColumn-title'>{{ data.title }}</h2>
    </router-link>
    <a v-if="isExternal" :href="link" target="_blank">
      <h2 class='ContentColumn-title'>{{ data.title }}</h2>
    </a>
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
    },
    isExternal: function() {
      return !!this.data.externalLink
    },
    link: function() {
      if (this.isExternal) {
        return this.data.externalLink
      }
      else {
        return this.data.urlSegment
      }
    }
  }
}
</script>

<style lang="scss">
</style>