var React = require('react');

var Make = React.createClass({

  render: function() {
    return (
      <div className="make component">
        <div>{this.props.name}</div>
        <div>{this.props.author}</div>
        <div>{this.props.likes}</div>
        <div>{this.props.created}</div>
        <div>{this.props.url}</div>
        <a href={ "/make/" + this.props.id }>view</a>
        <a href={ "/make/" + this.props.id + "/edit"}>edit</a>
      </div>
    );
  },

  view: function(evt) {
    open("/make/" + this.props.key);
  },

  edit: function(evt) {
    open("/make/" + this.props.key + "/edit");
  }

});

module.exports = Make;