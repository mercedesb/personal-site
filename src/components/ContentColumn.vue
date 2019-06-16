<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <smart-link class='ContentColumn-link' :to="link" :isExternal="isExternal">
      <h2 class='ContentColumn-title'>{{ navTitle || title }}</h2>
      <div class="ContentColumn-icon" v-html="iconSvg"></div>
      <div class='ContentColumn-description'>
        <p>{{ preamble }}</p>
      </div>
    </smart-link>
  </div>
</template>

<script>
import images from '../mixins/images'

export default {
  mixins: [
    images
  ],
  props: {
    title: {
      type: String,
      required: true
    },
    navTitle: {
      type: String
    },
    color: {
      type: String,
      default: 'brown'
    },
    preamble: String,
    iconSvg: String,
    externalLink: String,
    urlSegment: String
  },
  computed: {
    isExternal: function () {
      return !!this.externalLink
    },
    link: function () {
      if (this.isExternal) {
        return this.externalLink
      } else {
        return this.urlSegment
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  $icon-width: 125px;
  $fixed-width: 340px;
  $transition-time: .5s;

  .ContentColumn {
    flex: 1 1 100%;
    text-align: center;
    padding-bottom: $large-spacing;
    -webkit-transition: flex-grow $transition-time;
    transition: flex-grow $transition-time;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-link {
      font-weight: 400;
      width: $fixed-width;
    }

    &-title {
      padding-top: $large-spacing;
      color: $white;
    }

    &-icon {
      padding: 0 0 $base-spacing;
      width: $icon-width;
      margin: 0 auto;

      @include light-svg;
    }

    &-description {
      color: $white;
      margin: 0 $base-spacing;
      font-weight: $base-font-weight;
      font-size: 24px;
    }

    @include media($min-tablet) {
      flex: 1 1 50%;
    }

    @include media($min-desktop) {
      flex: 1 1 $fixed-width;
      &:hover {
        flex-grow: 2;
      }
    }

    @include background-color;
    @include hover-saturate;
  }
</style>
