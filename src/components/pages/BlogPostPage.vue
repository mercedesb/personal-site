<template>
   <main class='BlogPost'>
    <PageHeader
      :color="color"
      :short="true"
    >
      <template slot='decorativeHeader'>
        <h1>{{ formattedPublishDate }}</h1>
      </template>
      <template slot='titleHeader'>
        <h2>{{page.title}}</h2>
      </template>
    </PageHeader>
    <div v-if="page.mainContent">
      <div class="PageContent">
        <p><ReadingTime :text="page.mainContent" /></p>
        <ParseMarkdown :source="page.mainContent" />
        <br/>
        <p class="BlogPost-publishDate">
          <em>Published {{formattedPublishDate}}</em>
        </p>
        <div class="BlogPost-socialShare">
          <a :href="`https://twitter.com/intent/tweet?url=http://www.mercedesbernard.com${this.$route.fullPath}/&text=${page.title}&via=mercedescodes`"><img src="@/assets/Twitter-Social-Share.svg" alt="Twitter share icon" /></a>
          <a :href="`https://www.linkedin.com/shareArticle?mini=true&url=http://www.mercedesbernard.com${this.$route.fullPath}/&title=${page.title}&summary=${page.preamble}`"><img src="@/assets/Linkedin-Social-Share.svg" alt="Linkedin share icon" /></a>
          <a :href="`https://www.facebook.com/sharer.php?u=http://www.mercedesbernard.com${this.$route.fullPath}/`"><img src="@/assets/Facebook-Social-Share.svg" alt="Facebook share icon" /></a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import CTALink from '../CTALink.vue'
import ReadingTime from '../ReadingTime.vue'
import objects from '../../mixins/objects'
import images from '../../mixins/images'

const moment = require('moment')

export default {
  components: {
    PageHeader, ParseMarkdown, CTALink, ReadingTime
  },
  mixins: [
    objects, images
  ],
  metaInfo () {
    return {
      title: this.page.title,
      titleTemplate: '%s | Mercedes Bernard',
      meta: [
        { name: 'description', vmid: 'description', content: this.page.preamble },
        { name: 'og:title', vmid: 'og:title', content: this.page.title },
        // Twitter Card data
        { name: 'twitter:card', vmid: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', vmid: 'twitter:site', content: '@mercedescodes' },
        { name: 'twitter:title', vmid: 'twitter:title', content: this.page.title },
        { name: 'twitter:description', vmid: 'twitter:description', content: this.page.preamble },
        { name: 'twitter:creator', vmid: 'twitter:creator', content: '@mercedescodes' },
        { name: 'twitter:image', content: this.socialImage ? `${window.location.protocol}${this.socialImage}?w=800&fit=fill` : '' },
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.page.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        { property: 'og:image', content: this.socialImage ? `${window.location.protocol}${this.socialImage}?w=800&fit=fill` : '' },
        { property: 'og:description', vmid: 'og:description', content: this.page.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  props: {
    color: {
      type: String,
      default: 'purple'
    }
  },
  computed: {
    page () {
      return this.$store.state.blogPost
    },
    formattedPublishDate () {
      return moment(this.page.publishDate).format('MMM DD YYYY')
    },
    socialImage () {
      return this.getImageUrl(this.page.socialImage)
    }
  },
  created () {
    this.$store.dispatch('getBlogPost', this.$route.params.urlSegment)
      .then((page) => {
        if (this.isEmpty(page)) {
          this.$router.push({name: 'pageNotFound'})
        }

        this.$store.dispatch('getNavLinks')
          .then((navLinks) => {
            document.dispatchEvent(new Event('custom-render-trigger'))
          })
      })
  }
}
</script>

<style lang="scss">
  @import '../../assets/styles/variables.scss';

.BlogPost {
  @include inner-page-content;

  @include media($max-tablet) {
    display: block;
  }

  &-socialShare {
    display: flex;
    img {
      width: 30px;
      padding: 0 $small-spacing $base-spacing;
    }
  }
}

</style>
