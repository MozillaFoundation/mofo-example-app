var React = require("react");
var MakeGrid = require("./MakeGrid.jsx");
var Logo = require("./Logo.jsx");
var LocalePicker = require("./LocalePicker.jsx");
var WebmakerLoginUX =
  require("webmaker-login-ux/src/adapters/react/WebmakerLoginUX");

var Gallery = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  render: function() {
    return (
      <div>
        <div className="header component">
          <Logo name="Mozilla Example Application"/>
          { this.state.loggedIn ? <span> (LOGGED IN) </span> : "" }
          <LocalePicker />
          <WebmakerLoginUX
            signInLabel="Sign In"
            signOutLabel="Sign Out"
            onLoggedIn={this.onLoggedIn}
            onLoggedOut={this.onLoggedOut}
            host={this.props.host}
            loggedIn={this.state.loggedIn}
          />
        </div>
        <MakeGrid loggedIn={this.state.loggedIn}/>
      </div>
    );
  },

  onLoggedIn: function(data) {
    this.setState({
      loggedIn: true
    });
  },

  onLoggedOut: function() {
    this.setState({
      loggedIn: false
    });
  }

});

module.exports = Gallery;
