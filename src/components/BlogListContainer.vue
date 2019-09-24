<template>
  <div>
    <BlogList :posts="posts" :color="color" :isFirstPage="this.currentPageNumber === 1" />
    <div class='Blog-pageNumberList'>
      <span v-for="n in maxPageNumber"
        :key="n"
        :class="`Blog-pageNumber ${n == currentPageNumber ? 'Blog-pageNumber--current' : ''}`"
        v-on:click="getPage(n)"
      >
        {{n}}
      </span>
    </div>
  </div>
</template>

<script>
import BlogList from './BlogList.vue'

export default {
  components: {
    BlogList
  },
  props: {
    color: String,
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentPageNumber: this.page,
      pageSize: 10
    }
  },
  computed: {
    posts () {
      return this.$store.state.blogPosts.map((post) => {
        return {
          id: post.id,
          color: this.color,
          title: post.title,
          preamble: post.preamble,
          mainContent: post.mainContent,
          urlSegment: post.urlSegment,
          date: new Date(post.publishDate)
        }
      })
    },
    maxPageNumber () {
      return this.$store.state.maxBlogPostPages
    }
  },
  methods: {
    getPage (pageNumber) {
      this.$store.dispatch('getBlogPosts', { page: pageNumber, pageSize: this.pageSize })
      this.currentPageNumber = pageNumber
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.Blog {
  &-pageNumberList {
    text-align: center;
    padding: $large-spacing 0;
  }

  &-pageNumber {
    margin: 0 $base-spacing;
    font-family: $header-font-family;
    font-size: $large-font-size;
    cursor: pointer;

    &--current {
      text-decoration: underline;
    }
  }
}
</style>
