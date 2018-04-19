<template>
  <nav class='MainNav'>
    <div :class="'FlexContainer FlexContainer--alignCenter FlexContainer--' + classModifier">
      <smart-link class="MainNav-home" to="/"><span class='MainNav-logo'>Mercedes Bernard</span></smart-link>
      <div>
        <div class='MainNav-hamburger' v-on:click="expanded = !expanded">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div :class="'MainNav-navLinks MainNav-navLinks--' + navStateClass">
          <ul v-if="navLinks.length">
            <li v-for="navLink in navLinks">
              <smart-link
                :to="'/' + navLink.urlSegment || navLink.externalLink"
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
      div {
        width: $nav-height - $base-spacing;
        border-top: 2px solid $black;
        margin-top: $small-spacing;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    &-navLinks {

      &--collapsed {
        display:none;
      }
    }

    .FlexContainer--justifyCenter {
      .MainNav-hamburger {
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