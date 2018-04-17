<template>
  <header class='MainNav'>
    <router-link to="/"><img class='MainNav-logo' src='../assets/SiteLogo.svg' /></router-link>
    <!-- <navigation-links></navigation-links> -->
    <div class='MainNav-hamburger'>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  $nav-height: 75px;

  .MainNav {
    background-color: $white;
    color: $black;
    height: $nav-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: $base-drop-shadow;
    position: relative;
    z-index: 3;

    a {
      display: flex;
      align-items: center;
      padding-right: $base-spacing;
    }

    &-logo {
      max-height: 70px;
      padding: 0 $base-spacing;
    }

    &-hamburger {
      margin-right: $base-spacing;
      div {
        width: $nav-height - $base-spacing;
        border-top: 2px solid $black;
        margin-top: $small-spacing;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
</style>