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
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: "500kb" }));

// We'll host gallery and editor from here, so that
// we don't get rejected because of port shenannigans
app.use(express.static(__dirname + '/public'));

// make bower components universally findable by
// pretending we have our own CDN running:
app.use('/cdn', express.static(__dirname + '/../bower_components'));
app.use('/cdn', express.static(__dirname + '/../node_modules'));

// bind API routes
routes.setup(app);

// convenience redirect
app.get('/', function(req, res) { res.redirect('/gallery'); });

var server = app.listen(process.env.PORT || 55555, function() {
  console.log('API server listening on http://localhost:%d', server.address().port);
});
