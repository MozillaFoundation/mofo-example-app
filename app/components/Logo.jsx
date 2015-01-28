var React = require("react");

var Logo = React.createClass({

  render: function() {
    return (
      <span>
        <a className="logo" href="."><img src="images/logo.png" /></a>
        {this.props.name}
      </span>
    );
  }

});

module.exports = Logo;
