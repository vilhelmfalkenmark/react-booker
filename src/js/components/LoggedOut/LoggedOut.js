import React from "react";
import ReactDOM from "react-dom";
import Firebase from "firebase"
import Login from "./login/Login.js";
import RegisterUser from "./user/RegisterUser.js";
import RegisterUsergroup from "./usergroup/RegisterUsergroup.js";

export default class LoggedOut extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  groups: [],
  login: true, // VIEW
  registerUsergroup: false, // VIEW
  registerUser: false // VIEW
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
 render() {
  return (
   <div className="logged-out-container">
    <div className="header-container ">
      <div className="col-3">
       <div className="logo">
         <h2>REACT BOKNINGSAPP</h2>
       </div>
      </div>
      <div className="header-btns-container">
       <button className="log-in-btn" onClick={() => this.handleView("login")}>Logga in</button>
       <button className="create-group-btn" onClick={() => this.handleView("usergroup")}>Skapa förening</button>
       <button className="create-user-btn" onClick={() => this.handleView("user")}>Skapa användare</button>
      </div>
    </div>
    <div className="logged-out-forms-container">
    {
     this.state.login ?  <Login login={::this.logIn}/> :
     this.state.registerUser ? <RegisterUser groups = {this.state.groups} registerUser = {::this.registerUser}/> :
     this.state.registerUsergroup ? <RegisterUsergroup groups = {this.state.groups} registerGroup = {::this.registerGroup}/> :
     ""
    }
    </div>
   </div>
  )
 }
}
