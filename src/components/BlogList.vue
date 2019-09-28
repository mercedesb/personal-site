<template>
  <transition name="fade" mode="out-in">
    <div v-if="posts.length" class='PageContent PageContent--wide'>
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
  </transition>
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
    isFirstPage: Boolean
  },
  computed: {
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
