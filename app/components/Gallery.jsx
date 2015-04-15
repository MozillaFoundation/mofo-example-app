var React = require("react");
var MakeGrid = require("./MakeGrid.jsx");
var Logo = require("./Logo.jsx");
var LocalePicker = require("./LocalePicker.jsx");
var WebmakerLoginUX =
  require("webmaker-login-ux/src/adapters/react/WebmakerLoginUX");
var reactga = require("react-ga");
/*
  This GA_TRACKING_ID is a dummy account
  This value would ideally be set at environment level
 */
var GA_TRACKING_ID = "UA-59356678-4";


var Gallery = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: false
    };
  },

  render: function() {
    reactga.initialize(GA_TRACKING_ID);
    // We only have one page for now
    reactga.pageview("/");
    /*
      See https://github.com/adamlofting/react-ga/
      for how to use with react-router
     */

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
