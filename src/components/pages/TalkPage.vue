<template>
   <main class='TalkPage'>
    <PageHeader
      :color="page.color"
      :icon="page.icon"
    >
      <template slot='titleHeader'>
        <h1>{{page.title}}</h1>
      </template>
    </PageHeader>
    <div v-if="page.mainContent">
      <div class="PageContent">
        <ParseMarkdown class="PageContent-mainContent" :source="page.mainContent" />
        <div v-for="event in page.givenAt" :key="event.id" class="EventDetails">
          <h2 class="h4">{{event.title}}</h2>
          <div class="EventDetails-links">
            <smart-link class="EventDetails-linkItem" :to="event.slidesLink" isExternal="true" v-if="event.slidesLink">Slides</smart-link>
            <smart-link class="EventDetails-linkItem" :to="event.videoLink" isExternal="true" v-if="event.videoLink">Video</smart-link>
            <smart-link class="EventDetails-linkItem" :to="event.audioLink" isExternal="true" v-if="event.audioLink">Audio</smart-link>
            <smart-link class="EventDetails-linkItem" :to="'/' + event.blogLink" v-if="event.blogLink">Blog</smart-link>
            <em>{{event.date}}</em>
          </div>
        </div>
        <br/>
      </div>
    </div>
  </main>
</template>

<script>
import PageHeader from '../PageHeader.vue'
import ParseMarkdown from '../ParseMarkdown.vue'
import objects from '../../mixins/objects'
import images from '../../mixins/images'

const moment = require('moment')

export default {
  components: {
    PageHeader, ParseMarkdown
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
        // Open Graph data
        { property: 'og:title', vmid: 'og:title', content: this.page.title },
        { property: 'og:type', vmid: 'og:type', content: 'article' },
        { property: 'og:url', vmid: 'og:url', content: `http://www.mercedesbernard.com${this.$route.fullPath}/` },
        { property: 'og:description', vmid: 'og:description', content: this.page.preamble },
        { property: 'og:site_name', vmid: 'og:site_name', content: 'Mercedes Bernard' }
      ]
    }
  },
  computed: {
    page () {
      const talk = this.$store.state.talk
      let givenAt = []
      if (talk && talk.givenAt) {
        givenAt = talk.givenAt.map(ga => {
          return {
            id: ga.sys.id,
            ...ga.fields,
            date: moment(ga.fields.date).format('MMMM DD, YYYY'),
            slidesLink: this.getImageUrl(ga.fields.slidesLink)
          }
        })
      }
      return {
        ...talk,
        givenAt: givenAt
      }
    }
  },
  created () {
    this.$store.dispatch('getTalk', this.$route.params.urlSegment)
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

.TalkPage {
  @include inner-page-content;

  @include media($max-tablet) {
    display: block;
  }

  .EventDetails-links {
    .EventDetails-linkItem {
      padding-right: $small-spacing;
      border-right: 2px solid $black;
      display: inline-block;
    }

    .EventDetails-linkItem:last-of-type {
      border-right: none;
    }
  }
}

</style>
