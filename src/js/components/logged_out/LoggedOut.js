import React from "react";
import ReactDOM from "react-dom";
import Rebase from 're-base';
import Login from "./login/Login.js";
import Register_User from "./user/Register_User.js";
import Register_Usergroup from "./usergroup/Register_Usergroup.js";

var ref = new Firebase("https://react-booker.firebaseio.com/");;
var base = Rebase.createClass("https://react-booker.firebaseio.com/");
export default class LoggedOut extends React.Component {
constructor() {
 super();
 this.state = {
  groups: [],
  loading: true,
  login: true, // VIEW
  registerUsergroup: false, // VIEW
  registerUser: false // VIEW
 }
}
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
// END CONSTRUCTOR
registerGroup(newGroup) {
// END NEW GROUP.
let oldArray = this.state.groups;
oldArray.push(newGroup);
this.setState({
 groups: oldArray
})
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

var currentState = this.state.groups;
 for (var i = 0; i < currentState.length; i++) {
   if(currentState[i].id == groupID) {
   currentState[i].users.push(newUser);
   }
 }
 // console.log(currentState);
 this.setState({
  groups: currentState
 });

}

componentDidMount(){
  this.ref = base.syncState('groups', {
    context: this,
    state: 'groups',
    asArray: true,
    then(){
      this.setState({loading: false})
    }
  });
 }
 render() {
  return (
   <div className="logged-out-container">
    <button className="button" onClick={() => this.handleView("login")}>Logga in</button>
    <button className="button" onClick={() => this.handleView("usergroup")}>Skapa förening</button>
    <button className="button" onClick={() => this.handleView("user")}>Skapa användare</button>
    {/*<button onClick={::this.createGroup}>Skapa ny förening!</button>*/}
    {/*{
      this.state.groups.map(function(group) {
      return <Usergroup
       groupName= {group.groupName}
       key= {group.key}
       users = {group.users}
      />;
      }.bind(this))
    }*/}
    {
     this.state.login ?  <Login /> :
     this.state.registerUser ? <Register_User groups = {this.state.groups} registerUser = {::this.registerUser}/> :
     this.state.registerUsergroup ? <Register_Usergroup groups = {this.state.groups} registerGroup = {::this.registerGroup}/> :
     ""
     // this.state.createUser ?   <Register_User groups = {this.state.groups} registerUser = {::this.registerUser}/> : ""
     // this.state.createUsergroup ?   <Register_Usergroup groups = {this.state.groups} registerUser = {::this.registerUser}/> : ""
    }
   </div>
  )
 }
}
