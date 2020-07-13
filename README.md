# personal-site

This is my personal website. It was bootstrapped with Vue CLI 3.8. This site hosts my personal blog, information about my speaking engagements, and info about me, my background, and my resume.

## Built with

- [Vue](https://vuejs.org/v2/guide/) - a progressive framework for building UIs.
- [Vue Router](https://router.vuejs.org/guide/) - the official router for Vue.js
- [Vuex](https://vuex.vuejs.org/guide/) - a state management pattern and library for Vue.js applications. It serves as a centralized store for all components in the application.
- [Vue Meta](https://vue-meta.nuxtjs.org/guide/#download-cdn) - a plugin for Vue.js which helps manage your app's metadata
- [Contentful](https://contentful.github.io/contentful.js/contentful/7.7.0/) - This app uses Contentful as its headless CMS.
- [Markdown-it](https://github.com/markdown-it/markdown-it) - All content in Contentful is written in markdown. Markdown-it is the markdown parser we use to translate the markdown into HTML.
- [Markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) - To automatically add ids that can be linked to on all headings
- [Moment](https://momentjs.com/) - Javascript library for date manipulation
- [Express](https://expressjs.com/) - Minimalist web framework for Node. We use it as a server to serve up the static index.html
- [connect-history-api-fallback](https://github.com/bripkens/connect-history-api-fallback) - Middleware to proxy requests through a specified index page, useful for Single Page Applications that utilise the HTML5 History API. Prevents errors if user navigates directly to a URL rather than the home page.
- [Prerender SPA Plugin](https://github.com/chrisvfritz/prerender-spa-plugin) - Used to prerender the routes of the application during build and save as static HTML.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your tests

```
yarn test
```

### Lints files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## CI/CD setup

This app uses ESLint as the code linter, Jest as the unit testing framework, Travis CI as the continuous integration service, and Heroku for deployment and hosting.

When a commit is pushed to master, GitHub triggers Travis CI to lint the code and run the tests. If CI passes, then Heroku builds the application (prerendering the HTML in the process) and deploys it.

When a change is published to the content in Contentful, a webhook is called to trigger Travis CI. If CI passes, then Heroku builds the application (prerendering the HTML in the process) and deploys it.

This means that whenever code or content changes, the app is prerendered and deployed.
