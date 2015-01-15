var React = require('react');

var WebmakerLoginUX = React.createClass({

  getInitialState: function() {
    return {
      joinLabel: "Join Webmaker",
      signInLabel: "Sign in",
      signOutLabel: "Sign out"
    };
  },

  render: function() {
    return (
      <div className="webmaker-login-ux component">
        <button onClick={this.joinWebmaker}>{this.state.joinLabel}</button>
        <button onClick={this.signIn}>{this.state.signInLabel}</button>
        <button onClick={this.signOut}>{this.state.signOutLabel}</button>
      </div>
    );
  }

});

module.exports = WebmakerLoginUX;