import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";

import Firebase from "firebase"
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";

// var children = React.Children.map(this.props.children, function(child) {
//     return React.cloneElement(child, {
//       something: _this.state.something});
// });



export default class LoggedOut extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  groups: []
  // ,
  // login: false, // VIEW
  // registerUsergroup: false, // VIEW
  // registerUser: true // VIEW
 }
}
componentWillReceiveProps() {
this.setState({
 groups: this.props.groups,
})
}
/*###########################################
 ############################################
 VIEWS
 ############################################
 ############################################*/
handleView(view) {
 if(view == "user") {
   this.setState({
   login:false,
   registerUsergroup:false,
   registerUser:true
  })
 }
 else if(view == "usergroup") {
   this.setState({
   login:false,
   registerUsergroup:true,
   registerUser:false
  })
 }
 else if(view == "login") {
   this.setState({
   login:true,
   registerUsergroup:false,
   registerUser:false
  })
 }
}
/*###########################################
 ############################################
 LÄGG TILL EN HELT NY ANVÄNDARGRUPP
 ############################################
 ############################################*/
registerGroup(newGroup) {
this.props.registerUsergroup(newGroup)
}
/*#############################################
###############################################
SKAPA ANVÄNDARE OCH LÄGG TILL I ANVÄNDARGRUPP
###############################################
############################################*/
registerUser(newUser,groupID) {
 firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   console.log(errorCode);
   console.log(errorMessage);
 });
this.props.registerUser(newUser,groupID);
}

/*#############################################
###############################################
LOGGA IN
###############################################
############################################*/
logIn(email,password) {
this.props.logIn(email,password)
}
sayHi() {
 console.log("Hejsan!");
}


 render() {
  console.log(this.props.children);

  const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
      groups: this.state.groups,
      registerUser: this.registerUser,
      registerGroup: this.registerGroup,
      sayHi: this.sayHi
     })
    );



  return (
   <div className="logged-out-container">
    <div className="header-container ">
      <div className="col-3">
       <div className="logo">
         <h2>REACT BOKNINGSAPP</h2>
       </div>
      </div>
      <div className="header-btns-container">

       {/*<Route path="logged-out" component={loggedOut} location="history">
          <Route path="register-user" component={RegisterUser} />
          <Route path="register-group" component={RegisterUsergroup} />
          <Route path="login" component={Login} /*/}


        <Link to="/register-user">Skapa användare</Link>
        <Link to="/register-group">Skapa förening</Link>
        <Link to="/login">Logga in</Link>
        <Link to="/test">TEST</Link>
       <button className="log-in-btn" onClick={() => this.handleView("login")}>Logga in</button>
       <button className="create-group-btn" onClick={() => this.handleView("usergroup")}>Skapa förening</button>
       <button className="create-user-btn" onClick={() => this.handleView("user")}>Skapa användare</button>
      </div>
    </div>
    <div className="logged-out-forms-container">
     {childrenWithProps}

     {/*<Login login={::this.logIn}/>
     <RegisterUser groups = {this.props.groups} registerUser = {::this.registerUser}/>
     <RegisterUsergroup groups = {this.state.groups} registerGroup = {::this.registerGroup}/>*/}
    {
     // this.state.login ?  <Login login={::this.logIn}/> :
     // this.state.registerUser ? <RegisterUser groups = {this.props.groups} registerUser = {::this.registerUser}/> :
     // this.state.registerUsergroup ? <RegisterUsergroup groups = {this.state.groups} registerGroup = {::this.registerGroup}/> :
     // ""
    }
    </div>
   </div>
  )
 }
}
