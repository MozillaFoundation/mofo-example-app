var request = require("superagent");

module.exports = {

  componentDidMount: function() {
    if(this.props.make) {
      this.setMake(this.props.make);
    }
  },

  setMake: function(make) {
    this.make = make;
    this.setState({ make: this.make });
  },

  update: function() {
    this.setState({ make: this.make });
  },

  like: function(evt) {
    this.make.likes = parseInt(this.make.likes) + 1;
    this.setState({ make: this.make });
    this.saveMake();
  },

  editName: function(evt) {
    var newname = evt.target.value;
    if(newname) {
      this.make.name = newname;
      this.update();
    }
  },

  editAuthor: function(evt) {
    var newauthor = evt.target.value;
    if(newauthor) {
      this.make.author = newauthor;
      this.update();
    }
  },

  saveMake: function() {
    var url = this.props.apiserver + "/api/1.0/crupdate/";
    var payload = this.make;
    request.post(url).send(payload).end(this.handleSaveMake);
  },

  handleSaveMake: function(err, data) {
    console.log(err, data);
  }
};
