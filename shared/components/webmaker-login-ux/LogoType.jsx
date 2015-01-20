var React = require("react");

var LogoType = React.createClass({

  render: function() {
    var wordmark = "mozilla " + this.props.product;
    return (
      <div className="logo component">
        <img src="images/logo.png" />
        <span className="logotype">{wordmark}</span>
      </div>
    );
  }

});

module.exports = LogoType;