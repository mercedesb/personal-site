<template>
  <transition name='fade'>
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
</template>

<script>
import BlogListItem from './BlogListItem.vue'

export default {
  components: {
    BlogListItem
  },
  props: {
    color: String
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
        featured: true,
        ...this.posts[0]
      }
    },
    remainingPosts () {
      return this.posts.slice(1)
    }
  },
  created () {
    this.$store.dispatch('getBlogPosts')
  }
}
</script>

<style lang="scss">
</style>
