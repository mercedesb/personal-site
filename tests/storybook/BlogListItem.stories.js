import StoryRouter from "storybook-vue-router";
import { TestUtility } from "../unit/TestUtility";
import BlogListItem from "../../src/components/BlogListItem.vue";

export default {
  title: "BlogListItem",
  component: BlogListItem,
  decorators: [StoryRouter()]
};

export const featured = () => {
  return {
    components: { BlogListItem },
    data() {
      return {
        blogPost: {
          ...TestUtility.blogPosts[0],
          mainContent: "this is the main content"
        }
      };
    },
    template: `
      <div class='PageContent PageContent--wide'>
        <BlogListItem color="purple" :featured="true" v-bind="blogPost" :key="blogPost.id" />
      </div>
    `
  };
};

export const notFeatured = () => {
  return {
    components: { BlogListItem },
    data() {
      return {
        blogPost: {
          ...TestUtility.blogPosts[0],
          mainContent: "this is the main content"
        }
      };
    },
    template: `
      <div class='PageContent PageContent--wide'>
        <BlogListItem color="purple" :featured="false" v-bind="blogPost" :key="blogPost.id" />
      </div>
    `
  };
};
