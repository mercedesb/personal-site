<template>
  <nav class="MainNav">
    <div :class="'FlexContainer FlexContainer--alignCenter FlexContainer--' + classModifier">
      <smart-link class="MainNav-home" to="/">
        <div class="MainNav-logo">
          <img src="../assets/SiteLogo.svg" />
        </div>
      </smart-link>
      <div>
        <div class="MainNav-hamburger" v-on:click="expanded = !expanded">
          <img src="../assets/menu.svg" alt="hamburger menu" />
        </div>
        <transition name="grow">
          <ul class="MainNav-navLinks" v-if="navLinks.length && expanded">
            <li class="MainNav-navLink" v-for="navLink in navLinks" :key="navLink.title">
              <smart-link
                :to="navLink.parsedLink"
                :isExternal="!!navLink.externalLink"
              >{{navLink.title}}</smart-link>
            </li>
          </ul>
        </transition>
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
    };
  },
  computed: {
    navLinks() {
      return this.$store.state.navLinks.map(link => {
        return {
          parsedLink: link.externalLink
            ? link.externalLink
            : `/${link.urlSegment}`,
          ...link
        };
      });
    }
  },
  created() {
    this.$store.dispatch("getNavLinks");
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(_to, _from) {
      this.expanded = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

$logo-height: 70px;
$logo-vertical-padding: $small-spacing/2;
$nav-height: $logo-height + $logo-vertical-padding * 2;
$hamburger-width: 300px;

.MainNav {
  background-color: $white;
  color: $black;
  box-shadow: $base-drop-shadow;
  z-index: 3;

  &-home {
    display: flex;
    align-items: center;
    padding: $small-spacing/2 $base-spacing;
  }

  &-logo {
    max-height: 70px;
    font-size: $larger-font-size;
    font-weight: $heavy-font-weight;
    img {
      max-height: 70px;
    }
  }

  &-hamburger {
    margin-right: $base-spacing;
    justify-self: flex-end;
    img {
      width: $nav-height - $base-spacing;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &-navLinks {
    position: absolute;
    background-color: $white;
    width: $hamburger-width;
    top: $nav-height;
    right: 0;
    display: flex;
    flex-direction: column;
    box-shadow: -2px 4px 5px -2px $black;
    overflow: hidden;
    border-radius: $base-radius;
  }

  &-navLink {
    padding: $small-spacing $base-spacing;
    text-align: right;
  }

  .FlexContainer--justifyCenter {
    .MainNav-hamburger,
    .MainNav-navLinks {
      display: none;
    }
  }

  .FlexContainer--spaceBetween {
    .MainNav-link {
      padding-right: $base-spacing;
    }
  }
}
</style>
