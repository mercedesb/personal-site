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
      .then((page) => this.isEmpty(page) ? this.$router.push({name: 'pageNotFound'}) : '')
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
