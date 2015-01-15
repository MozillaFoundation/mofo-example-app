  var fs = require("fs"),
      express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      routes = require("./routes");

app.disable('x-powered-by');
app.use(bodyParser.json({ limit: "1mb" }));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

routes.setup(app);

var server = app.listen(55555, function() {
  console.log('Listening on port %d', server.address().port);
});
