import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";

import Firebase from "firebase"
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";
import Alert from "./Alert.js";

// var children = React.Children.map(this.props.children, function(child) {
//     return React.cloneElement(child, {
//       something: _this.state.something});
// });

export default class LoggedOut extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  groups: [] ,
  alert: false,
  alertType: "",
  alertData: false,
  login: false, // VIEW
  registerUsergroup: false, // VIEW
  registerUser: true // VIEW
 }
}
componentWillReceiveProps() {
this.setState({
 groups: this.props.groups,
})
}
//////////////////////////////////////////
///////// VIEWS
//////////////////////////////////////////
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
//////////////////////////////////////////
///////// LÄGG TILL EN HELT
///////// NY ANVÄNDARGRUPP
//////////////////////////////////////////
registerGroup(newGroup) {
this.props.registerUsergroup(newGroup)
}
//////////////////////////////////////////
///////// SKAPA ANVÄNDARE OCH
///////// LÄGG TILL I ANVÄNDARGRUPP
//////////////////////////////////////////
registerUser(newUser,groupID) {
if(groupID == "") {
 return false;
}
var component = this;
 firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   console.log(groupID);
   if(errorCode || errorMessage) {

    component.setState({
     alert: true,
     alertType: "fail-user",
     alertData: errorCode
    })
    return false;
   }

 });
this.props.registerUser(newUser,groupID);
}
//////////////////////////////////////////
///////// LOGGA IN
//////////////////////////////////////////
logIn(email,password) {
 this.props.logIn(email,password);
};
toggleMenu(state) {
 this.props.toggleMenu(state)
}
//////////////////////////////////////////
///////// ALERT
//////////////////////////////////////////
alert(state,type,data) {
 this.setState({
  alert: state,
  alertType: type,
  alertData: data
 })
}

 render() {
  // var component = this;
  //
  //  const childrenWithProps = React.Children.map(this.props.children,
  //    (child) => React.cloneElement(child, {
  //     groups: this.state.groups,
  //     registerUser: this.registerUser,
  //     registerGroup: this.registerGroup,
  //     logIn: this.logIn,
  //     sayHi: this.sayHi
  //    })
  //   );



  return (
   <div className="logged-out-container">
    {
     this.state.alert ? <Alert
     type = {this.state.alertType}
     data = {this.state.alertData}
     alert = {::this.alert}
     /> : null
    }
    <header className="header-container">
     <div className={this.props.menuOpen ? "hamburger-container open":"hamburger-container"} onClick={() => this.toggleMenu(this.props.menuOpen)}>
       <div className="hamburger-inner-container">
         <div className="hamburger"></div>
      </div>
     </div>

     <div className={this.props.menuOpen ? "header-inner-container open":"header-inner-container"}>
     <div className="header-logo-container">
      <div className="header-logo-inner-container">
       <h1 className="app-header">React Bokningsapp</h1>
      </div>
    </div>

     <div className="header-btns-container">
      <button className="log-in-btn" onClick={() => this.handleView("login")}>Logga in</button>
      <button className="create-group-btn" onClick={() => this.handleView("usergroup")}>Skapa förening</button>
      <button className="create-user-btn" onClick={() => this.handleView("user")}>Skapa användare</button>
     </div>
     </div>
     </header>


    <div className={this.props.menuOpen ? "logged-out-forms-container open":"logged-out-forms-container"}>
     {/*{childrenWithProps}*/}
    {
     this.state.login ?  <Login logIn={::this.logIn} credentials = {this.props.credentials}/> :
     this.state.registerUser ?
     <RegisterUser
     groups = {this.props.groups}
     registerUser = {::this.registerUser}
     alert = {::this.alert}/> :
     this.state.registerUsergroup ?
     <RegisterUsergroup
     groups = {this.state.groups}
     registerGroup = {::this.registerGroup}
     alert = {::this.alert}
     /> :
     null
    }
    </div>
   </div>
  )
 }
}
