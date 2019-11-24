const path = require("path");

function getClient() {
  return require("contentful").createClient({
    space: process.env.VUE_APP_SPACE_ID,
    accessToken: process.env.VUE_APP_CDA_TOKEN
  });
}

async function getBlogRoutes() {
  console.log("getting blog routes"); // eslint-disable-line
  const client = getClient();

  return client
    .getEntries({
      content_type: "blogPost"
    })
    .then(response =>
      response.items.map(item => `/blog/${item.fields.urlSegment}`)
    );
}

async function getSpeakingRoutes() {
  console.log("getting speaking routes"); // eslint-disable-line
  const client = getClient();

  return client
    .getEntries({ content_type: "talkPage" })
    .then(response =>
      response.items.map(item => `/speaking/${item.fields.urlSegment}`)
    );
}

// eslint-disable-next-line no-unused-vars
module.exports = (api, _options) => {
  api.registerCommand("build:prerender", async args => {
    const PrerenderSPAPlugin = require("prerender-spa-plugin");
    const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;

    const defaultRoutes = [
      "/",
      "/about",
      "/speaking",
      "/blog",
      "/resume",
      "/crafting"
    ];
    const blogRoutes = await getBlogRoutes();
    const speakingRoutes = await getSpeakingRoutes();
    const allRoutes = defaultRoutes.concat(blogRoutes).concat(speakingRoutes);

    console.log(`routes (${allRoutes.length}): ${allRoutes}`); // eslint-disable-line
    console.log(`env: ${process.env.NODE_ENV}`); // eslint-disable-line

    const puppeteerChromiumArgs =
      process.env.NODE_ENV === "production"
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : [];

    api.chainWebpack(config => {
      config.plugin("prerender").use(PrerenderSPAPlugin, [
        {
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),
          // Required - Routes to render.
          routes: allRoutes,
          renderer: new PuppeteerRenderer({
            renderAfterTime: 5000,
            args: puppeteerChromiumArgs
          })
        }
      ]);
    });

    await api.service.run("build", args);
  });
};

module.exports.defaultModes = {
  "build:prerender": "production"
};
