<template>
  <aside :class="`BlogCategories BlogCategories--${color}`" v-if="categories.length" >
    <h3 class="BlogCategories-title">Categories</h3>
    <ul class="CategoryList">
      <li class="Category" v-for="category in categories" v-bind="category" :key="category.name">
        <input type="checkbox" :id="category.name" :value="category.name" v-model="checkedCategoryNames" @change="checkboxChange" />
        <label :for="category.name"><span class="Checkbox"></span>{{category.name}}</label>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    categories: Array,
    checkedCategories: Array,
    color: {
      type: String,
      default: 'purple'
    }
  },
  data() {
    return {
      checkedCategoryNames: this.checkedCategories
    }
  },
  methods: {
    checkboxChange() {
      this.$emit('categoryChange', this.checkedCategoryNames);
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';
  .BlogCategories {
    border: 1px solid;

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
    margin-left: 0 !important;
  }

  .Category {
    display: block !important;
    list-style: none;
    margin-left: 0;
  }
</style>