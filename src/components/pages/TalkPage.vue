<template>
   <main class='TalkPage'>
    <PageHeader
      :color="page.color"
      :icon="page.iconSvg"
      :short="true"
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
            <smart-link class="EventDetails-linkItem" :to="event.slidesLink" :isExternal="true" v-if="event.slidesLink">Slides</smart-link>
            <smart-link class="EventDetails-linkItem" :to="event.videoLink" :isExternal="true" v-if="event.videoLink">Video</smart-link>
            <smart-link class="EventDetails-linkItem" :to="event.audioLink" :isExternal="true" v-if="event.audioLink">Audio</smart-link>
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

export default {
  components: {
    PageHeader, ParseMarkdown
  },
  props: {
    page: Object
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
      padding: 0 $small-spacing;
      border-right: 2px solid $black;
      display: inline-block;
    }

    .EventDetails-linkItem:first-of-type {
      padding-left: 0;
    }

    .EventDetails-linkItem:last-of-type {
      border-right: none;
    }
  }
}

</style>
