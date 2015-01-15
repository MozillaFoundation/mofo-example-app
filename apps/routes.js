var API = require("./API");
var version = "1.0";
var apiroute = "/api/" + version + "/";

module.exports = {
  setup: function (app) {
    // make id parameters
    app.param("makeid", API.makeid);

    // Servicable API routes
    app.get(apiroute + "entry/:makeid", API.entry);
    app.get(apiroute + "findAll", API.findAll);
    app.post(apiroute + "crupdate", API.createOrUpdate);
  }
};
