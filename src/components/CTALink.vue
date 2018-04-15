<template>
  <div :class="'CTA CTA--' + color">
    <a :href="url" :target="external ? '_blank' : '_self'">
      <div class='CTA-icon'>
        <img :src="icon" />
      </div>
      <h4 class='CTA-title'>{{ title }}</h4>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    url: String,
    color: String,
    external: Boolean
  }
}
</script>

<style lang="scss">
</style>