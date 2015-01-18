var React = require("react");
var WebmakerLoginUX = require("./webmaker-login-ux/WebmakerLoginUX.jsx");
var MakeGallery = require("./gallery/MakeGallery.jsx");

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