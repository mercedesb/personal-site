<template>
  <div :class="classes">
    <router-link :to="{ name: 'blogPost', params: { urlSegment: urlSegment, color: color } }">
    <div class='BlogItem-date'>
      <span>{{ publishMonth }}</span>
      <span class='BlogItem-publishDay'>{{ publishDay }}</span>
      <span>{{ publishYear }}</span>
    </div>
    <h4 class='BlogItem-title'>{{ title }}</h4>
  </router-link>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    color: String,
    featured: Boolean,
    title: String,
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
    flex: 1 1 auto;
    a {
      display:flex;
      align-items: center;
      margin: $base-spacing $large-spacing;
    }

    &-date {
      margin-right: $small-spacing;
      padding: $small-spacing;
      min-width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $small-font-size;
    }

    &-publishDay {
      font-size: $large-font-size;
    }

    &-title {

    }

    @each $type in $colors-array {
      &--#{nth($type, 1)} {
        a {
          border: 1px solid #{nth($type, 2)};
        }

        .BlogItem-date {
          background-color: #{nth($type, 2)};
          color: #{nth($type, 3)};
        }
      }
    }

    &--featured {
      a {
          border: 1px solid $yellow;
        }

      .BlogItem-date {
        background-color: $yellow;
        color: $white;
      }
    }
  }
</style>