import StoryRouter from "storybook-vue-router";
import ContentColumn from "../../src/components/ContentColumn.vue";

export default {
  title: "ContentColumn",
  component: ContentColumn,
  decorators: [StoryRouter()]
};

const iconSvg =
  '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" stroke="#000" fill="none"><path d="M63.949 64.966l12.891 52.22c8.12 11.299 21.697 14.698 40.734 10.197 19.037-4.5 28.468-11.955 28.292-22.363l-15.408-57.294"></path><path d="M63.949 65.211c13.954-9.342 24.484-14.888 31.59-16.636 7.107-1.749 18.767-2.037 34.98-.864 2.97.318 4.634.893 4.993 1.725.358.833-.836 1.96-3.583 3.384M78.44 119.3c12.06-7.963 22.127-13.063 30.2-15.3 8.073-2.235 19.287-3.36 33.643-3.374 4.12.308 6.296.91 6.528 1.804.23.895-.75 1.846-2.942 2.855"></path><path d="M63.949 65.13c-.704-3.74-.052-7.461 1.957-11.165 3.013-5.555 5.187-8.291 11.473-12.57 6.287-4.28 11.553-6.264 17.321-7.031 5.768-.767 24.728-1.354 27.697-.41 2.968.945 5.172 1.53 8.307 5.638 2.09 2.739 2.998 5.678 2.722 8.818"></path><path d="M102.37 47.56c.189-3.563-.221-6.564-1.23-9.005-1.01-2.442-2.452-3.919-4.326-4.432M108.725 47.005c0-3.633-.252-6.116-.755-7.45-.503-1.332-2.227-3.286-5.173-5.861M115.076 47.005c.032-4.136-.248-6.92-.838-8.354-.591-1.434-2.004-3.162-4.238-5.185M121.712 47.284c0-4.222-.32-7.16-.96-8.814-.64-1.654-2.257-3.322-4.853-5.004M127.964 47.56c0-3.962-.207-6.617-.62-7.967-.412-1.35-1.937-3.173-4.573-5.47M88.67 112.963L75.774 57.848M83.143 53.7l13.095 54.973M75.356 110.955l11.234-6.84M72.918 101.386l11.338-7.005M70.516 91.577l11.475-6.956M68.189 82.294l11.574-7.07M65.822 72.694l11.763-7.222M121.712 47.284l4.5 20.041-3.44 6.63 6.217 4.904 5.15 21.767"></path><path d="M129.033 78.96l3.78-6.266-6.523-5.369M94.332 100.216c5.834-3.239 11.313-5.447 16.438-6.623 5.126-1.177 12.191-1.849 21.196-2.016M91.918 90.327c7.533-3.309 12.978-5.377 16.335-6.204 3.358-.827 10.553-1.261 21.586-1.302M89.628 80.813c8.023-3.343 13.547-5.37 16.572-6.079 1.781-.418 7.305-.735 16.571-.952M87.302 71.165c6.767-2.996 11.932-4.98 15.495-5.954 3.563-.973 11.145-1.214 22.746-.72M85.091 61.67c6.16-2.94 11.083-4.88 14.767-5.816 3.683-.937 11.547-1.1 23.592-.492M131.966 91.577h10.532c2.89.377 4.448 1.016 4.677 1.916.23.9-.954 2.026-3.549 3.377M129.839 82.821h10.14c2.965.352 4.563.952 4.793 1.8.23.848-.883 2.026-3.342 3.534"></path><path d="M138.929 79.287c2.508-1.747 3.634-3.101 3.38-4.063-.256-.96-1.93-1.671-5.023-2.131l-4.474-.399M136.623 70.143c2.864-1.87 4.011-3.173 3.441-3.911-.57-.738-2.235-1.16-4.994-1.266l-9.527-.432M134.138 61.029c2.664-1.659 3.818-2.915 3.461-3.77-.357-.854-1.952-1.323-4.787-1.405l-9.362-.492M86.59 125.83c7.337 20.226 13.528 29.62 18.573 28.184 5.045-1.437 5.467-9.673 1.266-24.708"></path><path d="M105.164 154.157c5.194-.038 8.323-1.944 9.386-5.72 1.064-3.776.343-10.42-2.16-19.934"></path><path d="M97.38 148.925l-5.816 13.439c5.087 2.988 10.324 4.481 15.712 4.481 5.387 0 10.779-1.493 16.174-4.481l-4.397-13.44c3.373-1.577 5.263-3.24 5.67-4.988.407-1.748-.442-7.637-2.548-17.667"></path><path d="M113.937 134.934c2.625-1.357 4.284-1.788 4.977-1.294 1.04.741 2.796 4.317 3.857 6.513a19.479 19.479 0 0 1 1.56 4.69M96.238 164.688v35.311M118.553 164.688v35.311M10.643 49.815L0 35.555M26.199 68.704l-10.643-14.26M41.754 87.593l-10.643-14.26M48.318 12.446l-6.08-10.38M55.592 26.036l-6.08-10.379M62.866 39.627l-6.08-10.38"></path><g><path d="M189.444 49.298l10.045-15.965M176.111 70.41l10.045-15.966M162.778 90.41l10.044-15.966"></path></g><g><path d="M150.647 12.385l3.342-10.813M146.203 26.83l3.342-10.813M141.758 41.274L145.1 30.46"></path></g></g></svg>';

