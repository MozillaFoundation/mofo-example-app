var React = require("react");

var WebmakerLoginUX;

/* jshint ignore:start */
WebmakerLoginUX = require("./../../../shared/components/webmaker-login-ux/WebmakerLoginUX.jsx");
/* jshint ignore:end */

var MakeEditor = require("./MakeEditor.jsx");

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