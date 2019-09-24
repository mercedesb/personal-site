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
import ReadingTime from '../ReadingTime.vue'

export default {
  components: {
    PageHeader, ParseMarkdown, ReadingTime
  },
  props: {
    page: Object,
    formattedPublishDate: String,
    socialImage: String,
    color: {
      type: String,
      default: 'purple'
    }
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
