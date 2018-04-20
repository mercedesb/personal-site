<template>
  <smart-link :class="classes" :to="{ name: 'blogPost', params: { urlSegment: urlSegment, color: color } }">
    <div class='BlogItem-container'>
      <div class='BlogItem-date'>
        <span>{{ publishMonth }}</span>
        <span class='BlogItem-publishDay'>{{ publishDay }}</span>
        <span>{{ publishYear }}</span>
      </div>
      <h5 class='BlogItem-title'>{{ title }}</h5>
     <!--  <p class='BlogItem-preamble'>{{ preamble }}</p> -->
    </div>
  </smart-link>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    color: String,
    featured: Boolean,
    title: String,
    preamble: String,
    date: Date,
    urlSegment: {
      type: String,
      required: true
    }
  },
  computed: {
    momentDate() {
      return moment(this.date)
    },
    publishMonth() {
      return this.momentDate.format('MMM')
    },
    publishDay() {
      return this.momentDate.format('DD')
    },
    publishYear() {
      return this.momentDate.format('YYYY')
    },
    classes() {
      let classStr = 'BlogItem'
      if (this.featured) {
        classStr += ' BlogItem--featured'
      }
      else {
        classStr += ` BlogItem--${this.color}`
      }
      return classStr
    }
  }
}
</script>

<style lang="scss" scoped>
  .BlogItem {

    &-container {
      display:flex;
      align-items: center;
      margin: $base-spacing $large-spacing;
    }

    &-date {
      margin-right: $base-spacing;
      padding: $small-spacing;
      min-width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $small-font-size;
      height: 100%
    }

    &-publishDay {
      font-size: $large-font-size;
    }

    &-title, &-preamble {
      margin: 0 $base-spacing;
    }

    @each $type in $colors-array {
      &--#{nth($type, 1)} {

        .BlogItem-container {
          border: 1px solid #{nth($type, 2)};
        }

        .BlogItem-date {
          background-color: #{nth($type, 2)};
          color: #{nth($type, 3)};
        }
      }
    }

    &--featured {
      .BlogItem-container {
        border: 1px solid $yellow;
      }

      .BlogItem-date {
        height: 150px;
        background-color: $yellow;
        color: $white;
      }

      .BlogItem-title {
        font-size: $large-font-size;
        font-weight: $base-font-weight;
      }
    }
  }
</style>