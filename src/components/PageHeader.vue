<template>
  <main :class="'PageHeader PageHeader--' + color">
    <div class="PageHeader-media">
      <img :src="media" />
    </div>
    <div class="PageHeader-text">
      <h1>{{ title }}</h1>
      <p class="PageHeader-description">{{ preamble }}</p>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    color: String,
    title: String,
    preamble: String,
    media: String
  }
}
</script>

<style lang="scss" scoped>
  $header-height: 300px;
  $media-width: 240px;
  $text-width: 500px;

  .PageHeader {
    box-shadow: $base-drop-shadow;
    height: $header-height;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    &-media {
      width: $media-width;
      padding: 0 $base-spacing;
    }

    &-text {
      width: $text-width;
      padding: 0 $base-spacing;
    }

    &-description {
      font-family: $header-font-family;
      font-size: $large-font-size;
    }

    @include background-color;
  }
</style>