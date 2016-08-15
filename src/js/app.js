import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory } from "react-router";

import Container from "./components/Container.js";

//////////////////////////////////////////
///////// INLOGGAD
//////////////////////////////////////////
import LoggedIn from "./components/LoggedIn/LoggedIn.js";


//////////////////////////////////////////
///////// UTLOGGAD
//////////////////////////////////////////
import LoggedOut from "./components/LoggedOut/LoggedOut.js";
import Login from "./components/LoggedOut/login/Login.js";
import RegisterUser from "./components/LoggedOut/user/RegisterUser.js";
import RegisterUsergroup from "./components/LoggedOut/usergroup/RegisterUsergroup.js";
import Test from "./components/LoggedOut/test.js";

require("../scss/stylesheet.scss");



ReactDOM.render(
<Router history={browserHistory}>
<Route path="/" component={Container} >
    <IndexRoute component={Container} />
</Route>
         {/*<Route path="/" component={LoggedOut} >
            <IndexRoute component={Login} />
            <Route path="/register-user" component={RegisterUser}/>
            <Route path="/register-group" component={RegisterUsergroup} />
            <Route path="/login" component={Login} />
            <Route path="/test" component={Test} />
         </Route>*/}
  </Router>,
document.getElementById('app-container') );
