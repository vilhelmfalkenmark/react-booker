import React from "react";
import ReactDOM from "react-dom";
import User from "./User.js";

export default class Usergroup extends React.Component {

 constructor() {
  super();
 }

createUser() {

// let newUser = new Object();
// newUser.email = "hans@hej.se";
// newUser.password = "abc";
// newUser.name = "hans larsson";
// newUser.role = "user";
// newUser.additionalInfo = "lägenhet 5";
// newUser.bookings = 0;
// newUser.id = Date.now();
// newUser.key = Date.now();
//
// this.props.createUser(newUser, this.props.groupName);
}

 render() {
  return (
   <div className="usergroup-container">
    <p>{this.props.groupName}</p>
    <button onClick={::this.createUser}>Skapa ny användare på grupp</button>
     {
       this.props.users.map(function(user) {
       return <User
       user = {user}
       key = {user.id}
        />;


       }.bind(this))
     }
   </div>
  )
 }
}
