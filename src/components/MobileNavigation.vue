<template>
  <div class='MobileNav'>
    <div class='MobileNav-hamburger' v-on:click="expanded = !expanded">
      <img src='../assets/menu.svg' alt='hamburger menu'/>
    </div>
    <div :class="navLinksContainerClasses">
      <ul class='MobileNav-navLinks' v-if="navLinks.length && expanded">
        <li class="MobileNav-navLink">
          <smart-link to="/">
            Home
          </smart-link>
        </li>
        <li class="MobileNav-navLink" v-for="navLink in navLinks" :key="navLink.title">
          <smart-link
            :to="navLink.parsedLink"
            :isExternal="!!navLink.externalLink"
            >
            {{navLink.title}}
          </smart-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navLinks: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      default: 'gray'
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  computed: {
    navLinksContainerClasses() {
      let classes = `MobileNav-navLinksContainer MobileNav-navLinksContainer--${this.color}`
      if (this.expanded) {
        classes += ' MobileNav-navLinksContainer--expanded'
      } else {
        classes += ' MobileNav-navLinksContainer--collapsed'
      }
      return classes
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route' (_to, _from) {
      this.expanded = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.MobileNav {
  display: flex;
  flex-direction: column;
  width: 100%;

  img {
    height: 50px;
    &:hover {
      cursor: pointer;
    }
  }

  @include media($min-desktop) {
    display: none;
  }

  &-hamburger {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    z-index: 11;
  }

  &-navLinksContainer {
    @include background-color;

    display: flex;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: opacity .5s ease-in-out, visibility .5s ease-in-out;

    &--collapsed {
      opacity: 0;
      visibility: hidden;
    }

    &--expanded {
      visibility: visible;
      opacity: 1;
    }
  }

  &-navLinks {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;

    @include media($min-tablet) {
      flex-direction: column;
    }
  }

  &-navLink {
    padding: $small-spacing 0;
    a {
      color: $white;
      font-size: $large-font-size;

      &:hover {
        text-decoration: underline;
      }

      &.router-link-exact-active {
        text-decoration: underline;
      }
    }
  }
}
</style>
