<template>
  <div v-html="html">
  </div>
</template>

<script>
import markdownIt from 'markdown-it'
const md = require('markdown-it')()

export default {
  props: {
    source: String,
    required: true
  },
  computed: {
    html: function() {
      if (this.source) {
        const html = md.render(this.source)
        return html
      }
      return ''
    }
  }
}
</script>