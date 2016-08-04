import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container.js";
// import LoggedIn from "./components/loggedin/LoggedIn.js";

import {Router, Route, IndexRoute, browserHistory, hashHistory } from "react-router";

require("../scss/stylesheet.scss");

ReactDOM.render(
<Router history={browserHistory}>
      <Route path="/" component ={Container}>
      <IndexRoute component={Container}></IndexRoute>}
      {/*<Route path="calendar" component={LoggedIn} location="history"></Route>*/}
      {/*<Route path="loggedout" component={Settings} location="history"></Route>*/}
      </Route>
  </Router>,
document.getElementById('app') );
