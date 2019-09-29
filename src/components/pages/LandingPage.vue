<template>
  <main :key="`${landingPage.id}_mainContent`" v-if="landingPage.title" class='LandingPage'>
    <PageHeader
      :color="landingPage.color"
      :icon="iconSvg"
    >
      <template slot='decorativeHeader'>
        <h1 role="presentation">{{ decorativeHeader }}</h1>
      </template>
      <template slot='titleHeader'>
        <h2>{{ titleHeader }}</h2>
      </template>
    </PageHeader>
    <div class="PageContent" v-if="landingPage.mainContent">
      <ParseMarkdown :source="landingPage.mainContent" :collapsible="false" :collapsibleTag="'h3'" :collapsedByDefault="true" />
    </div>
    <!-- <ContactForm v-if="landingPage.showContact" /> -->
    <BlogListContainer v-if="landingPage.showBlogPosts" :color="landingPage.color" :page="parseInt(pageNumber)" />
    <TalkListContainer v-if="landingPage.showTalks" />
    <div :key="`${landingPage.id}_ctaLinks`" v-if="ctaLinks.length" class='FlexContainer FlexContainer--wrap PageContent PageContent--wide'>
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
import BlogListContainer from '../BlogListContainer.vue'
import TalkListContainer from '../TalkListContainer.vue'
import ParseMarkdown from '../ParseMarkdown.vue'

export default {
  components: {
    PageHeader,
    CTALink,
    BlogListContainer,
    TalkListContainer,
    ParseMarkdown
  },
  props: {
    landingPage: Object,
    iconSvg: String,
    ctaLinks: Array,
    pageNumber: Number
  },
  computed: {
    decorativeHeader() {
      if (this.landingPage.title && !this.landingPage.preamble) {
        return ''
      } else {
        return this.landingPage.title
      }
    }, 
    titleHeader() {
      if (this.landingPage.title && !this.landingPage.preamble) {
        return this.landingPage.title
      } else {
        return this.landingPage.preamble
      }
    }
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
