<template>
  <div class="PageContent PageContent--wide PageContent--fullWidth">
      <h3 class="Blog-activeCategory" v-if="activeCategory">
        Posts about {{this.activeCategory}}
      </h3>
    <div class="FlexContainer PageContent PageContent--wide">
      <BlogList :posts="posts" :color="color" :isFirstPage="this.currentPageNumber === 1" :loading="loading" />
      <div>
        <BlogCategories :categories="allCategories" :activeCategory="activeCategory" />
      </div>
    </div>
    <div class='Blog-pageNumberList'>
      <div v-if="!activeCategory">
        <span v-for="n in maxPageNumber"
          :key="n"
          :class="`Blog-pageNumber ${n == currentPageNumber ? 'Blog-pageNumber--current' : ''}`"
          v-on:click="getPage(n)"
        >
          {{n}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import BlogList from './BlogList.vue'
import BlogCategories from './BlogCategories.vue'

export default {
  components: {
    BlogList, BlogCategories
  },
  props: {
    color: String,
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      currentPageNumber: this.page,
      pageSize: 10,
      filterByCategories: [],
      loading: false
    }
  },
  computed: {
    posts () {
      return this.$store.state.blogPosts.map((post) => {
        return {
          id: post.id,
          color: this.color,
          title: post.title,
          preamble: post.preamble,
          mainContent: post.mainContent,
          urlSegment: post.urlSegment,
          tags: post.tags,
          date: new Date(post.publishDate)
        }
      })
    },
    maxPageNumber () {
      return this.activeCategory ?  Math.ceil(this.posts.length / this.pageSize) : this.$store.state.maxBlogPostPages
    },
    allCategories () {
      return this.$store.state.blogCategories.map(c => { return { name: c } } ).sort(this.sortCategoryNames);
    },
    activeCategory () {
      const queryCategory = this.$route.query.filter ? this.$route.query.filter.toLowerCase() : ""
      const withIncorrectCasingHandled = this.allCategories.map(c => c.name).find(name => queryCategory === name.toLowerCase())
      return withIncorrectCasingHandled
    }
  },
  methods: {
    getPage (pageNumber) {
      this.loading = true;
      let query = { page: pageNumber, pageSize: this.pageSize }
      if (this.activeCategory) {
        query.filter = this.activeCategory
      }
      this.$store.dispatch('getBlogPosts', query).then(() => {
        this.loading = false;
      });
      this.currentPageNumber = pageNumber
    },
    sortCategoryNames (tagA, tagB) {
      let aIsLessThanB = tagA.name.toLowerCase() < tagB.name.toLowerCase();
      let aIsGreaterThanB = tagA.name.toLowerCase() > tagB.name.toLowerCase();

      if (aIsGreaterThanB) return 1
      if (aIsLessThanB) return -1
      else return 0
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.Blog {
  &-activeCategory {
    margin: 0 $large-spacing $large-spacing;
    font-size: 1rem;
    font-weight: $heavy-font-weight;
  }

  &-pageNumberList {
    text-align: center;
    padding: $large-spacing 0;
  }

  &-pageNumber {
    margin: 0 $base-spacing;
    font-family: $header-font-family;
    font-size: $large-font-size;
    cursor: pointer;

    &--current {
      text-decoration: underline;
    }
  }
}
</style>
