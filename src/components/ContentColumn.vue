<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <router-link :to="link" :target="isExternal ? '_blank' : '_self'">
      <h2 class='ContentColumn-title'>{{ title }}</h2>
    <img class='ContentColumn-icon' :src="iconUrl" />

    <div class='ContentColumn-description'>
      <p>{{ preamble }}</p>
    </div>
    </router-link>
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