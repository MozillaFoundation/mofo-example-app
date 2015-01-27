var React = require("react");
var Gallery = require("./Gallery.jsx");
var loginServer = "http://localhost:3000";
React.render(<Gallery host={loginServer} />, document.getElementById("app"));
