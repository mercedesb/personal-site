<template>
   <main class='TalkPage'>
    <PageHeader
      :color="color"
      :short="true"
    >
      <template slot='decorativeHeader'>
        <h1>{{ title }}</h1>
      </template>
      <template slot='titleHeader'>
        <h2>{{page.title}}</h2>
      </template>
    </PageHeader>
    <div v-if="page.mainContent">
      <div class="PageContent">
        <ParseMarkdown :source="page.mainContent" />
        <br/>
      </div>
    </div>
  </main>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import objects from '../../mixins/objects'
import images from '../../mixins/images'

// const moment = require('moment')

export default {
  components: {
    PageHeader, ParseMarkdown
  },
  mixins: [
    objects, images
  ],
  metaInfo () {
    return {
      title: this.page.title,
      titleTemplate: '%s | Mercedes Bernard',
      meta: [
        { name: 'description', vmid: 'description', content: this.page.preamble },
        { name: 'og:title', vmid: 'og:title', content: this.page.title },
        // Twitter Card data
        { name: 'twitter:card', vmid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', vmid: 'twitter:site', content: '@mercedescodes' },
        { name: 'twitter:title', vmid: 'twitter:title', content: this.page.title },
        { name: 'twitter:description', vmid: 'twitter:description', content: this.page.preamble },
        { name: 'twitter:creator', vmid: 'twitter:creator', content: '@mercedescodes' },
        { name: 'twitter:image', content: this.socialImage ? `${window.location.protocol}${this.socialImage}?w=800&fit=fill` : '' },
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.page.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        { property: 'og:image', content: this.socialImage ? `${window.location.protocol}${this.socialImage}?w=800&fit=fill` : '' },
        { property: 'og:description', vmid: 'og:description', content: this.page.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'purple'
    }
  },
  computed: {
    page () {
      return this.$store.state.talk
    }
  },
  created () {
    this.$store.dispatch('getTalk', this.$route.params.urlSegment)
      .then((page) => {
        if (this.isEmpty(page)) {
          this.$router.push({name: 'pageNotFound'})
        }

        this.$store.dispatch('getNavLinks')
          .then((navLinks) => {
            document.dispatchEvent(new Event('custom-render-trigger'))
          })
      })
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables.scss';

.TalkPage {
  @include inner-page-content;

  @include media($max-tablet) {
    display: block;
  }
}

</style>
