<template>
  <header v-if="title" :class="'PageHeader PageHeader--' + color">
    <div class="PageHeader-background">
      <img class='PageHeader-media' :src="media" />
    </div>
    <div class='PageHeader-text'>
      <h1 class='PageHeader-title'>{{ title }}</h1>
      <p class="PageHeader-description">{{ preamble }}</p>
    </div>
    <Navigation />
  </header>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  components: {
    Navigation
  },
  props: {
    color: String,
    title: String,
    preamble: String,
    media: String
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  $header-height: 450px;
  $media-width: 800px;
  $text-width: 500px;

  .PageHeader {
    overflow: hidden;
    box-shadow: $base-drop-shadow;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-bottom: $large-spacing;

    @include media($min-tablet) {
      height: $header-height;
    }

    &-background {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;

      @include media($min-tablet) {
        display: block;
      }
    }

    &-media {
      width: $media-width;
      position: relative;
      top: -$media-width/4;
      left: -$media-width/4;
      opacity: $light-opacity;

      img {
      }
    }

    &-text {
      padding: 0 $base-spacing;
      width: 100%;

      @include media($min-tablet) {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
    }

    &-title {
      font-size: 90px;
      text-align: center;

      @include media($min-tablet) {
        font-size: 300px;
        opacity: $light-opacity;
        margin: -60px -25px -40px 0;
        text-align: right;
      }
    }

    &-description {
      text-align: center;
      font-size: $large-font-size;

      @include media($min-tablet) {

        font-size: $larger-font-size;
      }
    }

    @include background-color;
  }
</style>
