var React = require("react");

var WebmakerLoginUX;

/* jshint ignore:start */
WebmakerLoginUX = require("./../../../shared/components/webmaker-login-ux/WebmakerLoginUX.jsx");
/* jshint ignore:end */

var MakeGallery = require("./MakeGallery.jsx");

var Gallery = React.createClass({

  render: function() {
    return (
      <div>
        <WebmakerLoginUX />
        <MakeGallery apiserver={this.props.settings.apiserver}
                     editor={this.props.settings.editor} />
      </div>
    );
  }

});

module.exports = Gallery;