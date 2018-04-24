<template>
  <div v-html="html">
  </div>
</template>

<script>
import markdownIt from 'markdown-it'
const md = require('markdown-it')()
  .use(require('markdown-it-attrs'))

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
  },
  mounted() {
    const collapsible = this.$el.querySelectorAll('.PageContent-header--collapsible')

    collapsible.forEach((c) => {
      c.addEventListener('click', this.handleCollapsible)
    })
  },
  methods: {
    handleCollapsible(event) {
      const selector = '.PageContent-header'
      let el = event.target

      this.collapse(el)

      let sibling = el.nextElementSibling;

      while (sibling) {
        if (sibling.matches(selector)) {
          break
        }
        this.collapse(sibling)
        sibling = sibling.nextElementSibling
      }
    },
    collapse(el) {
      const collapsed = 'PageContent--collapsed'

      if (el.className.indexOf(collapsed) != -1) {
        el.className = el.className.replace(collapsed, '')
      }
      else {
        el.className = `${el.className} ${collapsed}`
      }
    }
  }
}
</script>