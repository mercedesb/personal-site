<template>
  <header v-if="title" :class="'Hero Hero--' + color">
    <div class="Hero-contentContainer">
      <div>
        <img class="Hero-image" :src="mainImage" />
        <ParseMarkdown :source="title" />
      </div>
    </div>
    <div class="Hero-background" v-if="backgroundImages && backgroundImages.length">
      <img
        v-for="image in backgroundImages"
        :key="image.id"
        :src="image"
        class="Hero-backgroundImage"
      />
    </div>
  </header>
</template>

<script>
import ParseMarkdown from './ParseMarkdown.vue'

export default {
  components: {
    ParseMarkdown
  },
  props: {
    title: String,
    color: String,
    mainImage: String,
    backgroundImages: Array
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  $image-width: 250px;
  $text-width: 800px;
  $background-image-max-height: 460px;
  $background-image-max-width: 400px;
  $background-image-min-width: 365px;

  .Hero {
    box-shadow: $base-drop-shadow;
    position: relative;
    padding: $base-spacing;

    &-background {
      display: none;

      @include media($min-tablet) {
        display: flex;
        justify-content: space-around;
      }
    }

    &-backgroundImage {
      max-height: 115px;
      max-width: 100px;
      min-width: 91px;

      @include media($min-tablet) {
        max-height: $background-image-max-height;
        max-width: $background-image-max-width;
        min-width: $background-image-min-width;
      }
    }

    &-contentContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      @include media($min-tablet) {
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }

    &-image {
      padding-top: $base-spacing;
      @include media($min-tablet) {
      }

      max-width: $image-width;
    }

    &-text {
      max-width: $text-width;
      text-align: center;
    }

    @include background-color;
  }
</style>
