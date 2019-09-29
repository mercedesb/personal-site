import StoryRouter from "storybook-vue-router";
import MobileNavigation from "../../src/components/MobileNavigation.vue";

export default {
  title: "MobileNavigation",
  component: MobileNavigation,
  decorators: [StoryRouter()]
};

export const defaultPresentation = () => {
  return {
    components: { MobileNavigation },
    data() {
      return {
        navLinks: [
          {
            title: "Blog",
            parsedLink: "/blog",
            externalLink: ""
          },
          {
            title: "Speak",
            parsedLink: "/speak",
            externalLink: ""
          },
          {
            title: "About",
            parsedLink: "/about",
            externalLink: ""
          },
          {
            title: "Craft",
            parsedLink: "/craft",
            externalLink: ""
          }
        ]
      };
    },
    template: `
      <header class="PageHeader PageHeader--gray">    
        <div><h1>Ta Da</h1></div>
        <div style="width: 100%;"> 
          <MobileNavigation :navLinks="navLinks" />
        </div>
      </header>
    `
  };
};

export const inShortHeader = () => {
  return {
    components: { MobileNavigation },
    data() {
      return {
        navLinks: [
          {
            title: "Blog",
            parsedLink: "/blog",
            externalLink: ""
          },
          {
            title: "Speak",
            parsedLink: "/speak",
            externalLink: ""
          },
          {
            title: "About",
            parsedLink: "/about",
            externalLink: ""
          },
          {
            title: "Craft",
            parsedLink: "/craft",
            externalLink: ""
          }
        ]
      };
    },
    template: `
      <header class="PageHeader PageHeader--gray PageHeader--short">    
        <div><h1>Ta Da</h1></div>
        <div style="width: 100%;"> 
          <MobileNavigation :navLinks="navLinks" />
        </div>
      </header>
    `
  };
};
