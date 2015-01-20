var makes = require("../data/demodata");

module.exports = {

  makeid: function(req, res, next, makeid) {
    req.params.makeid = makeid;
    next();
  },

  entry: function(req, res) {
    res.json({ make: makes[req.params.makeid] || false });
  },

  createOrUpdate: function(req, res) {
    var payload = req.body;
    makes[payload.id] = payload;
  },

  findAll: function(req, res) {
    res.json({
      makes: Object.keys(makes).map(function(makeid) {
        return makes[makeid];
      })
    });
  }

};
