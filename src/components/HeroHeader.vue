<template>
  <header v-if="title" :class="'Hero Hero--' + color">
    <div class="Hero-background" v-if="backgroundImages && backgroundImages.length">
      <img
        v-for="image in backgroundImages"
        :src="image"
        class="Hero-backgroundImage"
      />
    </div>
    <div class="Hero-contentContainer">
      <div>
        <img class="Hero-image" :src="mainImage" />
        <parse-markdown :source="title" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
    color: String,
    mainImage: String,
    backgroundImages: Array
  }
}
</script>

<style lang="scss" scoped>
  $hero-height: 500px;
  $image-width: 250px;
  $text-width: 800px;
  $background-image-max-height: 460px;
  $background-image-max-width: 400px;
  $background-image-min-width: 365px;

  .Hero {
    box-shadow: $base-drop-shadow;
    height: $hero-height;
    position: relative;
    display: flex;
    align-items: center;

    &-background {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }

    &-backgroundImage {
      max-height: $background-image-max-height;
      max-width: $background-image-max-width;
      min-width: $background-image-min-width;
    }

    &-contentContainer {
      z-index: 1;
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
    }

    &-image {
      max-width: $image-width;
    }

    &-text {
      max-width: $text-width;
      text-align: center;
    }

    @include background-color;
  }
</style>