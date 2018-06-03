<template>
   <main class='BlogPost'>
    <header :class="'BlogPost-header BlogPost-header--' + color">
      <h2 class='BlogPost-date'>{{ formattedPublishDate }}</h2>
      <h1 class='BlogPost-title'>{{page.title}}</h1>
      <Navigation />
    </header>
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
import Navigation from '../Navigation.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import CTALink from '../CTALink.vue'
import objects from '../../mixins/objects'

const moment = require('moment')

export default {
  components: {
    PageHeader, Navigation, ParseMarkdown, CTALink
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

$header-height: 250px;

.BlogPost {
  @include inner-page-content;

  &-header {
      overflow: hidden;
      box-shadow: $base-drop-shadow;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin-bottom: $large-spacing;
      @include background-color;


      @include media($min-tablet) {
        height: $header-height;
      }
    }

    &-text {
      padding: 0 $base-spacing;
      width: 100%;

      @include media($min-tablet) {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
      }
    }

    &-date {
      font-size: 90px;
      text-align: center;

      @include media($min-tablet) {
        font-size: 250px;
        opacity: $light-opacity;
        align-self: flex-end;
        margin: -60px -25px -40px 0;
        text-align: right;
      }
    }

    &-title {
      text-align: center;
      font-size: $large-font-size;

      @include media($min-tablet) {
        font-size: $larger-font-size;
        margin: 0;
        position: absolute;
        top: $header-height / 4;
      }
    }

  &-content {
    @include flex-container;
  }
}

</style>
