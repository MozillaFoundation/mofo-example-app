var React = require('react');
var request = require('superagent');

var MakeEditor = React.createClass({

  getInitialState: function() {
    return {
      edit: false,
      make: {}
    };
  },

  componentDidMount: function() {
    var url = this.props.apiserver + "/api/1.0/entry/" + this.props.make;
    request.get(url).end(this.handleMake);
  },

  handleMake: function(err, data) {
    this.make = JSON.parse(data.text).make;
    this.setState({ make: this.make });
  },

  update: function() {
    this.setState({ make: this.make });
  },

  save: function() {
    var url = this.props.apiserver + "/api/1.0/crupdate/";
    var payload = this.make
    request.post(url).send(payload).end(this.handleSave);
  },

  handleSave: function(err, data) {
    console.log(err, data);
  },

  render: function() {
    var btnClass = "btn btn-primary";
    return this.state.edit ? this.renderEditable(btnClass) : this.renderStatic(btnClass);
  },

  renderEditable: function(btnClass) {
    return (
      <div className="make-editor component">
        <button className={btnClass} onClick={this.setStatic}>save</button>
        <input value={this.state.make.name} onChange={this.editName}  />
        <input value={this.state.make.author} onChange={this.editAuthor} />
      </div>
    );
  },

  setStatic: function() {
    this.setState({ edit: false });
    this.save();
  },

  renderStatic: function(btnClass) {
    return (
      <div className="make-editor component">
        <button className={btnClass} onClick={this.setEditable}>edit</button>
        <h1 onClick={this.editName}>{this.state.make.name}</h1>
        <h2 onClick={this.editAuthor}>{this.state.make.author}</h2>
      </div>
    );
  },

  setEditable: function() {
    this.setState({ edit: true });
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
  }

});

module.exports = MakeEditor;