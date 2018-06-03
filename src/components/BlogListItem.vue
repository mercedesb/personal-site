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
      <p class='BlogItem-viewMore'>View more</p>
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
    momentDate () {
      return moment(this.date)
    },
    publishMonth () {
      return this.momentDate.format('MMM')
    },
    publishDay () {
      return this.momentDate.format('DD')
    },
    publishYear () {
      return this.momentDate.format('YYYY')
    },
    classes () {
      let classStr = 'BlogItem'
      if (this.featured) {
        classStr += ' BlogItem--featured'
      } else {
        classStr += ` BlogItem--${this.color}`
      }
      return classStr
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';
  .BlogItem {

    &-container {
      display:flex;
      flex-wrap: wrap;
      margin: $base-spacing $large-spacing;
      border-radius: $base-radius;
    }

    &-date {
      flex: 1 1 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $small-font-size;
      padding: $base-spacing 0;

      span {
        margin: 0 $small-spacing;
      }

      @include media($min-tablet) {
        flex: 1 5;
        padding: 0;
        flex-direction: column;
      }
    }

    &-publishDay {
      font-size: $large-font-size;
    }

    &-text {
      flex: 1 1 100%;
      display: flex;
      flex-direction: column;
      align-self: flex-start;

      @include media($min-tablet) {
        flex: 5 1;
        align-self: center;
      }
    }

    &-title {
      margin: $base-spacing;
    }

    &-preamble {
      display: none;
      margin: 0 $base-spacing $base-spacing;
      font-weight: $base-font-weight;

      @include media($min-tablet) {
        display: block;
      }
    }

    &-viewMore {
      font-size: $small-font-size;
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
        }

        &-date {
          background-color: $yellow;
          color: $white;
        }

        &-preamble {
          font-size: $base-font-size;
        }
      }
    }
  }
</style>
