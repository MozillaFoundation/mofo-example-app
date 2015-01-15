var React = require('react');
var I18N = require('../../mixins/I18N.jsx');

var Make = React.createClass({

  mixins: [I18N],

  getInitialState: function() {
    return {
      strings: {
        name: "Name",
        author: "By",
        likes: "Likes",
        published: "Published",
        view: "Click to open make"
      }
    };
  },

  render: function() {
    var created = this.localizeDate(this.props.created);
    return (
      <div className="make component">
        <div><span className="label">{this.state.strings.name}</span>: {this.props.name}</div>
        <div><span className="label">{this.state.strings.author}</span>: {this.props.author}</div>
        <div><span className="label">{this.state.strings.likes}</span>: {this.props.likes}</div>
        <div><span className="label">{this.state.strings.published}</span>: {created}</div>
        <a href={ this.props.editor + "/?make=" + this.props.id }>{this.state.strings.view}</a>
      </div>
    );
  }

});

module.exports = Make;