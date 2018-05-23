<template>
  <nav class="SideNav">
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
  </nav>
</template>

<script>
export default {
  computed: {
    navLinks () {
      return this.$store.state.navLinks.map((link) => {
        return {
          parsedLink: link.externalLink ? link.externalLink : `/${link.urlSegment}`,
          ...link
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getNavLinks')
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.SideNav {
  width: 300px;
  background-color: $brown;
  display: flex;
  flex-flow: column;

  &-navLinks {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-navLink {
    padding: $small-spacing 0;
    a {
      color: $white;
      font-size: $larger-font-size;
    }
  }
}
</style>