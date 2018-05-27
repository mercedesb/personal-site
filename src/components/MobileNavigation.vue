<template>
  <div class='MobileNav' v-on:click="expanded = !expanded">
    <div class='MobileNav-hamburger'>
      <img src='../assets/menu.svg' alt='hamburger menu'/>
    </div>
    <transition name='grow'>
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
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    navLinks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  watch: {
    '$route' (to, from) {
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
  position: relative;
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
  }

  &-navLinks {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
  }

  &-navLink {
    padding: $small-spacing 0;
    a {
      color: $white;
      font-size: $large-font-size;
    }
  }
}
</style>
