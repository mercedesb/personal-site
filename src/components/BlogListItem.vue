<template>
  <smart-link :class="classes" :to="routerToObject" :aria-hidden="loading">
    <div class='BlogItem-container'>
      <div class='BlogItem-date'>
        <span class='BlogItem-publishMonth'>{{ publishMonth }}</span>
        <span class='BlogItem-publishDay'>{{ publishDay }}</span>
        <span class='BlogItem-publishYear'>{{ publishYear }}</span>
      </div>
      <div class='BlogItem-text'>
      <h3 class='BlogItem-title h5' :aria-hidden="loading">{{ title }}</h3>
      <p class='BlogItem-preamble' :aria-hidden="loading">{{ preamble }}</p>
      <p class='BlogItem-viewMore'>
        <span v-if="!loading">View more | </span>
        <ReadingTime v-if="!loading" :text="mainContent"/>
      </p>
   </div>
    </div>
  </smart-link>
</template>

<script>
import ReadingTime from './ReadingTime.vue'
const moment = require('moment')

export default {
  components: {
    ReadingTime
  },
  props: {
    loading: Boolean,
    color: {
      type: String,
      default: "loading-gray"
    },
    featured: Boolean,
    title: String,
    preamble: String,
    mainContent: {
      type: String,
      // required: true,
      default: ''
    },
    date: Date,
    urlSegment: {
      type: String
    }
  },
  computed: {
    momentDate () {
      return moment(this.date)
    },
    publishMonth () {
      return this.loading ? '' : this.momentDate.format('MMM')
    },
    publishDay () {
      return this.loading ? '' : this.momentDate.format('DD')
    },
    publishYear () {
      return this.loading ? '' : this.momentDate.format('YYYY')
    },
    routerToObject () {
      if (this.urlSegment) {
        return { name: 'blogPost', params: { urlSegment: this.urlSegment, color: this.color } }
      } else {
        return null
      }
    },
    classes () {
      let classStr = 'BlogItem'
      if (this.featured) {
        classStr += ' BlogItem--featured'
      } else {
        classStr += ` BlogItem--${this.color}`
      }

      if (this.loading) {
        classStr += ' BlogItem--loading'
      }

      return classStr
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  $publish-font-size: 1.35rem;
  $loading-height: 165px;

  .BlogItem {
    a {
      text-decoration: none
    }

    &-container {
      display:flex;
      flex-wrap: wrap;
      margin: $base-spacing 0;
      border-radius: $base-radius;
    }

    &:first-child {
      .BlogItem-container {
        margin-top: 0;
      }
    }

    &:last-child {
      .BlogItem-container {
        margin-bottom: 0;
      }
    }

    &-date {
      font-weight: $light-font-weight;
      flex: 1 1 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $base-font-size;
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
      font-size: $giant-font-size;
    }

    &-publishMonth, &-publishYear {
      font-size: $publish-font-size;
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
      margin: 0 $base-spacing $base-spacing;
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

    &--loading {
      .BlogItem-container {
        height: $loading-height;
      }

      .BlogItem-title, .BlogItem-preamble, .BlogItem-viewMore {
        background-color: $loading-gray;
        padding: .75rem;
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
      }
    }
  }
</style>
