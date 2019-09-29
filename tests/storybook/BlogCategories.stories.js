import BlogCategories from "../../src/components/BlogCategories.vue";

export default {
  title: "BlogCategories",
  component: BlogCategories
};

export const defaultPresentation = () => {
  return {
    components: { BlogCategories },
    data() {
      return {
        categories: [
          {
            name: "Technology",
            count: 3
          },
          {
            name: "Mentorship",
            count: 3
          },
          {
            name: "Consulting",
            count: 3
          },
          {
            name: "Crafts",
            count: 3
          }
        ]
      };
    },
    template: `
      <BlogCategories :categories="categories">
      `
  };
};
