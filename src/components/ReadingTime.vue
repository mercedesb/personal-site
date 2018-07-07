<template>
  <span>{{minutes}} min read</span>
</template>

<script>
export default {
  props: {
    wordsPerMinute: {
      type: Number,
      default: 250
    },
    text: String
  },
  computed: {
    words () {
      const matches = this.text.match(/[^\s]+/g)
      return matches ? matches.length : 0
    },
    minutes () {
      const minutes = this.words / this.wordsPerMinute
      return Math.ceil(minutes.toFixed(2))
    }
  }
}
</script>

<style lang="scss">
</style>
