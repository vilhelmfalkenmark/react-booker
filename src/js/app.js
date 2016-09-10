import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory } from "react-router";

import Container from "./components/Container.js";
import LoggedIn from "./components/LoggedIn/LoggedIn.js";
import LoggedOut from "./components/LoggedOut/LoggedOut.js";

ReactDOM.render(
<Router history={browserHistory}>
<Route path="/" component={Container} >
    <IndexRoute component={Container} />
     <Route path="/:view" component={Container} />

</Route>
</Router>,
document.getElementById('app-container') );
