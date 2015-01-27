var React = require("react");
var LabeledField = require("./LabeledField.jsx");

var Entry = React.createClass({

  mixins: [
    require("../mixins/I18N"),
    require("../mixins/Entry")
  ],

  getInitialState: function() {
    return {
      likes: this.props.likes,
      strings: {
        name: "Name",
        author: "By",
        likes: "Likes",
        published: "Published",
        view: "Click to open make"
      },
      entry: this.props.data
    };
  },

  render: function() {
    var created = this.localizeDate(this.state.entry.created);
    var makehref = this.props.editor + "/?make=" + this.state.entry.id;
    return (
      <div className="make component">

        <LabeledField editable={this.props.loggedIn}
                      onUpdate={this.setName}
                      label={this.state.strings.name}
                      value={this.state.entry.name} />

        <LabeledField editable={this.props.loggedIn}
                      onUpdate={this.setAuthor}
                      label={this.state.strings.author}
                      value={this.state.entry.author} />

        <div>
          <span className="label">{this.state.strings.likes}</span>:
          {this.state.entry.likes}
          <button className="btn btn-default likes"
                  onClick={this.like}>♡</button>
        </div>

        <div>
          <span className="label">{this.state.strings.published}</span>:
          {created}
        </div>
        <a href={makehref}>{this.state.strings.view}</a>
      </div>
    );
  }

});

module.exports = Entry;
