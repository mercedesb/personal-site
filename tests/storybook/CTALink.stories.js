import StoryRouter from "storybook-vue-router";
import CTALink from "../../src/components/CTALink.vue";

const icon =
  "<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><g transform='translate(2 2)' stroke='#000' stroke-width='2' fill='none' fill-rule='evenodd'><circle cx='98' cy='98' r='98'></circle><circle cx='98.516' cy='98.516' r='91.295'></circle><path d='M68.084 11.347c43.212 30 69.001 58.885 77.369 86.653M158.599 29.748c-3.14 49.407-14.66 84.667-34.564 105.78M187.538 116.077c-47.31 19.815-84.96 25.892-112.945 18.23M129.979 183.621c-41.919-29.83-67.02-58.714-75.305-86.653M38.916 167.637C45.176 114.05 58.257 76.7 78.16 55.587M8.621 79.076c46.3-22.014 83.568-29.68 111.804-23'></path><circle cx='98' cy='98' r='15.474'></circle></g></svg>";

export default {
  title: "CTALink",
  component: CTALink,
  decorators: [StoryRouter()]
};

export const withoutIcon = () => ({
  components: { CTALink },
  template: '<CTALink title="Title" iconSvg="" url="/blog" :external="false" />'
});

export const withIcon = () => {
  return {
    components: { CTALink },
    data() {
      return {
        iconSvg: icon
      };
    },
    template:
      '<CTALink title="Title" :iconSvg="iconSvg" url="/blog" :external="false" />'
  };
};

export const red = () => {
  return {
    components: { CTALink },
    data() {
      return {
        iconSvg: icon
      };
    },
    template:
      '<CTALink title="Title" :iconSvg="iconSvg" url="/blog" :external="false" color="red"/>'
  };
};

export const purple = () => {
  return {
    components: { CTALink },
    data() {
      return {
        iconSvg: icon
      };
    },
    template:
      '<CTALink title="Title" :iconSvg="iconSvg" url="/blog" :external="false" color="purple"/>'
  };
};

export const gray = () => {
  return {
    components: { CTALink },
    data() {
      return {
        iconSvg: icon
      };
    },
    template:
      '<CTALink title="Title" :iconSvg="iconSvg" url="/blog" :external="false" color="gray"/>'
  };
};

export const yellow = () => {
  return {
    components: { CTALink },
    data() {
      return {
        iconSvg: icon
      };
    },
    template:
      '<CTALink title="Title" :iconSvg="iconSvg" url="/blog" :external="false" color="yellow"/>'
  };
};
