import React from "react";
import ReactDOM from "react-dom";
import Rebase from 're-base';
import Usergroup from "./usergroup/Usergroup.js";
import Login from "./forms/Login.js";
import Register_User from "./forms/Register_User.js";


var ref = new Firebase("https://react-booker.firebaseio.com/");;
var base = Rebase.createClass("https://react-booker.firebaseio.com/");

export default class Logged_Out_Container extends React.Component {
constructor() {
 super();
 this.state = {
  groups: [],
  loading: true
 }
}
// END CONSTRUCTOR
createGroup() {
 let newGroup = {
  groupName: "Körsbärsvägens bostadsrättsföreing",
  times: ["6-10","10-14","14-18","18-22"],
  machines: ["tvättmaskin","torktumlare","mangel"],
  key: Date.now(),
  id: Date.now(),
/*###########################################
############################################
USERS
############################################
############################################*/
  users: [
   {
    id: 14,
    key: 14,
    role: "admin",
    name: "vilhelm falkenmark",
    email: "vilhelm@hej.se",
    additionalInfo: "lägenhet 4",
    bookings: 0
   }
  ],
/*###########################################
############################################
BOOKINGS
############################################
############################################*/
  bookings: [
   {
    "booked" : true,
    "bookedBy" : {
      "additionalInfo" : "lägenhet 4",
      "bookings" : 4,
      "id" : 14,
      "name" : "vilhelm@hej.se"
    },
    "date" : 12,
    "dateformat" : "12062016",
    "dayname" : "söndag",
    "id" : 120620166100,
    "interval" : "6-10",
    "key" : 120620166100,
    "machine" : "tvättmaskin",
    "month" : "juni"
  }
  ]
}
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
registerUser(newUser,groupName) {





/* ÄNDRA STATE */
let currentState = this.state.groups;
for (var i = 0; i < currentState.length; i++) {
if(currentState[i].groupName == groupName) {
currentState[i].users.push(newUser);
}
}
this.setState({
 groups: currentState
})
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
        break;
      case "INVALID_EMAIL":
        console.log("The specified email is not a valid email.");
        break;
      default:
        console.log("Error creating user:", error);
    }
  }
  else {
    console.log("Successfully created user account with uid:", userData.uid);
  }
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
    <button onClick={::this.createGroup}>Skapa ny förening!</button>
    {
      this.state.groups.map(function(group) {
      return <Usergroup
       groupName= {group.groupName}
       key= {group.key}
       users = {group.users}
      />;
      }.bind(this))
    }
    <Login />
    <Register_User groups = {this.state.groups} registerUser = {::this.registerUser}/>
   </div>
  )
 }
}
