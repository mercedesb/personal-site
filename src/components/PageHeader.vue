<template>
  <header :class="`PageHeader PageHeader--${color} PageHeader--${height}`">
    <div class="PageHeader-background" v-if="icon">
      <div class='PageHeader-media' v-html="icon"></div>
    </div>
    <div class='PageHeader-text'>
      <div class='PageHeader-decorativeHeader' v-if="hasDecorativeHeader">
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
    icon: String,
    short: Boolean
  },
  computed: {
    height () {
      return this.short ? 'short' : 'defaultHeight'
    },
    hasDecorativeHeader () {
      return !!this.$slots['decorativeHeader']
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  $header-height: 450px;
  $header-height-short: 325px;

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

      @include media($min-desktop) {
        display: block;
      }
    }

    &-media {
      width: $media-width;
      position: relative;
      top: -$media-width/4;
      left: -$media-width/4;
      opacity: $light-opacity;

      @include light-svg;
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

      & > .PageHeader-titleHeader:first-child {
        @include media($min-tablet) {
          margin-top: 200px;
        }
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
      margin-top: -$large-spacing;

      * {
        font-family: $base-font-family;
        font-weight: $base-font-weight;
        font-size: $large-font-size;
        margin: 0 0 $base-spacing;

        @include media($min-tablet) {
          font-size: $larger-font-size;
        }
      }
    }

    &--short {
      padding-top: 1em;
      
      @include media($min-tablet) {
        height: $header-height-short;
      }

      .PageHeader-decorativeHeader {
        display: none;
        white-space: nowrap;

        @include media($min-tablet) {
          display: block;
        }

        * {
          font-size: $giant-font-size;

          @include media($min-tablet) {
            font-size: 250px;
          }
        }
      }

      .PageHeader-titleHeader {   
        margin-top: 0;

        @include media($min-tablet) {
          margin-top: $large-spacing * -2;

          * {
            margin: 0;
          }
        }
      }
    }
  }

  .TalkPage .PageHeader-titleHeader {
    margin-top: 20px;
  }
</style>
