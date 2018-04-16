<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <router-link v-if="!isExternal" :to="link">
      <h2 class='ContentColumn-title'>{{ title }}</h2>
    </router-link>
    <a v-if="isExternal" :href="link" target="_blank">
      <h2 class='ContentColumn-title'>{{ title }}</h2>
    </a>
    <img class='ContentColumn-icon' :src="iconUrl" />

    <div class='ContentColumn-description'>
      <p>{{ preamble }}</p>
    </div>
  </div>
</template>

<script>
function getImageUrl (image) {
  if (image && image.fields && image.fields.file) {
    return image.fields.file.url
  }
  return ''
}

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'brown'
    },
    preamble: String,
    icon: Object,
    externalLink: String,
    urlSegment: String
  },
  computed: {
    iconUrl: function() {
      return getImageUrl(this.icon)
    },
    isExternal: function() {
      return !!this.externalLink
    },
    link: function() {
      if (this.isExternal) {
        return this.externalLink
      }
      else {
        return this.urlSegment
      }
    }
  }
}
</script>

<style lang="scss">
</style>