<template>
  <div :class="'ContentColumn ContentColumn--' + color">
    <router-link :to="link" :target="isExternal ? '_blank' : '_self'">
      <h2 class='ContentColumn-title'>{{ title }}</h2>
    <img class='ContentColumn-icon' :src="iconUrl" />

    <div class='ContentColumn-description'>
      <p>{{ preamble }}</p>
    </div>
    </router-link>
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
  $transition-time: .5s;
  $fixed-width: 340px;

  .ContentColumn {
    flex: 1 1 25%;
    text-align: center;
    padding-bottom: $large-spacing;
    -webkit-transition: flex-basis $transition-time;
    transition: flex-basis $transition-time;
    display: flex;
    flex-direction: column;
    align-items: center;

  /* TODO: media query */;
    a {
      width: $fixed-width;
      font-weight: $base-font-weight;
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
    }

    &:hover {
      flex: 1 1 30%;

      /*.ContentColumn-icon {
        border-radius: 50%;
        box-shadow:
          inset 0 0 50px 50px rgba($white, .08),
          0 0 50px 50px rgba($white, .08)
      }*/
    }

    @include background-color;
    @include hover-darken;
  }
</style>