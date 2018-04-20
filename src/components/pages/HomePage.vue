<template>
  <transition name="fade">
  <div class="u-fillHeight">
    <HeroHeader
      :title="page.preamble"
      color='brown'
      :mainImage="mainImageUrl"
      :backgroundImages="backgroundImages"></HeroHeader>
    <div class='FlexContainer FlexContainer--column u-fillHeight'>
    <div class='FlexContainer u-fillSpace' v-if="columns && columns.length">
        <ContentColumn
          v-for="column in columns"
          :key="column.id"
          v-bind="column"
        />
    </div>
  </div>
</div>
</transition>
</template>

<script>
import HeroHeader from '../HeroHeader.vue'
import ContentColumn from '../ContentColumn.vue'

export default {
  components: {
    HeroHeader, ContentColumn
  },
  computed: {
    page() {
      return this.$store.state.homePage
    },
    mainImageUrl() {
      return this.getImageUrl(this.page.mainImage)
    },
    backgroundImages() {
      if (!this.page.backgroundImages) return []
      return this.page.backgroundImages.map((bgdImage) => {
          return this.getImageUrl(bgdImage)
        })
    },
    columns() {
      if (!this.page.children) return []
      return this.page.children.map((child) => {
        return {
          id: child.sys.id,
          title: child.fields.title,
          color: child.fields.color,
          preamble: child.fields.preamble,
          icon: child.fields.icon,
          externalLink: child.fields.externalLink,
          urlSegment: child.fields.urlSegment
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getHomePage')
  }
}
</script>

<style lang="scss">
</style>