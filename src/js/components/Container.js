import React from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./LoggedIn/LoggedIn.js";
import Loader from "./Loader.js";
import LoggedOut from "./LoggedOut/LoggedOut.js";
import Rebase from 're-base';

// var base = Rebase.createClass("https://react-laundry-booker.firebaseio.com/");
// var ref = Rebase.createClass("https://react-laundry-booker.firebaseio.com/");

var base = Rebase.createClass("https://react-booker.firebaseio.com/");
var ref = new Firebase("https://react-booker.firebaseio.com/");

export default class Container extends React.Component {
 constructor() {
  super();
  this.state = {
   loggedIn: false,
   loading: true,
   reDirecting: false,
   groups: [],
   user: null,
   userIndex: null,
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
/*###########################################
############################################
        REGISTERA GRUPP & ANVÄNDARE
############################################
############################################*/
registerUser(newUser, groupID) {
    let groups = this.state.groups;
    for (var i = 0; i < groups.length; i++) {
        if (groups[i].id == groupID) {

            if (typeof(groups[i].users[0]) == "string" && groups[i].users.length == 1) {
                groups[i].users.shift(); // Ta bort det tomma värdet eftersom Arrayen nu kommer populeras
                newUser.role = "superadmin";
                newUser.approved = true;
            } else {
                newUser.role = "user";
                newUser.approved = false;
            }
            groups[i].users.push(newUser);
            this.setState({
                groups: groups
            });
            return false;
        }
    }
}

registerUsergroup(newGroup) {
        let groups = this.state.groups;
        groups.push(newGroup);
        this.setState({
            groups: groups
        })
    }
    /*###########################################
    ############################################
                  AUTHENTICATE
    ############################################
    ############################################*/

authenticate(index, userIndex, action) {
    if (action) {
        this.setState({
            groupIndex: index,
            userIndex: userIndex,
            reDirecting: false
        })
    } else {
        this.setState({
            userIndex: null,
            user: null
        })
    }
}
reDirect() {
    this.setState({
        reDirecting: true
    })
}

logOut() {
    ref.unauth();
    this.setState({
        groupIndex: null,
        userIndex: null
    });
}

bookMachine(bookings) {
    let groups = this.state.groups;
    if (bookings.length != 0) {
        groups[this.state.groupIndex].bookings = bookings;
    } else {
        groups[this.state.groupIndex].bookings = [""];
    }
    this.setState({
        groups: groups
    })
}


handleUser(users) {
 let groups = this.state.groups;
 groups[this.state.groupIndex].users = users;
 this.setState({
   groups: groups
 })
}






 render() {
  return (
   <div className="app-container">
      {
       this.state.loading ? <Loader type="Laddar" /> :
       this.state.reDirecting ? <Loader type="Dina uppgifter verifieras" /> : ""
      }
      {
       this.state.groupIndex == null ?
       <LoggedOut
           registerUser = {::this.registerUser}
           registerUsergroup = {::this.registerUsergroup}
           authenticate = {::this.authenticate}
           groups = {this.state.groups}
           logOut = {::this.logOut}
           reDirect = {::this.reDirect}
       /> :
       <LoggedIn
        group = {this.state.groups[this.state.groupIndex]}
        user = {this.state.groups[this.state.groupIndex].users[this.state.userIndex]}
        bookMachine = {::this.bookMachine}
        handleUser = {::this.handleUser}
        logOut = {::this.logOut}
        />
    }
   </div>
  )
 }
}
