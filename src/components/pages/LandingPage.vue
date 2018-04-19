<template>
  <div>
    <PageHeader
      :color="page.color || 'brown'"
      :title="page.title"
      :preamble="page.preamble"
      :media="iconUrl"></PageHeader>
    <main v-if="page.mainContent" class='FlexContainer FlexContainer--justifyCenter'>
      <p class="PageContent">
        <parse-markdown :source="page.mainContent" />
      </p>
    </main>
    <div v-if="ctaLinks.length" class='FlexContainer FlexContainer--justifyCenter'>
      <div class='PageContent PageContent--wide FlexContainer FlexContainer--wrap'>
      <CTALink
        v-for="ctaLink in ctaLinks"
        :key="ctaLink.id"
        v-bind="ctaLink"
      />
    </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import CTALink from '../CTALink.vue'

export default {
  components: {
    PageHeader, CTALink
  },
  computed: {
    page() {
      return this.$store.state.landingPage
    },
    iconUrl() {
      return this.getImageUrl(this.page.icon)
    },
    ctaLinks() {
      if (!this.page.ctaLinks) return []
      return this.page.ctaLinks.map((cta) => {
        return {
          id: cta.sys.id,
          color: this.page.color,
          title: cta.fields.title,
          icon: this.getImageUrl(cta.fields.icon),
          url: cta.fields.externalLink || cta.fields.internalLink.fields.urlSegment,
          external: !!cta.fields.externalLink
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getLandingPage', this.$route.params.urlSegment)
  }
}
</script>

<style lang="scss">
</style>