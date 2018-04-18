<template>
  <header class='MainNav'>
    <div :class="'FlexContainer FlexContainer--alignCenter FlexContainer--' + classModifier">
      <smart-link class="MainNav-link" to="/"><span class='MainNav-logo'>Mercedes Bernard</span></smart-link>
      <!-- <navigation-links></navigation-links> -->
      <div class='MainNav-hamburger'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    classModifier: String
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

    &-link {
      display: flex;
      align-items: center;
    }

    &-logo {
      max-height: 70px;
      padding: $small-spacing $base-spacing;
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