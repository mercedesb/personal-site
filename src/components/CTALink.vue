<template>
  <div :class="'CTA CTA--' + color">
    <smart-link class='CTA-link' :to="url" :isExternal="external">
      <div class='CTA-icon'>
        <img :src="icon" />
      </div>
      <h4 class='CTA-title'>{{ title }}</h4>
    </smart-link>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    icon: String,
    url: String,
    color: {
      type: String,
      default: 'brown'
    },
    external: Boolean
  }
}
</script>

<style lang="scss">
  .CTA {
    flex: 1 1 50%;

    &-link a {
      display:flex;
      align-items: center;
      margin: $base-spacing;
      font-weight: $base-font-weight;
      border-radius: $base-radius
    }

    &-icon {
      background-color: $blue;
      margin-right: $small-spacing;
      padding: $small-spacing;
      max-width: 120px;

      img {
        width: 100px;
      }
    }

    @each $type in $colors-array {
      &--#{nth($type, 1)} {

        .CTA-icon {
          background-color: #{nth($type, 2)};
        }

        a {
          border: 1px solid #{nth($type, 2)};
        }
      }
    }
  }
</style>