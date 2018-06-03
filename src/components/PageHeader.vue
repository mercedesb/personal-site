<template>
  <header v-if="title" :class="'PageHeader PageHeader--' + color">
    <div class="PageHeader-background">
      <img class='PageHeader-media' src='../assets/images/AboutIcon.svg' />
    </div>
    </div>
    <div :class="`PageHeader-text ${media ? '' : 'PageHeader-text--center'}`">
      <h1 class='PageHeader-title'>{{ title }}</h1>
      <p class="PageHeader-description">{{ preamble }}</p>
    </div>
    <!-- <Navigation /> -->
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
    box-shadow: $base-drop-shadow;
    height: $header-height;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;

    &-background {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }

    &-media {
      width: $media-width;
      position: relative;
      top: -$media-width/4;
      left: -$media-width/4;
      opacity: .3;

      img {
      }
    }

    &-text {
      padding: 0 $base-spacing;

      @include media($min-tablet) {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
    }

    &-title {
      font-size: 300px;
      opacity: .3;
      margin: -175px -25px 0 0;
      text-align: right;
    }

    &-description {
      text-align: center;
      font-size: $larger-font-size;
    }

    @include background-color;
  }
</style>
