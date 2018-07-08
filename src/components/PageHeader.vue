<template>
  <header :class="`PageHeader PageHeader--${color} PageHeader--${height}`">
    <div class="PageHeader-background" v-if="media">
      <img class='PageHeader-media' :src="media" :alt="`Background icon`" />
    </div>
    <div class='PageHeader-text'>
      <div class='PageHeader-decorativeHeader'>
        <slot name="decorativeHeader"></slot>
      </div>
      <div class='PageHeader-titleHeader'>
        <slot name="titleHeader"></slot>
      </div>
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
    media: String,
    short: Boolean
  },
  computed: {
    height () {
      return this.short ? 'short' : 'defaultHeight'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  $header-height: 450px;
  $header-height-short: 275px;

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

    @include background-color;

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

    &-decorativeHeader {
      margin: 0 $base-spacing;
      text-align: center;

      @include media($min-tablet) {
        margin: 0;
        opacity: $light-opacity;
        text-align: right;
      }

      * {
        font-size: 75px;

        @include media($min-tablet) {
          font-size: 300px;
          margin: -60px -25px -40px 0;
        }
      }
    }

    &-titleHeader {
      margin: 0 $base-spacing;
      text-align: center;

      * {
        font-family: $base-font-family;
        font-weight: $base-font-weight;
        font-size: $large-font-size;

        @include media($min-tablet) {
          font-size: $larger-font-size;
        }
      }
    }

    &--short {
      @include media($min-tablet) {
        height: $header-height-short;
      }

      .PageHeader-decorativeHeader {
        * {
          font-size: $giant-font-size;

          @include media($min-tablet) {
            font-size: 250px;
          }
        }
      }

      .PageHeader-titleHeader {
        @include media($min-tablet) {
          position: absolute;
          top: $header-height / 4;
          width:100%;

          * {
            margin: 0;
          }
        }
      }
    }
  }
</style>
