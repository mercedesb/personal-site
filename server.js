var express = require("express");
var serveStatic = require("serve-static");
var history = require("connect-history-api-fallback");

let app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(history());
var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port); // eslint-disable-line no-console
