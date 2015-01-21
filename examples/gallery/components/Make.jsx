var React = require("react");
var I18N = require("./../../../shared/mixins/I18N");
var MakeMixin = require("./../../../shared/mixins/Make");

var Make = React.createClass({

  mixins: [
    I18N,
    MakeMixin
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
      make: {}
    };
  },

  render: function() {
    var created = this.localizeDate(this.state.make.created);
    var makehref = this.props.editor + "/?make=" + this.state.make.id;
    return (
      <div className="make component">
        <div>
          <span className="label">{this.state.strings.name}</span>
          : {this.state.make.name}
        </div>
        <div>
          <span className="label">{this.state.strings.author}</span>
          : {this.state.make.author}
        </div>
        <div>
          <span className="label">{this.state.strings.likes}</span>
          : {this.state.make.likes}
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

module.exports = Make;