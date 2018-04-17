<template>
  <div class="u-fillHeight">
    <LandingPage :urlSegment="urlSegment"></LandingPage>
    <div v-if="posts.length" class="FlexContainer">
      <BlogListItem v-for="blogPost in posts"
        v-bind="blogPost"
        :key="blogPost.id"
      ></BlogListItem>
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
    posts() {
      return this.$store.state.blogPosts.map((post) => {
        let temp = {
          id: post.id,
          color: 'yellow',
          title: post.title,
          urlSegment: post.urlSegment,
          date: new Date(post.publishDate)
        }
        console.log(temp)
        return temp
      })
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