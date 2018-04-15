<template>
  <div :class="'BlogItem BlogItem--' + color">
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
    title: String,
    date: Date,
    urlSegment: {
      type: String,
      required: true
    }
  },
  computed: {
    momentDate: function() {
      return moment(this.date)
    },
    publishMonth: function() {
      return this.momentDate.format('MMM')
    },
    publishDay: function() {
      return this.momentDate.format('DD')
    },
    publishYear: function() {
      return this.momentDate.format('YYYY')
    }
  }
}
</script>

<style lang="scss">
</style>