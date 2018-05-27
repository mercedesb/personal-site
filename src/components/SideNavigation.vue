<template>
  <div class='SideNav'>
    <ul class='SideNav-navLinks' v-if="navLinks.length">
      <li class="SideNav-navLink">
        <smart-link to="/">
          Home
        </smart-link>
      </li>
      <li class="SideNav-navLink" v-for="navLink in navLinks" :key="navLink.title">
        <smart-link
          :to="navLink.parsedLink"
          :isExternal="!!navLink.externalLink"
          >
          {{navLink.title}}
        </smart-link>
      </li>
    </ul>
    <div class="SideNav-background" v-if="backgroundImages && backgroundImages.length">
      <img
        v-for="image in backgroundImages"
        :key="image.id"
        :src="image"
        class="SideNav-backgroundImage"
      />
    </div>
  </div>
</template>

<script>
import images from '../mixins/images'

export default {
  mixins: [
    images
  ],
  props: {
    navLinks: {
      type: Object,
      required: true
    },
    backgroundImages: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.SideNav {
  display: none;

  flex: 1;
  flex-direction: row-reverse;
  position: relative;
  width: 100%;
  height: auto;
  width: 300px;
  flex-direction: column;

  @include media($min-desktop) {
    display: flex;
  }

  &-navLinks {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  &-navLink {
    padding: $small-spacing 0;
    a {
      color: $white;
      font-size: $larger-font-size;
    }
  }

  &-background {
    display: none;
    flex: 1;
    align-items: center;
    flex-direction: column;

    @include media($min-tablet) {
      display: flex;
      justify-content: space-around;
    }
  }

  &-backgroundImage {
    max-width: 270px;
    min-width: 91px;
  }
}
</style>
