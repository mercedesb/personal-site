<template>
  <div class='PageContent PageContent--fullWidth' :aria-busy="loading" aria-live="polite">
    <div v-if="!readyToDisplay">
      <BlogListItem v-for="n in 10" :loading="true" :key="n"></BlogListItem>
    </div>
    <div v-if="readyToDisplay && posts.length === 0">
      <h3>Oops, there are no posts <span v-if="this.$route.query.filter">matching "{{this.$route.query.filter}}"</span></h3>
    </div>
    <div v-if="readyToDisplay && posts.length > 0">
      <BlogListItem v-if="featuredPost"
        v-bind="featuredPost"
        :key="featuredPost.id"
        :color="color"
      ></BlogListItem>
      <BlogListItem v-for="blogPost in remainingPosts"
        v-bind="blogPost"
        :key="blogPost.id"
        :color="color"
      ></BlogListItem>
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
    posts: Array,
    isFirstPage: Boolean,
    loading: Boolean
  },
  computed: {
    readyToDisplay() {
      return !this.loading && this.posts && this.posts.length
    },
    featuredPost () {
      return {
        featured: this.isFirstPage,
        ...this.posts[0]
      }
    },
    remainingPosts () {
      return this.posts.slice(1)
    }
  }
}
</script>
