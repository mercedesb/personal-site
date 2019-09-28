const path = require("path");
const webpack = require("webpack");
const fs = require("fs");

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ["vue-style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });

  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(/\.vue$/, resource => {
      const resPath = resource.request;
      const mockPath = resPath.slice(0, -3) + "mock.vue";
      const absMockPath = path.resolve(resource.context, mockPath);
      const absRootMockPath = path.resolve(__dirname, "./component-stub.vue");
      if (fs.existsSync(absMockPath)) {
        resource.request = mockPath;
      } else if (resPath.endsWith("Container.vue")) {
        resource.request = absRootMockPath;
      }
    })
  );
  // Return the altered config
  return config;
};
