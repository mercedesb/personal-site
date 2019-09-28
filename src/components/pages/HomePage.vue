<template>
  <div :key="page.id" class="FlexContainer FlexContainer--column">
    <HeroHeader
      :title="page.title"
      :preamble="page.preamble"
      color='brown'
      :mainImage="mainImageUrl"
      :backgroundImages="backgroundImages"
      :key="`${page.id}_header`"
    />
    <div :key="`${page.id}_mainContent`" class='FlexContainer FlexContainer--column u-fillHeight'>
      <div class='FlexContainer' v-if="columns && columns.length">
        <ContentColumn
          v-for="column in columns"
          :key="column.id"
          v-bind="column"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeroHeader from '../HeroHeader.vue'
import ContentColumn from '../ContentColumn.vue'
import images from '../../mixins/images'

export default {
  components: {
    HeroHeader, ContentColumn
  },
  mixins: [
    images
  ],
  computed: {
    page () {
      return this.$store.state.homePage
    },
    mainImageUrl () {
      return this.getImageUrl(this.page.mainImage)
    },
    backgroundImages () {
      const bgdImgs = this.$store.state.backgroundImages
      if (!bgdImgs || !bgdImgs.length) return []
      return this.$store.state.backgroundImages.map((bgdImage) => {
        return this.getImageUrl(bgdImage)
      })
    },
    columns () {
      if (!this.page.children) return []
      return this.page.children.map((child) => {
        return {
          id: child.sys.id,
          title: child.fields.title,
          navTitle: child.fields.navTitle,
          color: child.fields.color,
          preamble: child.fields.preamble,
          iconSvg: child.fields.iconSvg.fields.svg,
          externalLink: child.fields.externalLink,
          urlSegment: child.fields.urlSegment
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getHomePage')
      .then(() => {
        this.$store.dispatch('getBackgroundImages')
          .then(() => {
            document.dispatchEvent(new Event('custom-render-trigger'))
          })
      })
  }
}
</script>
