<template>
  <smart-link :class="classes" :to="{ name: 'blogPost', params: { urlSegment: urlSegment, color: color } }">
    <div class='BlogItem-container'>
      <div class='BlogItem-date'>
        <span>{{ publishMonth }}</span>
        <span class='BlogItem-publishDay'>{{ publishDay }}</span>
        <span>{{ publishYear }}</span>
      </div>
      <div class='BlogItem-text'>
      <h5 class='BlogItem-title'>{{ title }}</h5>
      <p class='BlogItem-preamble'>{{ preamble }}</p>
   </div>
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
      min-height:130px;
      border-radius: $base-radius
    }

    &-date {
      margin-right: $base-spacing;
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

    &-title {
      font-weight: $base-font-weight;
      margin: $base-spacing;
    }

    &-preamble {
      margin: 0 $base-spacing $base-spacing;
      font-weight: $base-font-weight;
      font-size: $small-font-size;
    }

    &-text {
      display: flex;
      flex-direction: column;
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
      .BlogItem {
        &-container {
          border: 1px solid $yellow;
          height: 200px;
        }

        &-date {
          background-color: $yellow;
          color: $white;
        }

        &-title {
          font-size: $large-font-size;
          font-weight: 300;
          font-style: italic;
        }

        &-preamble {
          font-size: $base-font-size;
        }
      }
    }
  }
</style>