import React from "react";
import ReactDOM from "react-dom";
import Rebase from 're-base';
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";

var ref = new Firebase("https://react-booker.firebaseio.com/");
// var base = Rebase.createClass("https://react-booker.firebaseio.com/");

export default class LoggedOut extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  checkAuth: false, // För att vi ska kunna kolla om det är verifierat att någon är inloggad
  groups: [],
  loading: true,
  login: true, // VIEW
  registerUsergroup: false, // VIEW
  registerUser: false // VIEW
 }
}
componentWillReceiveProps() {
this.setState({
 groups: this.props.groups,
 loading: false
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
/* SKAPA ANVÄNDARE I FIREBASE */
ref.createUser({
  email: newUser.email,
  password: newUser.password
}, function(error, userData) {
  if (error)
  {
    switch (error.code)
    {
      case "EMAIL_TAKEN":
        console.log("The new user account cannot be created because the email is already in use.");
        return;
        break;
      case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        return;
        break;
      default:
        console.log("Error creating user:", error);
    }
  }
  else {
    console.log("Successfully created user account with uid:", userData.uid);
    // success();
  }
});
this.props.registerUser(newUser,groupID);
}
/*#############################################
###############################################
LOGGA IN
###############################################
############################################*/
login(email,password) {

this.props.reDirect();

let groups = this.state.groups;
// Create a callback to handle the result of the authentication
let component = this;
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    for (var i = 0; i < groups.length; i++) {
     for (var j = 0; j < groups[i].users.length; j++) {
      if(typeof(groups[i].users[j]) === "object") {
       if(groups[i].users[j].email == email)

        component.props.authenticate(i, groups[i].users[j], true);
      }
     }
    }
  }
}
// Or with an email/password combination
ref.authWithPassword({
  email    : email,
  password : password
}, authHandler);

}
/*#############################################
###############################################
KOLLA VEM?(TILLFÄLLIG)
###############################################
############################################*/

componentDidUpdate() {
if (this.state.groups.length > 0 && this.state.checkAuth == false) {
 var component = this;
 function authDataCallback(authData) {
  let groups = component.state.groups;
   if (authData) { // INLOGGAD
     console.log("Någon är inloggad");
     for (var i = 0; i < groups.length; i++) {
      for (var j = 0; j < groups[i].users.length; j++) {
       if(typeof(groups[i].users[j]) === "object") {
        if(groups[i].users[j].email == authData.password.email)
        {
         // console.log("kommer in här!");
         component.props.authenticate(i, groups[i].users[j], true);
         return false;
        }
       }
      }
     }
   } else { // EJ INLOGGAD
    console.log("Ingen är inloggad");
   }
 }
 ref.onAuth(authDataCallback);
 this.setState({
  checkAuth: true
 })
}
}
 render() {
  return (
   <div className="logged-out-container">
    <button className="button" onClick={() => this.handleView("login")}>Logga in</button>
    <button className="button" onClick={() => this.handleView("usergroup")}>Skapa förening</button>
    <button className="button" onClick={() => this.handleView("user")}>Skapa användare</button>
    {
     this.state.login ?  <Login login={::this.login}/> :
     this.state.registerUser ? <RegisterUser groups = {this.state.groups} registerUser = {::this.registerUser}/> :
     this.state.registerUsergroup ? <RegisterUsergroup groups = {this.state.groups} registerGroup = {::this.registerGroup}/> :
     ""
    }
   </div>
  )
 }
}
