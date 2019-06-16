<template>
  <nav class="Navigation">
    <ul class='Navigation-navLinks' v-if="navLinks.length">
      <li class="Navigation-navLink">
        <smart-link to="/">
          <div class='Navigation-title'><span>Home</span></div>
          <div class="Navigation-icon" v-html="homeLink.iconSvg"></div>
        </smart-link>
      </li>
      <li class="Navigation-navLink" v-for="navLink in navLinks" :key="navLink.title">
        <smart-link
          :to="navLink.parsedLink"
          :isExternal="!!navLink.externalLink"
          >
          <div class='Navigation-title'><span>{{navLink.title}}</span></div>
          <div class="Navigation-icon" v-html="navLink.iconSvg"></div>
        </smart-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import images from '../mixins/images'

export default {
  mixins: [
    images
  ],
  computed: {
    navLinks () {
      return this.$store.state.navLinks.slice(1).map((link) => {
        return {
          parsedLink: link.externalLink ? link.externalLink : `/${link.urlSegment}`,
          ...link,
          iconSvg: link.iconSvg.fields.svg
        }
      })
    },
    homeLink () {
      const link = this.$store.state.navLinks[0]
      return {
        parsedLink: '/',
        ...link,
        iconSvg: link.icon.fields.svg
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

$transition-time: .3s;

$icon-initial-width: 60px;
$icon-hover-width: 75px;

.Navigation {
  display: flex;

  &-navLinks {
    margin-bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    z-index: 1;
  }

  &-navLink {
    margin: 0 0 $small-spacing;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;

      @include media($min-tablet) {
        margin: 0 $small-spacing 0;
        padding-bottom: $small-spacing / 2;

        &:hover {
          cursor: pointer;

          .Navigation {
            &-title {
              display: block;
            }

            &-icon {
              width: $icon-hover-width;
              -webkit-transition: width $transition-time;
              transition: width $transition-time;
            }
          }
        }

        &.router-link-exact-active {
          border-bottom: 1px solid $white;
        }
      }
    }
  }

  &-title {
    display: none;
    padding-bottom: $small-spacing;
    color: $white;
  }

  &-icon {
    margin: 0 $small-spacing;
    width: $icon-initial-width;
    -webkit-transition: width $transition-time;
    transition: width $transition-time;

    @include light-svg;
  }
}
</style>
