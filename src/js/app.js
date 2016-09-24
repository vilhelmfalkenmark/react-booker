import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory } from "react-router";

import Container from "./components/Container.js";
const reactTarget = document.getElementById('app-container');

import {createStore} from "redux";
import {Provider} from "react-redux";
import store  from "./reducers";




ReactDOM.render(
<Provider store = {store}>
<Router history={browserHistory}>
<Route path="/" component={Container} >
    <IndexRoute component={Container} />
     <Route path="/:view" component={Container} />

</Route>
</Router>
</Provider>, reactTarget );
