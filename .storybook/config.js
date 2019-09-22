// Import styles
import "!style-loader!css-loader!sass-loader!./scss-loader.scss";

// Import Storybook
import { configure, addDecorator } from "@storybook/vue";

// Import storybook addons
import { withA11y } from "@storybook/addon-a11y";

// Import Vue
import Vue from "vue";

// Import Vue plugins
import Vuex from "vuex";
import Meta from "vue-meta";
import Router from "vue-router";

// Import your global components.
import SmartLink from "../src/components/SmartLink.vue";

// Install Vue plugins.
Vue.use(Vuex);
Vue.use(Meta);
Vue.use(Router);

// Register global components.
Vue.component("smart-link", SmartLink);

configure(require.context("../tests", true, /\.stories\.js$/), module);
addDecorator(withA11y);
