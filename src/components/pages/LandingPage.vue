<template>
  <div>
    <transition name="fade">
      <div :key="page.id">
        <PageHeader
          :color="page.color"
          :title="page.title"
          :preamble="page.preamble"
          :media="iconUrl"
          :key="`${page.id}_header`"
        />
        <main :key="`${page.id}_mainContent`" v-if="page.mainContent" class='FlexContainer FlexContainer--justifyCenter'>
          <p class="PageContent">
            <ParseMarkdown :source="page.mainContent" :collapsible="true" :collapsibleTag="'h3'" :collapsedByDefault="true" />
          </p>
        </main>
        <div :key="`${page.id}_subContent`" v-if="page.showContact || page.showBlogPosts" class='FlexContainer FlexContainer--justifyCenter'>
          <ContactForm v-if="page.showContact" />
          <BlogList v-if="page.showBlogPosts" :color="page.color" />
        </div>
        <div :key="`${page.id}_ctaLinks`" v-if="ctaLinks.length" class='FlexContainer FlexContainer--justifyCenter'>
          <div class='PageContent PageContent--wide FlexContainer'>
            <CTALink
              v-for="ctaLink in ctaLinks"
              :key="ctaLink.id"
              v-bind="ctaLink"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import CTALink from '../CTALink.vue'
import ContactForm from '../ContactForm.vue'
import BlogList from '../BlogList.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import images from '../../mixins/images'

export default {
  components: {
    PageHeader, 
    CTALink, 
    ContactForm, 
    BlogList, 
    ParseMarkdown
  },
  mixins: [
    images
  ],
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
  }
}
</script>

<style lang="scss">

</style>