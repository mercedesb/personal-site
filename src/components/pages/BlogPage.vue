<template>
  <div>
  <LandingPage v-bind:urlSegment="urlSegment">
  </LandingPage>
  <div v-if="posts.length" class="FlexContainer">
    <BlogListItem v-for="blogPost in posts"
      v-bind="blogPost.post"
      :color="blogPost.color"
    />
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

const colors = ['yellow', 'blue', 'red', 'brown', 'gray']

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
    //const colorToFilter = this.color
    const colorSubset = colors //.filter(current => current !== colorToFilter);
    return fetchPosts()
    .then((posts) => {
      posts.forEach((post, index) => {
        this.posts.push(
        {
          color: colorSubset[index % colorSubset.length],
          post: {
            ...post.fields,
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