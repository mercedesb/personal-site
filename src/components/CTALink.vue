<template>
  <div :class="`CTA CTA--${color} CTA--${modifierClass}`">
    <smart-link class='CTA-link' :to="url" :isExternal="external">
      <div class='CTA-icon' v-html="iconSvg"></div>
      <p class='CTA-title'>{{ title }}</p>
    </smart-link>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    iconSvg: String,
    url: String,
    color: {
      type: String,
      default: 'brown'
    },
    external: Boolean
  },
  computed: {
    modifierClass () {
      return this.external ? 'external' : 'default'
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  $icon-width: 75px;

  .CTA {
    flex: 1 1 50%;

    @include media($min-tablet) {
      min-width: 450px;
    }

    &-link a {
      display:flex;
      align-items: center;
      margin: $base-spacing;
      border-radius: $base-radius;
      text-decoration: none;
    }

    &-title {
      font-weight: $base-font-weight;
      margin: 0;
    }

    &-icon {

      margin-right: $small-spacing;
      padding: $small-spacing;
      max-width: 120px;
      width: $icon-width;

      @include light-svg;
    }

    &--default {
      .CTA-icon {
        background-color: $gray;
      }

      @each $type in $colors-array {
        &.CTA--#{nth($type, 1)} {
          .CTA-icon {
            background-color: #{nth($type, 2)};
          }
        }
      }
    }
  }

  /* .CTA--color .CTA-link a */
  @each $type in $colors-array {
    .CTA--#{nth($type, 1)} {
      .CTA-link a {
        border: 1px solid #{nth($type, 2)};
      }
    }
  }

</style>
