import React from "react";
import ReactDOM from "react-dom";
import Firebase from "firebase"
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";
import Alert from "./Alert.js";

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
  registerUser: false, // VIEW
  cookie: false,
  registerUserError: false,
 }
}
componentWillReceiveProps() {
this.setState({
 groups: this.props.groups,
})

}
componentDidMount() {
var location = window.location.pathname;
if(location == "/skapa-anvandare") {
  this.setState({
  login:false,
  registerUsergroup:false,
  registerUser:true
 })
}
else if(location == "/skapa-grupp") {
  this.setState({
  login:false,
  registerUsergroup:true,
  registerUser:false
 })
}
else {
  this.setState({
  login:true,
  registerUsergroup:false,
  registerUser:false
 })
}
//////////////////////////////////////////
///////// SET COOKIE
//////////////////////////////////////////
var cookies = document.cookie.split(';');
var component = this;
if(cookies.length > 0) {
 cookies.map(function(cookie) {
 if(cookie.indexOf("groupID") != -1 ) {
  var res = cookie.split("=");
  component.setState({
   cookie: res[1]
  })
 }
 });
}
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
else if(view == "usergroup" ) {
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

var d = new Date();
d.setTime(d.getTime() + (24*60*60*1000));
var expires = "expires="+ d.toUTCString();
document.cookie ="groupID="+ newGroup.id + ";" + expires;
this.setState({
cookie: newGroup.id
})
}
//////////////////////////////////////////
///////// SKAPA ANVÄNDARE OCH
///////// LÄGG TILL I ANVÄNDARGRUPP
//////////////////////////////////////////
registerUser(newUser,groupID) {
var component = this;
 firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
   var errorCode = error.code;
   var errorMessage = error.message;
   if(errorCode || errorMessage) {
    console.log(errorCode);
    console.log(errorMessage);
    component.setState({
     alert: true,
     alertType: "fail-user",
     alertData: errorCode,
     registerUserError: true
    })
   }
 });
 component.props.registerUser(newUser,groupID);

document.cookie = "groupID=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
///////// ÅTERSTÄLL LÖSENORD
//////////////////////////////////////////
resetPassword(email) {
 this.props.resetPassword(email);
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
    {
     this.state.cookie ? <div className="cookie-container">
     <p>Du har precis skapat en grupp med id {this.state.cookie}.</p>
     <p>Skapa nu en användare och logga in på den gruppen.</p>
     </div>
    : null
    }
     <div className="header-btns-container">
      <div className="log-in-btn" onClick={() => this.handleView("login")}>Logga in <i className="flaticon-exit"></i></div>
      <div className="create-group-btn" onClick={() => this.handleView("usergroup")}>Skapa grupp <i className="flaticon-controls"></i> </div>
      <div className="create-user-btn" onClick={() => this.handleView("user")}>Skapa användare <i className="flaticon-user"></i></div>
     </div>
     </div>
     </header>

    <div className={this.props.menuOpen ? "logged-out-forms-container open":"logged-out-forms-container"}>
    {
     this.state.login ?  <Login
     logIn={::this.logIn}
     credentials = {this.props.credentials}
     userBanned = {this.props.userBanned}
     resetPassword = {::this.resetPassword}
     userDeleted = {this.props.userDeleted}
     /> :
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
