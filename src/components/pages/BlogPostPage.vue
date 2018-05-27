<template>
   <main class='BlogPost'>
    <header :class="'BlogPost-header BlogPost-header--' + color">
      <h1 class='BlogPost-title'>{{page.title}}</h1>
      <h5 class='BlogPost-date'>{{ formattedPublishDate }}</h5>
    </header>
    <div v-if="page.mainContent" class='BlogPost-content'>
      <p class="PageContent">
        <ParseMarkdown :source="page.mainContent" />
      </p>
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
      default: 'gray'
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

$header-height: 200px;

.BlogPost {
  @include inner-page-content;

  &-header {
    align-self: flex-start;
    padding-left: $base-spacing;
    margin: 0 0 $base-spacing;

    @include color;
  }

  &-title {
    margin-bottom: 0;
  }

  &-content {
    @include flex-container;
  }
}

.ContentHeader {
  box-shadow: $base-drop-shadow;
  max-height: $header-height;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  &-text {
    margin: $small-spacing $base-spacing;
    overflow: hidden;
    text-align:center;
  }

  @include background-color;
}
</style>
