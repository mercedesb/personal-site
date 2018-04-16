<template>
  <div>
    <LandingPage :urlSegment="urlSegment"></LandingPage>
    <div v-if="posts.length" class="FlexContainer">
      <BlogListItem v-for="blogPost in posts"
        v-bind="blogPost.post"
        :color="blogPost.color"
      ></BlogListItem>
    </div>
</div>
</template>

<script>
import LandingPage from './LandingPage.vue'
import BlogListItem from '../BlogListItem.vue'

const contentful = require('contentful')
const config = require('../../../config.json');

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaToken
})

function fetchPosts () {
  return client.getEntries(
    {
      content_type: 'blogPost',
      order: `-fields.publishDate`
    }
  )
  .then((response) => response.items)
  .catch((error) => {
    console.log(`\nError occurred while fetching posts:`)
    console.error(error)
  })
}

export default {
  components: {
    LandingPage, BlogListItem
  },
  data () {
    return {
      posts: [],
      errors: []
    }
  },
  computed: {
    urlSegment: function () {
      return this.$route.path.replace(/^\//, '')
    }
  },
  created() {
    return fetchPosts()
    .then((posts) => {
      posts.forEach((post, index) => {
        const { publishDate, mainContent, ...fields } = post.fields
        this.posts.push(
        {
          color: 'yellow',
          post: {
            ...fields,
            date: new Date(post.fields.publishDate)
          }
        })
      })
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
</style>