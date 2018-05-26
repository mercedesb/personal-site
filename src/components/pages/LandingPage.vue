<template>
  <main :key="`${page.id}_mainContent`" v-if="page.title" class='LandingPage LandingPage--alignCenter LandingPage--column'>
    <h1 :class="'SplashHeader SplashHeader--' + page.color">{{page.title}}</h1>
    <p class="PageContent">
      <ParseMarkdown :source="page.mainContent" :collapsible="true" :collapsibleTag="'h3'" :collapsedByDefault="true" />
    </p>
    <ContactForm v-if="page.showContact" />
    <BlogList v-if="page.showBlogPosts" :color="page.color" />
    <div :key="`${page.id}_ctaLinks`" v-if="ctaLinks.length" class='FlexContainer PageContent PageContent--wide'>
      <CTALink
        v-for="ctaLink in ctaLinks"
        :key="ctaLink.id"
        v-bind="ctaLink"
      />
    </div>
  </main>
</template>

<script>
import SideNavigation from '../SideNavigation.vue'
import CTALink from '../CTALink.vue'
import ContactForm from '../ContactForm.vue'
import BlogList from '../BlogList.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import images from '../../mixins/images'
import objects from '../../mixins/objects'

export default {
  components: {
    SideNavigation,
    CTALink,
    ContactForm,
    BlogList,
    ParseMarkdown
  },
  mixins: [
    images, objects
  ],
  props: {
    urlSegment: String
  },
  data () {
    return {
      path: this.urlSegment
    }
  },
  computed: {
    page () {
      return this.$store.state.landingPage
    },
    iconUrl () {
      return this.getImageUrl(this.page.icon)
    },
    ctaLinks () {
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
    this.$store.dispatch('getLandingPage', this.path)
      .then((page) => this.isEmpty(page) ? this.$router.push({name: 'pageNotFound'}) : '')
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.LandingPage {
  @include flex-container;
  overflow: auto;
}

.SplashHeader {
  font-size: 150px;
  color: $blue;
  align-self: flex-start;
  padding-left: $base-spacing;
  margin-top: $base-spacing;

  @include color;
}

</style>
