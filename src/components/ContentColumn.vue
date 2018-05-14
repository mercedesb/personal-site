<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <smart-link class='ContentColumn-link' :to="link" :isExternal="isExternal">
      <h2 class='ContentColumn-title'>{{ title }}</h2>
      <img class='ContentColumn-icon' :src="iconUrl" />
      <div class='ContentColumn-description'>
        <p>{{ preamble }}</p>
      </div>
    </smart-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'brown'
    },
    preamble: String,
    icon: Object,
    externalLink: String,
    urlSegment: String
  },
  computed: {
    iconUrl: function() {
      // return ''
      return this.getImageUrl(this.icon)
    },
    isExternal: function() {
      return !!this.externalLink
    },
    link: function() {
      if (this.isExternal) {
        return this.externalLink
      }
      else {
        return this.urlSegment
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
      padding-top: $base-spacing;
      color: $white;
      width: $icon-width;
      z-index: 1;
    }

    &-description {
      color: $white;
      margin: 0 $base-spacing;
      font-weight: $base-font-weight;
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
    @include hover-darken;
  }
</style>