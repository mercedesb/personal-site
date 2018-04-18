<template>
  <div>
    <LandingPage :urlSegment="urlSegment"></LandingPage>
    <div v-if="posts.length" class='FlexContainer FlexContainer--justifyCenter'>
      <div class='PageContent PageContent--wide'>
        <BlogListItem v-if="featuredPost"
          v-bind="featuredPost"
          :key="featuredPost.id"
        ></BlogListItem>
        <BlogListItem v-for="blogPost in remainingPosts"
          v-bind="blogPost"
          :key="blogPost.id"
        ></BlogListItem>
      </div>
    </div>
</div>
</template>

<script>
import LandingPage from './LandingPage.vue'
import BlogListItem from '../BlogListItem.vue'

export default {
  components: {
    LandingPage, BlogListItem
  },
  computed: {
    page() {
      return this.$store.state.landingPage
    },
    posts() {
      return this.$store.state.blogPosts.map((post) => {
        return {
          id: post.id,
          color: this.page.color,
          title: post.title,
          preamble: post.preamble,
          urlSegment: post.urlSegment,
          date: new Date(post.publishDate)
        }
      })
    },
    featuredPost() {
       return {
        featured: true,
        ...this.posts[0]
       }
    },
    remainingPosts() {
      return this.posts.slice(1)
    },
    urlSegment: function () {
      return this.$route.path.replace(/^\//, '')
    }
  },
  created() {
    this.$store.dispatch('getBlogPosts')
  }
}
</script>

<style lang="scss">
</style>