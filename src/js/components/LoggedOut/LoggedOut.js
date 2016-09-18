import React from "react";
import Firebase from "firebase"
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";
import Alert from "./Alert.js";
import Footer from "../Footer.js";
import CookieInfo from "./CookieInfo.js";

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
  cookieInfo: false, // Den här sidan använder cookies
  registerUserError: false,
  linkedID: ""
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
///////// SÄTT KAKOR
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
if(cookies[0] == "") {
 this.setState({
  cookieInfo: true
 })
}
}
setCookie() {
 var d = new Date();
 d.setTime(d.getTime() + (365*24*60*60*1000));
 var expires = "expires="+ d.toUTCString();
 document.cookie ="approvedCookies=true;" + expires;
 this.setState({
  cookieInfo: false
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
d.setTime(d.getTime() + (72*60*60*1000));
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
firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(function(user) {
component.props.loading(true);
component.props.registerUser(newUser,groupID)

}, function(error) {
 var errorCode = error.code;
 var errorMessage = error.message;
  component.setState({
   alert: true,
   alertType: "fail-user",
   alertData: errorCode,
   registerUserError: true
  })
});
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
userLink(groupID) {
this.setState({
 linkedID: groupID,
 registerUser: true,
 registerUsergroup: false,
 alert: false,
 alertType: "",
 alertData: false
})
}
logOut() {
 this.props.logOut();
}
toggleHelp(state) {
this.props.toggleHelp(state);
}


 render() {
  return (
   <div className="logged-out-container">
    {
     this.state.alert ? <Alert
     type = {this.state.alertType}
     data = {this.state.alertData}
     alert = {::this.alert}
     userLink = {::this.userLink}
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
      <h1><i className="flaticon-washing-machine-for-laundry"></i>Tvättstugebokaren</h1>
      {/* <div className="header-logo-inner-container"></div> */}

    </div>
    {
     this.state.cookie ? <div className="cookie-container">
     <h3 className="padding-warning">Du har precis skapat en grupp med id {this.state.cookie}.</h3>
     </div>
    : null
    }
     <div className="header-btns-container">
      <button className="log-in-btn" onClick={() => this.handleView("login")}><i className="flaticon-exit"></i>Logga in </button>
      <button className="create-group-btn" onClick={() => this.handleView("usergroup")}><i className="flaticon-controls"></i> Skapa grupp </button>
      <button className="create-user-btn" onClick={() => this.handleView("user")}><i className="flaticon-user"></i>Skapa användare </button>
      <button className="header-help-btn" onClick={::this.toggleHelp}><i className="flaticon-question"></i>Hjälp</button>
     </div>
     </div>
     </header>

    <main className={this.props.menuOpen ? "logged-out-forms-container open fixed":"logged-out-forms-container"}>
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
     linkedID = {this.state.linkedID} // The linkedID from creategroup VIEW
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
    </main>
    {
     this.state.cookieInfo ?
     <CookieInfo
      setCookie = {::this.setCookie}
      />
    : null
    }
    <Footer
     toggleHelp = {::this.toggleHelp}
     />
   </div>
  )
 }
}
