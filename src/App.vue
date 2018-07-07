<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component v-bind:is="currentComponent"></component>
    </transition>
  </div>
</template>

<script>
import HomeLayout from './components/HomeLayout.vue'
import ContentLayout from './components/ContentLayout.vue'

const defaultTitle = 'Mercedes Bernard | Software engineer by day, crafter by night'
const defaultDesc = 'I create handmade products that suit your needs whether by keyboard, screen, hook, or wheel. Based in Chicago, IL.'

export default {
  name: 'app',
  // metaInfo () {
  //   return {
  //     title: defaultTitle,
  //     meta: [
  //       { name: 'description', content: defaultDesc },
  //       { name: 'og:title', content: defaultTitle },
  //       // Twitter Card data 
  //       { name: 'twitter:card', content: 'summary' },
  //       { name: 'twitter:site', content: '@mercedescodes' },
  //       { name: 'twitter:title', content: defaultTitle },
  //       { name: 'twitter:description', content: defaultDesc },
  //       { name: 'twitter:creator', content: '@mercedescodes'},
  //       // Twitter Summary card images must be at least 120x120px 
  //       // { name: 'twitter:image', content: 'http://www.example.com/image.jpg' },

  //       // Open Graph data
  //       { property: 'og:title', content: defaultTitle },
  //       { property: 'og:type', content: 'article' },
  //       // { property: 'og:url', content: $route }
  //       // { property: 'og:image', content: 'http://example.com/image.jpg' }
  //       { property: 'og:description', content: defaultDesc }, 
  //       { property: 'og:site_name', content: 'Mercedes Bernard' }
  //     ]
  //   }
  // },
  components: {
    HomeLayout, ContentLayout
  },
  computed: {
    currentComponent () {
      if (this.$route.path === '/') {
        return HomeLayout
      } else {
        return ContentLayout
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/app.scss';
</style>
