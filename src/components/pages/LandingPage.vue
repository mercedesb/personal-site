<template>
  <div>
    <h1>{{data.title}}</h1>
  </div>
</template>

<script>
const contentful = require('contentful')
const config = require('../../../config.json');

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.cdaToken
})

function fetchPage (urlSegment) {
  return client.getEntries(
    {
      'fields.urlSegment': urlSegment,
      content_type: 'landingPage'
    }
  )
  .then((response) => response.items[0])
  .catch((error) => {
    console.log(`\nError occurred while fetching entries for ${urlSegment}:`)
    console.error(error)
  })
}

export default {
  components: {

  },
  props: {
    urlSegment: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: {},
      errors: []
    }
  },
  created () {
    return fetchPage(this.urlSegment)
    .then((page) => {
      this.data = page.fields
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss">
</style>