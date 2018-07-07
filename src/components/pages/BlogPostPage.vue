<template>
   <main class='BlogPost'>
    <PageHeader
      :color="color"
      :short="true"
    >
      <template slot='decorativeHeader'>
        <h2>{{ formattedPublishDate }}</h2>
      </template>
      <template slot='titleHeader'>
        <h1>{{page.title}}</h1>
      </template>
    </PageHeader>
    <div v-if="page.mainContent" class='BlogPost-content'>
      <div class="PageContent">
        <ParseMarkdown :source="page.mainContent" />
        <br/>
        <p class="BlogPost-publishDate">
          <em>Published {{formattedPublishDate}}</em>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import CTALink from '../CTALink.vue'
import objects from '../../mixins/objects'

const moment = require('moment')

export default {
  components: {
    PageHeader, ParseMarkdown, CTALink
  },
  mixins: [
    objects
  ],
  // metaInfo () {
  //   return {
  //     title: page.title,
  //     meta: [
  //       { name: 'description', content: page.preamble },
  //       { name: 'og:title', content: page.title },
  //       // Twitter Card data 
  //       { name: 'twitter:card', content: 'summary' },
  //       { name: 'twitter:site', content: '@mercedescodes' },
  //       { name: 'twitter:title', content: page.title },
  //       { name: 'twitter:description', content: page.preamble },
  //       { name: 'twitter:creator', content: '@mercedescodes'},
  //       // Twitter Summary card images must be at least 120x120px 
  //       // { name: 'twitter:image', content: 'http://www.example.com/image.jpg' },

  //       // Open Graph data
  //       { property: 'og:title', content: page.title },
  //       { property: 'og:type', content: 'article' },
  //       // { property: 'og:url', content: $route }
  //       // { property: 'og:image', content: 'http://example.com/image.jpg' }
  //       { property: 'og:description', content: page.preamble }, 
  //       { property: 'og:site_name', content: 'Mercedes Bernard' }
  //     ]
  //   }
  // },
  props: {
    color: {
      type: String,
      default: 'purple'
    }
  },
  computed: {
    page () {
      return this.$store.state.blogPost
    },
    formattedPublishDate () {
      return moment(this.page.publishDate).format('MMM DD YYYY')
    }
  },
  created () {
    this.$store.dispatch('getBlogPost', this.$route.params.urlSegment)
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

.BlogPost {
  @include inner-page-content;

  &-content {
    @include flex-container;
  }
}

</style>
