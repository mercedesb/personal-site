<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="posts.length" class='PageContent PageContent--wide'>
        <BlogListItem v-if="featuredPost"
          v-bind="featuredPost"
          :key="featuredPost.id"
        ></BlogListItem>
        <BlogListItem v-for="blogPost in remainingPosts"
          v-bind="blogPost"
          :key="blogPost.id"
        ></BlogListItem>
      </div>
    </transition>
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
import BlogListItem from './BlogListItem.vue'

export default {
  components: {
    BlogListItem
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
          urlSegment: post.urlSegment,
          date: new Date(post.publishDate)
        }
      })
    },
    featuredPost () {
      return {
        featured: this.currentPageNumber === 1,
        ...this.posts[0]
      }
    },
    remainingPosts () {
      return this.posts.slice(1)
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
  },
  created () {
    this.$store.dispatch('getBlogPosts', { page: this.currentPageNumber, pageSize: this.pageSize })
    .then((blogPosts) => {
      document.dispatchEvent(new Event('custom-render-trigger'))
    })
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
