<template>
  <div class="PageContent PageContent--wide PageContent--fullWidth">
    <div class="FlexContainer PageContent PageContent--wide">
      <BlogList :posts="posts" :color="color" :isFirstPage="this.currentPageNumber === 1" :loading="loading" />
      <div>
        <BlogCategories :categories="allCategories" :checkedCategories="checkedCategoryNames" @categoryChange="checkedCategoryChange" />
      </div>
    </div>
    <div class='Blog-pageNumberList'>
      <span v-for="n in maxPageNumber"
        :key="n"
        :class="`Blog-pageNumber ${n == currentPageNumber ? 'Blog-pageNumber--current' : ''}`"
        v-on:click="getPage(n)"
      >
        {{n}}
      </span>
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
    allPosts () {
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
    posts () {
      if (this.checkedCategoryNames && this.checkedCategoryNames.length > 0) {
        return this.allPosts.filter(post => {
          if (post.tags) {
            return this.checkedCategoryNames.some(category => post.tags.includes(category))
          }
        })
      } else {
        return this.allPosts
      }
    },
    maxPageNumber () {
      return this.checkedCategoryNames && this.checkedCategoryNames.length > 0 ?  Math.ceil(this.posts.length / this.pageSize) : this.$store.state.maxBlogPostPages
    },
    allCategories () {
      return this.$store.state.blogCategories.map(c => { return { name: c } } ).sort(this.sortCategoryNames);
    },
    checkedCategoryNames: {
      get: function () {
        let collection = []
        if (this.filterByCategories && this.filterByCategories.length > 0) {
          collection = collection.concat(this.filterByCategories)
        }
        else if (this.$route.query.filter) {
          const queryCategories = this.$route.query.filter.split(',').map(c => c.toLowerCase())
          const withIncorrectCasingHandled = this.allCategories.map(c => c.name).filter(name => queryCategories.includes(name.toLowerCase()))
          collection = collection.concat(withIncorrectCasingHandled)
        } 
        return [...new Set(collection)]
      },
      set: function (newCategories) {
        this.filterByCategories = newCategories 
      }
    } 
  },
  methods: {
    getPage (pageNumber) {
      this.loading = true;
      let query = { page: pageNumber, pageSize: this.pageSize }
      if (this.checkedCategoryNames && this.checkedCategoryNames.length) {
        query.filter = this.checkedCategoryNames.join(',')
      }
      this.$store.dispatch('getBlogPosts', query).then(() => {
        this.loading = false;
      });
      this.currentPageNumber = pageNumber
    },
    incrementOrCreateNewTag (name, tags) {
      const existingTag = tags.find(t => t.name === name)
      if (existingTag) {
        existingTag.count += 1
      } else {
        tags.push({ name: name, count: 1})
      }
    },
    sortCategoryNames (tagA, tagB) {
      let aIsLessThanB = tagA.name.toLowerCase() < tagB.name.toLowerCase();
      let aIsGreaterThanB = tagA.name.toLowerCase() > tagB.name.toLowerCase();

      if (aIsGreaterThanB) return 1
      if (aIsLessThanB) return -1
      else return 0
    },
    checkedCategoryChange(newCats) {
      this.checkedCategoryNames = newCats
      this.getPage(1)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.Blog {
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
