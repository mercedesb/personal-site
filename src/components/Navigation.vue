<template>
  <nav class="Navigation">
    <ul class='Navigation-navLinks'>
      <li class="Navigation-navLink">
        <smart-link to="/">
          <div class='Navigation-title'><span>Home</span></div>
          <img class='Navigation-icon' src='../assets/images/HomeIcon.svg' />
        </smart-link>
      </li>
      <li class="Navigation-navLink">
        <smart-link to="/about">
          <div class='Navigation-title'><span>About</span></div>
          <img class='Navigation-icon' src='../assets/images/AboutIcon.svg' />
        </smart-link>
      </li>
      <li class="Navigation-navLink">
        <smart-link to="/blog">
          <div class='Navigation-title'><span>Blog</span></div>
          <img class='Navigation-icon' src='../assets/images/BlogIcon.svg' />
        </smart-link>
      </li>
      <li class="Navigation-navLink">
        <smart-link to="/connect">
          <div class='Navigation-title'><span>Connect</span></div>
          <img class='Navigation-icon' src='../assets/images/ConnectIcon.svg' />
        </smart-link>
      </li>
      <li class="Navigation-navLink">
        <smart-link to="/shop">
          <div class='Navigation-title'><span>Shop</span></div>
          <img class='Navigation-icon' src='../assets/images/ShopIcon.svg' />
        </smart-link>
      </li>
    </ul>
    <!-- <SideNavigation
      :navLinks="navLinks"
      :backgroundImages="backgroundImages"
    />
    <MobileNavigation
      :navLinks="navLinks"
    /> -->
  </nav>
</template>

<script>
import SideNavigation from './SideNavigation.vue'
import MobileNavigation from './MobileNavigation.vue'
import images from '../mixins/images'

export default {
  components: {
    SideNavigation, MobileNavigation
  },
  mixins: [
    images
  ],
  computed: {
    navLinks () {
      return this.$store.state.navLinks.map((link) => {
        return {
          parsedLink: link.externalLink ? link.externalLink : `/${link.urlSegment}`,
          ...link
        }
      })
    },
    backgroundImages () {
      const bgdImgs = this.$store.state.backgroundImages
      if (!bgdImgs || !bgdImgs.length) return []
      return this.$store.state.backgroundImages.map((bgdImage) => {
        return this.getImageUrl(bgdImage)
      })
    }
  },
  created () {
    this.$store.dispatch('getNavLinks')
    this.$store.dispatch('getBackgroundImages')
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

$transition-time: .3s;

$icon-initial-width: 50px;
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
        padding: 0 $small-spacing 0;
        
        &:hover {
          cursor: pointer;

          .Navigation {
            &-title {
              display: block;
            }

            &-icon {
              max-width: $icon-hover-width;
              -webkit-transition: max-width $transition-time;
              transition: max-width $transition-time;
            }
          }
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
    max-width: $icon-initial-width;
    -webkit-transition: max-width $transition-time;
    transition: max-width $transition-time;
  }
}
</style>
