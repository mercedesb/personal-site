<template>
  <div class='PageContent PageContent--fullWidth'>
    <div v-if="loading">
      <BlogListItem v-for="n in 10" :loading="true" :key="n"></BlogListItem>
    </div>
    <div v-if="readyToDisplay">
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
