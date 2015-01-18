var React = require("react");
var WebmakerLoginUX = require("./webmaker-login-ux/WebmakerLoginUX.jsx");
var MakeEditor = require("./editor/MakeEditor.jsx");

var Editor = React.createClass({

  getInitialState: function() {
    return {
      make: this.props.params.make,
      edit: this.props.params.edit
    };
  },

  render: function() {
    return (
      <div>
        <WebmakerLoginUX />
        <MakeEditor apiserver={this.props.settings.apiserver}
                    make={this.state.make}
                    edit={this.state.edit} />
      </div>
    );
  }

});

module.exports = Editor;