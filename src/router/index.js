import Vue from "vue";
import Router from "vue-router";

import HomePage from "../components/pages/HomePage.vue";
import BlogPostPageContainer from "../components/pages/BlogPostPageContainer.vue";
import TalkPageContainer from "../components/pages/TalkPageContainer.vue";
import LandingPageContainer from "../components/pages/LandingPageContainer.vue";
import PageNotFound from "../components/pages/PageNotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/", component: HomePage },
    {
      path: "/blog/:urlSegment",
      name: "blogPost",
      component: BlogPostPageContainer,
      props: true
    },
    {
      path: "/speaking/:urlSegment",
      name: "talkPage",
      component: TalkPageContainer,
      props: true
    },
    {
      path: "/:urlSegment",
      component: LandingPageContainer,
      props: route => ({
        ...route.params,
        ...route.query
      })
    },
    { path: "/404", alias: "*", name: "pageNotFound", component: PageNotFound }
  ]
});
