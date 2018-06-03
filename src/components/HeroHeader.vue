<template>
  <header v-if="title" :class="'Hero Hero--' + color">
    <div class="Hero-contentContainer">
      <div class='Hero-content'>
        <img class="Hero-image" src='../assets/images/MerBer-circle.png' />
        <div class='Hero-textContainer'>
          <h1 class='Hero-title'>{{title}}</h1>
          <ParseMarkdown :source="preamble" />
        </div>
      </div>
    </div>
    <div class="Hero-background">
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
    preamble: String,
    color: String,
    mainImage: String,
    backgroundImages: Array
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  $hero-height: 750px;

  $image-width: 450px;
  $text-width: 800px;

  .Hero {
    box-shadow: $base-drop-shadow;
    position: relative;
    padding: $base-spacing;
    min-height: $hero-height;
    overflow: hidden;

    &-background {
      display: none;

      @include media($min-tablet) {
        display: block;
      }
    }

    &-backgroundImage {
      opacity: .3;

      @include media($min-tablet) {
        position: absolute;

        &:first-child {
          width: 50%;
          top: $small-spacing;
        }

        &:nth-child(2) {
          height: 90%;
          bottom: -400px;
          right: 35%;
        }

        &:nth-child(3) {
          height: 110%;
          top: 0;
          right: -$large-spacing;
        }
      }
    }

    &-contentContainer {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;

      @include media($min-tablet) {
        z-index: 1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        flex-direction: row;
        text-align: left;
      }
    }

    &-content {
      font-size: $larger-font-size;

      @include media($min-tablet) {
        display: flex;
        flex-direction: row;
        text-align: left;
        align-items: center;

      }
    }

    &-image {
      padding-top: $base-spacing;
      /* TODO: better way to prevent image distortion */
      max-width: $image-width;
      max-height: $image-width;
      @include media($min-tablet) {
      }
    }

    &-text {
      max-width: $text-width;
      text-align: center;
    }

    &-title {
      padding-left: $base-spacing;
      font-size: $giant-font-size;
    }

    @include background-color;
    &--brown {
      background-color: $brown;
    }
  }
</style>
