/**
 * A pure API server. It only knows how to
 * service crupdate requests. This server
 * has no front end whatsoever.
 */
var express = require("express"),
    bodyParser = require("body-parser"),
    routes = require("./routes"),
    app = express();

// some housekeeping:
app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "500kb" }));

// let"s make sure to get CORS out of the way here
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// make bower components universally findable by
// pretending we have our own CDN running:
app.use("/cdn", express.static(__dirname + "/../../shared/vendor"));
app.use("/cdn", express.static(__dirname + "/../../node_modules"));

// bind API routes
routes.setup(app);

// convenience redirect
app.get("/", function(req, res) { res.redirect("/gallery"); });

var server = app.listen(process.env.PORT || 55555, function() {
  console.log("API server listening on http://localhost:%d",
    server.address().port);
});
