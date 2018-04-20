<template>
  <nav class='MainNav'>
    <div :class="'FlexContainer FlexContainer--alignCenter FlexContainer--' + classModifier">
      <smart-link class="MainNav-home" to="/"><span class='MainNav-logo'>Mercedes Bernard</span></smart-link>
      <div>
        <div class='MainNav-hamburger' v-on:click="expanded = !expanded">
          <img src='../assets/menu.svg' alt='hamburger menu'/>
        </div>
        <div>
          <ul :class="'MainNav-navLinks MainNav-navLinks--' + navStateClass" v-if="navLinks.length">
            <li class="MainNav-navLink" v-for="navLink in navLinks">
              <smart-link
                :to="`${navLink.externalLink || navLink.urlSegment}`"
                :isExternal="!!navLink.externalLink"
                >
                {{navLink.title}}
              </smart-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    classModifier: String
  },
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    navLinks() {
      return this.$store.state.navLinks
    },
    navStateClass() {
      return this.expanded ? 'expanded' : 'collapsed'
    }
  },
  created () {
    this.$store.dispatch('getNavLinks')
  }
}
</script>

<style lang="scss" scoped>
  $nav-height: 75px;
  $hamburger-width: 300px;

  .MainNav {
    background-color: $white;
    color: $black;
    box-shadow: $base-drop-shadow;
    z-index: 3;

    &-home {
      display: flex;
      align-items: center;
      padding: $small-spacing $base-spacing;
    }

    &-logo {
      max-height: 70px;
      font-family: $candela;
      font-size: $larger-font-size;
      font-weight: $heavy-font-weight;
    }

    &-hamburger {
      margin-right: $base-spacing;
      justify-self: flex-end;
      img {
        width: $nav-height - $base-spacing;
      }
    }

    &-navLinks {
      position: absolute;
      background-color: $white;
      width: $hamburger-width;
      right: 0;
      display: flex;
      flex-direction: column;
      box-shadow: 0px 10px 10px $black, -10px 8px 10px $black, 0px 10px 10px $black;

      &--collapsed {
        display:none;
      }
    }

    &-navLink {
      padding: $small-spacing $base-spacing;
      text-align: right;
    }

    .FlexContainer--justifyCenter {
      .MainNav-hamburger, .MainNav-navLinks {
        display:none;
      }
    }

    .FlexContainer--spaceBetween {
      .MainNav-link {
        padding-right: $base-spacing;
      }
    }
  }
</style>