import StoryRouter from "storybook-vue-router";
import { TestUtility } from "../unit/TestUtility";
import BlogList from "../../src/components/BlogList.vue";

export default {
  title: "BlogList",
  component: BlogList,
  decorators: [StoryRouter()]
};

export const onFirstPage = () => {
  return {
    components: { BlogList },
    data() {
      return {
        posts: TestUtility.blogPosts
      };
    },
    template: '<BlogList :posts="posts" color="purple" :isFirstPage="true" />'
  };
};

export const onNotFirstPage = () => {
  return {
    components: { BlogList },
    data() {
      return {
        posts: TestUtility.blogPosts
      };
    },
    template: '<BlogList :posts="posts" color="purple" :isFirstPage="false" />'
  };
};

export const loading = () => {
  return {
    components: { BlogList },
    template:
      '<BlogList :posts="posts" color="purple" :isFirstPage="false" :loading="true" />'
  };
};
