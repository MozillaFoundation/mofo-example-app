var React = require('react');

var LogoType = React.createClass({

  render: function() {
    return (
      <div className="logo component">
        <img src="images/logo.png" /><span className="logotype">{"mozilla " + this.props.product}</span>
      </div>
    );
  }

});

module.exports = LogoType;