const fs = require("fs");
const file = require.resolve("prerender-spa-plugin/es6/index.js");
const src = fs.readFileSync(file, "utf-8");
const updated = src.replace(
  "console.error(msg)",
  'console.error("[PRERENDER ERROR]", err)'
);
fs.writeFileSync(file, updated);
