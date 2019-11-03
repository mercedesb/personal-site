<template>
  <aside :class="`BlogCategories BlogCategories--${color}`" v-if="categories.length" >
    <h3 class="BlogCategories-title">Categories</h3>
    <ul class="CategoryList">
      <li :class="`Category ${!activeCategory ? 'Category--active' : ''}`"><a href="/blog">All posts</a>
      <li 
        v-for="category in categories" v-bind="category" 
        :key="category.name"
        :class="`Category ${category.name === activeCategory ? 'Category--active' : ''}`"
      >
        <a :href="`/blog?filter=${encodeURIComponent(category.name)}`">{{category.name}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    categories: Array,
    activeCategory: String,
    color: {
      type: String,
      default: 'purple'
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';
  .BlogCategories {
    display: none;
    border: 1px solid;

    @include media($min-tablet) {
      display: block;
    }

    &-title {
      text-align: center;
      margin: 0;
      margin-bottom: $small-spacing;
      padding: $base-spacing;
      font-family: $base-font-family;
    }
  }

  /* .BlogCategories--color */
  @each $type in $colors-array {
    .BlogCategories--#{nth($type, 1)} {
      border-color: nth($type, 2);

      .BlogCategories-title {
        color: $white;
        background-color: nth($type, 2);
      }
    }
  }

  .CategoryList {
    margin: 0 $base-spacing;
  }

  .Category {
    display: block !important;
    list-style: none;

    a {
      font-weight: $base-font-weight;
    }

    &--active {
      a {
        font-weight: $heavy-font-weight;
      }
    }
  }
</style>