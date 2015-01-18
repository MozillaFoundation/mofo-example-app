var React = require("react");
var request = require("superagent");
var I18N = require("../../mixins/I18N");
var Make = require("../../mixins/Make");

var MakeEditor = React.createClass({

  mixins: [
    I18N,
    Make
  ],

  getInitialState: function() {
    return {
      edit: false,
      strings: {
        edit: "Edit",
        save: "Save"
      },
      make: {}
    };
  },

  componentDidMount: function() {
    var url = this.props.apiserver + "/api/1.0/entry/" + this.props.make;
    request.get(url).end(this.handleMake);
  },

  handleMake: function(err, data) {
    this.setMake(JSON.parse(data.text).make);
  },

  render: function() {
    var btnClass = "btn btn-primary";
    if(this.state.edit) {
      return this.renderEditable(btnClass);
    }
    return this.renderStatic(btnClass);
  },

  renderEditable: function(btnClass) {
    return (
      <div className="make-editor component">
        <button className={btnClass}
                onClick={this.setStatic}>{this.state.strings.save}</button>
        <input value={this.state.make.name} onChange={this.editName}  />
        <input value={this.state.make.author} onChange={this.editAuthor} />
      </div>
    );
  },

  setStatic: function() {
    this.setState({ edit: false });
    this.saveMake();
  },

  renderStatic: function(btnClass) {
    return (
      <div className="make-editor component">
        <button className={btnClass}
                onClick={this.setEditable}>{this.state.strings.edit}</button>
        <h1 onClick={this.editName}>{this.state.make.name}</h1>
        <h2 onClick={this.editAuthor}>{this.state.make.author}</h2>
      </div>
    );
  },

  setEditable: function() {
    this.setState({ edit: true });
  }

});

module.exports = MakeEditor;