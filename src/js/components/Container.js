import React from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./LoggedIn/LoggedIn.js";
import Loader from "./Loader.js";
import LoggedOut from "./LoggedOut/LoggedOut.js";
import Rebase from 're-base';
import Firebase from "firebase"
var base = Rebase.createClass("https://react-laundry-booker.firebaseio.com");

var config = {
  apiKey: "AIzaSyAo-ZnaPl7PrGDCvwQROxzZr5ffTNeQwbY",
  authDomain: "react-laundry-booker.firebaseapp.com",
  databaseURL: "https://react-laundry-booker.firebaseio.com",
  storageBucket: "react-laundry-booker.appspot.com",
};
firebase.initializeApp(config);

export default class Container extends React.Component {
 constructor() {
  super();
  this.state = {
   loggedIn: false,
   loading: true,
   groups: [],
   user: null,
   userIndex: null,
   groupIndex: null,
   checkAuth: false,
   updatedData: false,
   menuOpen: false,
   credentials: true // När man försöker logga in
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
//////////////////////////////////////////
///////// REGISTERA GRUPP & ANVÄNDARE
//////////////////////////////////////////
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

handleUser(users) {
 console.log("handleUser kallad");
     let groups = this.state.groups;
     groups[this.state.groupIndex].users = users;
     this.setState({
       groups: groups
     })
}
/*###########################################
############################################
            AUTHENTICATION
############################################
############################################*/

//////////////////////////////////////////////
//////// KOLLA OM NÅGON ÄR INLOGGAD
/////////////////////////////////////////////
componentDidUpdate() {
  if (this.state.groups.length > 0 && this.state.checkAuth == false) {
   var component = this;
   function authDataCallback(authData) {
    let groups = component.state.groups;
      console.log(authData.email+" är inloggad");
       for (var i = 0; i < groups.length; i++) {
        for (var j = 0; j < groups[i].users.length; j++) {
         if(typeof(groups[i].users[j]) === "object") {
          if(groups[i].users[j].email == authData.email)
          {
           component.authenticate(i, j, true);
           return false;
          }
         }
        }
       }
   }
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       authDataCallback(user)
     } else {
       console.log("ingen är inloggad");
     }
   });
   this.setState({
    checkAuth: true
   })
  }
}

//////////////////////////////////////////////
//////// LOGGA IN
/////////////////////////////////////////////
logIn(email, password) {
  // console.log(email);
  console.log("login kallad");
  var component = this;
  component.loading(true);
   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {

     var errorCode = error.code;
     var errorMessage = error.message;
     if(errorCode = false) {

       let groups = this.state.groups;
           for (var i = 0; i < groups.length; i++) {
            for (var j = 0; j < groups[i].users.length; j++) {
             if(typeof(groups[i].users[j]) === "object") {
              if(groups[i].users[j].email == email)
               component.authenticate(i, j, true);
               component.loading(false);
               return false;
             }
            }
           }
     }
     else {
       console.log(errorMessage);
       component.setState({
        credentials: false,
        loading: false
       })
     }
   });
}
//////////////////////////////////////////////
//////// LOGGA UT
/////////////////////////////////////////////
logOut() {
  var component = this;
  this.setState({
  loading: true
  })
  firebase.auth().signOut().then(function() {
    console.log('Utloggad!');
    component.setState({
        groupIndex: null,
        userIndex: null,
        loading: false
    });
    }, function(error) {
    console.error('Sign Out Error', error);
    });
}

authenticate(index, userIndex, action) {
  console.log("authenticate kallad");
    if (action) {
        this.setState({
            groupIndex: index,
            userIndex: userIndex,
            loading: false,
            credentials: true
        })
    } else {
        this.setState({
            userIndex: null,
            user: null
        })
    }
}
loading(type) {
    this.setState({
        loading: type
    })
}
//////////////////////////////////////////////
//////// BOKA MASKIN
/////////////////////////////////////////////
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
//////////////////////////////////////////////
//////// ADMIN
/////////////////////////////////////////////
// SPARA MASKINER
saveMachines(machines) {
  let groups = this.state.groups;
      groups[this.state.groupIndex].machines = machines;

  this.setState({
      groups: groups,
      updatedData: false
  })
  // console.log(this.state.groups);
}
// SPARA MASKINER
saveTimes(times) {
  let groups = this.state.groups;
      groups[this.state.groupIndex].times = times;

  this.setState({
      groups: groups,
      updatedData: false
  })
}
//////////////////////////////////////////////
//////// TOGGLA MENY I MOBILLÄGE
/////////////////////////////////////////////
toggleMenu(state) { // MENUTOGGLE I MOBILLÄGE
 this.setState({
  menuOpen: !state
 })
}

//////////////////////////////////////////
///////// RENDER
//////////////////////////////////////////
 render() {
  return (
   <div className="">
      {
      this.state.loading ? <Loader type="Laddar" /> :
      this.state.groupIndex == null ?
       <LoggedOut
           registerUser = {::this.registerUser}
           registerUsergroup = {::this.registerUsergroup}
           authenticate = {::this.authenticate}
           groups = {this.state.groups}
           logOut = {::this.logOut}
           logIn = {::this.logIn}
           menuOpen = {this.state.menuOpen}
           toggleMenu = {::this.toggleMenu}
           credentials = {this.state.credentials}
       /> :
       <LoggedIn
        group = {this.state.groups[this.state.groupIndex]}
        user = {this.state.groups[this.state.groupIndex].users[this.state.userIndex]}
        bookMachine = {::this.bookMachine}
        handleUser = {::this.handleUser}
        logOut = {::this.logOut}
        saveMachines = {::this.saveMachines}
        saveTimes = {::this.saveTimes}
        menuOpen = {this.state.menuOpen}
        toggleMenu = {::this.toggleMenu}
        />
    }
   </div>
  )
 }
}
