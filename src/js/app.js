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
// import Login from "./components/LoggedOut/login/Login.js";
// import RegisterUser from "./components/LoggedOut/user/RegisterUser.js";
// import RegisterUsergroup from "./components/LoggedOut/usergroup/RegisterUsergroup.js";

require("../scss/stylesheet.scss");



ReactDOM.render(
<Router history={browserHistory}>
<Route path="/" component={Container} >
    <IndexRoute component={Container} />
     <Route path="/:whatever" component={Container} />

</Route>
{/* <Route path="/registrera-anvandare" component={LoggedOut}/>
<Route path="/registrera-grupp" component={LoggedOut} />
<Route path="/logga-in" component={LoggedOut} /> */}



  </Router>,
document.getElementById('app-container') );
