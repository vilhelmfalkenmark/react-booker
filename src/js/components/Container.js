import React from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./logged_in/LoggedIn.js";
import Dummy from "./logged_in/Dummy.js";
import LoggedOut from "./logged_out/LoggedOut.js";
import Rebase from 're-base';

var base = Rebase.createClass("https://react-booker.firebaseio.com/");
var ref = new Firebase("https://react-booker.firebaseio.com/");

export default class Container extends React.Component {
 constructor() {
  super();
  this.state = {
   loggedIn: false,
   loading: true,
   groups: [],
   user: null,
   userGroup: null,
   groupIndex: null
  }
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
registerUser(newUser,groupID) {
 let currentState = this.state.groups;
  for (var i = 0; i < currentState.length; i++) {
    if(currentState[i].id == groupID) {
    currentState[i].users.push(newUser);
    }
  }
  this.setState({
   groups: currentState
  });
}

registerUsergroup(newGroup) {
 let oldArray = this.state.groups;
 oldArray.push(newGroup);
 this.setState({
  groups: oldArray
 })
}

authenticate(index, user, action) {
if(action) {
 // console.log(index);
 this.setState({
  groupIndex: index,
  user: user
 })
}
else {
 this.setState({
  groupIndex: null,
  user: null
 })
}
}

bookMachine(bookings) {
let groups = this.state.groups;
groups[this.state.groupIndex].bookings = bookings;
this.setState({
 groups: groups
})
}
 render() {
  return (
   <div>
      <LoggedOut
       registerUser = {::this.registerUser}
       registerUsergroup = {::this.registerUsergroup}
       authenticate = {::this.authenticate}
       groups = {this.state.groups}
       />
      {
       // this.state.userGroup != null ? <Dummy group = {this.state.userGroup} user = {this.state.user}/> : ""
      }
      {
       this.state.groupIndex != null ?
       <LoggedIn
        group = {this.state.groups[this.state.groupIndex]}
        user = {this.state.user}
        bookMachine = {::this.bookMachine}
        /> : ""
      }
   </div>
  )
 }
}
