<template>
  <div :class="'CTA CTA--' + color">
    <a :href="url" :target="external ? '_blank' : '_self'">
      <div class='CTA-icon'>
        <img :src="icon" />
      </div>
      <h4 class='CTA-title'>{{ title }}</h4>
    </a>
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

<style lang="scss" scoped>
  .CTA {
    flex: 1 1 50%;

    a {
      display:flex;
      align-items: center;
      margin: $base-spacing;
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
          background-color: #{darken(saturate(nth($type, 2), 10%), 12%)};
        }

        a {
          border: 1px solid #{darken(saturate(nth($type, 2), 10%), 12%)};
        }
      }
    }
  }
</style>