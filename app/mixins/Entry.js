var request = require("superagent");

module.exports = {

  componentDidMount: function() {
    this.entry = this.state.entry;
  },

  update: function() {
    console.log("updated after modification");
    this.setState({
      entry: this.entry
    });
  },

  like: function(evt) {
    this.entry.likes = parseInt(this.entry.likes) + 1;
    this.setState({ entry: this.entry });
    this.saveEntry();
  },

  setName: function(newname) {
    if (newname) {
      this.entry.name = newname;
      this.update();
    }
  },

  setAuthor: function(newauthor) {
    if (newauthor) {
      this.entry.author = newauthor;
      this.update();
    }
  },

  saveEntry: function() {
    var url = "about:blank";
    var payload = this.entry;
    request.post(url).send(payload).end(this.handleSaveEntry);
  },

  handleSaveEntry: function(err, data) {
    console.log(err, data);
  }
};
