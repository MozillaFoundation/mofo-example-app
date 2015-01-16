var React = require('react');
var LogoType = require('./LogoType.jsx');
var I18N = require('../../mixins/I18N');

/**
 * In order for this component to truly shine, webmaker-login-UX should be a node
 * module that does "the right thing" without being strictly tied to a DOM. That way,
 * the component can have buttons point to {this.login} and have the component
 * contain a handler like:
 *
 * login: function(evt) {
 *   webmakerloginxux.doSomething();
 * }
 *
 */
var WebmakerLoginUX = React.createClass({

  mixins: [I18N],

  getInitialState: function() {
    return {
      strings: {
        join: "Join Webmaker",
        signIn: "Sign in",
        signOut: "Sign out"
      }
    };
  },

  render: function() {
    var btnClass = "btn btn-primary";
    return (
      <div className="webmaker-login-ux component">
        <LogoType product="example app" />
        <span className="controls">
          <button className={btnClass} onClick={this.joinWebmaker}>{this.state.strings.join}</button>
          <button className={btnClass} onClick={this.signIn}>{this.state.strings.signIn}</button>
          <button className={btnClass} onClick={this.signOut}>{this.state.strings.signOut}</button>
        </span>
      </div>
    );
  },

  joinWebmaker: function() {
    // webmakerLoginUX.join
  },

  signIn: function() {
    // webmakerLoginUX.signIn
  },

  signOut: function() {
    // webmakerLoginUX.signOut
  }

});

module.exports = WebmakerLoginUX;