<template>
  <div>
    <PageHeader v-if="page"
      :color="page.color"
      :title="page.title"
      :preamble="page.preamble"
      :media="iconUrl"
    />
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
  props: {
    urlSegment: String
  },
  data() {
    return {
      path: this.urlSegment
    }
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
  created() {
    this.$store.dispatch('getLandingPage', this.path)
  },
  watch: {
    '$route' (to, from) {
      this.path = this.$route.params.urlSegment
      this.$store.dispatch('getLandingPage', this.path)
    }
  }
}
</script>

<style lang="scss">
</style>