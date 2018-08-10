<template>
  <main :key="`${landingPage.id}_mainContent`" v-if="landingPage.title" class='LandingPage'>
    <PageHeader
      :color="landingPage.color"
      :media="iconUrl"
    >
      <template slot='decorativeHeader'>
        <h1>{{ landingPage.title }}</h1>
      </template>
      <template slot='titleHeader'>
        <p>{{ landingPage.preamble }}</p>
      </template>
    </PageHeader>
    <div class="PageContent" v-if="landingPage.mainContent">
      <ParseMarkdown :source="landingPage.mainContent" :collapsible="false" :collapsibleTag="'h3'" :collapsedByDefault="true" />
    </div>
    <!-- <ContactForm v-if="landingPage.showContact" /> -->
    <BlogList v-if="landingPage.showBlogPosts" :color="landingPage.color" :page="parseInt(page)" />
    <div :key="`${landingPage.id}_ctaLinks`" v-if="ctaLinks.length" class='FlexContainer PageContent PageContent--wide LandingPage-ctaContainer'>
      <CTALink
        v-for="ctaLink in ctaLinks"
        :key="ctaLink.id"
        v-bind="ctaLink"
      />
    </div>
  </main>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import CTALink from '../CTALink.vue'
import ContactForm from '../ContactForm.vue'
import BlogList from '../BlogList.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import images from '../../mixins/images'
import objects from '../../mixins/objects'

export default {
  components: {
    PageHeader,
    CTALink,
    ContactForm,
    BlogList,
    ParseMarkdown
  },
  mixins: [
    images, objects
  ],
  metaInfo () {
    return {
      title: this.landingPage.title,
      titleTemplate: '%s | Mercedes Bernard',
      meta: [
        { name: 'description', vmid: 'description', content: this.landingPage.preamble },
        { name: 'og:title', vmid: 'og:title', content: this.landingPage.title },
        // Twitter Card data
        { name: 'twitter:card', vmid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', vmid: 'twitter:site', content: '@mercedescodes' },
        { name: 'twitter:title', vmid: 'twitter:title', content: this.landingPage.title },
        { name: 'twitter:description', vmid: 'twitter:description', content: this.landingPage.preamble },
        { name: 'twitter:creator', vmid: 'twitter:creator', content: '@mercedescodes' },
        // Twitter Summary card images must be at least 120x120px
        // { name: 'twitter:image', content: 'http://www.example.com/image.jpg' },
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.landingPage.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        // { property: 'og:image', content: 'http://example.com/image.jpg' }
        { property: 'og:description', vmid: 'og:description', content: this.landingPage.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  props: {
    urlSegment: String,
    page: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      path: this.urlSegment,
      intialPageSize: 10
    }
  },
  computed: {
    landingPage () {
      return this.$store.state.landingPage
    },
    iconUrl () {
      return this.getImageUrl(this.landingPage.icon)
    },
    ctaLinks () {
      if (!this.landingPage.ctaLinks) return []

      let url

      return this.landingPage.ctaLinks.map((cta) => {
        if (cta.fields.externalLink) {
          url = cta.fields.externalLink
        } else if (cta.fields.internalLink) {
          url = `/${cta.fields.internalLink.fields.urlSegment}`
        } else {
          url = `/${cta.fields.urlSegment}`
        }
        return {
          id: cta.sys.id,
          color: this.landingPage.color,
          title: cta.fields.title,
          icon: this.getImageUrl(cta.fields.icon),
          url: url,
          external: !!cta.fields.externalLink
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getLandingPage', this.path)
      .then((landingPage) => {
        if (this.isEmpty(landingPage)) {
          this.$router.push({name: 'pageNotFound'})
        }

        this.$store.dispatch('getNavLinks')
          .then((navLinks) => {
            if (landingPage.showBlogPosts) {
              this.$store.dispatch('getBlogPosts', { page: this.page, pageSize: this.intialPageSize })
                .then((blogPosts) => {
                  document.dispatchEvent(new Event('custom-render-trigger'))
                })
            }
          })
      })
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/variables.scss';

.LandingPage {
  @include inner-page-content;

  &-ctaContainer {
    margin-top: $large-spacing;
  }
}

</style>
