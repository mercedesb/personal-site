<template>
   <div>
     <header :class="'ContentHeader ContentHeader--' + color">
      <div class="ContentHeader-text">
        <h1>{{ page.title }}</h1>
        <h5>{{ formattedPublishDate }}</h5>
      </div>
    </header>
    <main v-if="page.mainContent" class='FlexContainer FlexContainer--justifyCenter'>
      <p class="PageContent">
        <ParseMarkdown :source="page.mainContent" />
      </p>
    </main>
  </div>
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
