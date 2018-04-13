<template>
  <div>
  <HeroHeader title='Home' color='brown'></HeroHeader>
  <div v-if="landingPages.length">
      <ContentColumn
        v-for="landingPage in landingPages"
        :key="landingPage.id"
        :metadata="landingPage"
      />
  </div>
</div>
</template>

<script>
import HeroHeader from '../HeroHeader.vue'
import ContentColumn from '../ContentColumn.vue'

let nextPlaceholderId = 1

export default {
  name: 'HomePage',
  components: {
    HeroHeader, ContentColumn
  },
  data () {
    return {
      landingPages: [
        {
          id: nextPlaceholderId++,
          title: 'About',
          description:'about desc',
          icon:'compass'
        },
        {
          id: nextPlaceholderId++,
          title: 'Blog',
          description:'blog desc',
          icon:'message'
        },
        {
          id: nextPlaceholderId++,
          title: 'Connect',
          description:'connect desc',
          icon:'add-friend'
        },
        {
          id: nextPlaceholderId++,
          title: 'Shop',
          description:'shop desc',
          icon:'purse'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>