export const withOutFlexContainer = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        column: {
          title: "Title",
          color: "red",
          preamble: "Test preamble",
          iconSvg: iconSvg,
          externalLink: "",
          urlSegment: "testPath"
        }
      };
    },
    template: '<ContentColumn v-bind="column" :key="column.urlSegment" />'
  };
};

export const withAllProps = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        column: {
          title: "Title",
          color: "red",
          preamble: "Test preamble",
          iconSvg: iconSvg,
          externalLink: "",
          urlSegment: "testPath"
        }
      };
    },
    template: `
      <div class="FlexContainer">
        <ContentColumn v-bind="column" :key="column.urlSegment" />
      </div>
    `
  };
};

export const withMissingProps = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        column: {
          title: "Title",
          color: "red",
          urlSegment: "testPath"
        }
      };
    },
    template: `
      <div class="FlexContainer">
        <ContentColumn v-bind="column" :key="column.urlSegment" />
      </div>
    `
  };
};

export const withTwoColumns = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        columns: [
          {
            title: "Title",
            color: "red",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath1"
          },
          {
            title: "Title",
            color: "purple",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath2"
          }
        ]
      };
    },
    template: `
      <div class='FlexContainer'>
        <ContentColumn
          v-for="column in columns"
          :key="column.urlSegment"
          v-bind="column"
        />
      </div>
    `
  };
};

export const withThreeColumns = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        columns: [
          {
            title: "Title",
            color: "purple",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath1"
          },
          {
            title: "Title",
            color: "yellow",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath2"
          },
          {
            title: "Title",
            color: "red",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath3"
          }
        ]
      };
    },
    template: `
      <div class='FlexContainer'>
        <ContentColumn
          v-for="column in columns"
          :key="column.urlSegment"
          v-bind="column"
        />
      </div>
    `
  };
};

export const withFourColumns = () => {
  return {
    components: { ContentColumn },
    data() {
      return {
        columns: [
          {
            title: "Title",
            color: "purple",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath1"
          },
          {
            title: "Title",
            color: "yellow",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath2"
          },
          {
            title: "Title",
            color: "red",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath3"
          },
          {
            title: "Title",
            color: "gray",
            preamble: "Test preamble",
            iconSvg: iconSvg,
            externalLink: "",
            urlSegment: "testPath4"
          }
        ]
      };
    },
    template: `
      <div class='FlexContainer'>
        <ContentColumn
          v-for="column in columns"
          :key="column.urlSegment"
          v-bind="column"
        />
      </div>
    `
  };
};
