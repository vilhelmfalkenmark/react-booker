import React from "react";
import LoggedIn from "./LoggedIn/LoggedIn.js";
import Loader from "./Loader.js";
import LoggedOut from "./LoggedOut/LoggedOut.js";
import Help from "./Help.js";
import Rebase from 're-base';
import Firebase from "firebase"
if(location.host.indexOf("localhost") != -1){
// DEV
var base = Rebase.createClass("https://react-laundry-booker.firebaseio.com");
var config = {
  apiKey: "AIzaSyAo-ZnaPl7PrGDCvwQROxzZr5ffTNeQwbY",
  authDomain: "react-laundry-booker.firebaseapp.com",
  databaseURL: "https://react-laundry-booker.firebaseio.com",
  storageBucket: "react-laundry-booker.appspot.com",
};
} else {
 // PROD
 var base = Rebase.createClass("https://tvattstuge-bokaren.firebaseio.com");
 var config = {
   apiKey: "AIzaSyAgIocH5tanjTlTjJBXv8s2VBE61sn3Bzk",
   authDomain: "tvattstuge-bokaren.firebaseapp.com",
   databaseURL: "https://tvattstuge-bokaren.firebaseio.com",
   storageBucket: "tvattstuge-bokaren.appspot.com",
   messagingSenderId: "341927506280"
 };
}
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
   credentials: true, // När man försöker logga in
   userBanned: false,
   resetPasswordSent: false,
   userDeleted: false,
   help: false
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
 delete newUser.password; // Vi vill inte spara lösenordet i objektet.
  var component = this;
  let groups = this.state.groups;
  for (var i = 0; i < groups.length; i++) {
      if (groups[i].id == groupID) {
          if (typeof(groups[i].users[0]) == "string" && groups[i].users.length == 1) {
              groups[i].users.shift(); // Ta bort det tomma värdet eftersom Arrayen nu kommer populeras
              newUser.role = "superadmin";
              newUser.approved = true;
          } else {
              newUser.role = "user";
              newUser.approved = true;
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
     let groups = this.state.groups;
     groups[this.state.groupIndex].users = users;
     this.setState({
       groups: groups
     })
}
//////////////////////////////////////////////
//////// KOLLA OM NÅGON ÄR INLOGGAD
/////////////////////////////////////////////
componentDidUpdate() {
  if (this.state.groups.length > 0 && this.state.checkAuth == false) {
   var component = this;
   function authDataCallback(authData) {
    let groups = component.state.groups;
      // console.log(authData.email+" är inloggad");
       for (var i = 0; i < groups.length; i++) {
        for (var j = 0; j < groups[i].users.length; j++) {
         if(typeof(groups[i].users[j]) === "object") {
          if(groups[i].users[j].email == authData.email)
          {
           if(groups[i].users[j].approved) {
            component.authenticate(i, j, true);
           } else {
            component.setState({
             userBanned: true
            })
            component.logOut();
           }
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
       // console.log("ingen är inloggad");
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
  var component = this;
  component.loading(true);
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     if(errorCode) {
      component.setState({
       credentials: false,
       loading: false
      })
     }
   });
}
//////////////////////////////////////////
///////// ÅTERSTÄLL LÖSENORD
//////////////////////////////////////////
resetPassword(email) {
 var auth = firebase.auth();
 var emailAddress = "vilhelmfalkenmark@gmail.com";
 var component = this;

 auth.sendPasswordResetEmail(emailAddress).then(function() {
   // Email sent.
   console.log("Email sent!");
   component.setState({
    resetPasswordSent: true
   })
 }, function(error) {
   alert("Ett fel uppstod. Vänligen försök igen")
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
            user: null,
            loading: false
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
updateMe(info,name) {
var component = this;
let groups = this.state.groups;
   if(info != "delete") {
    groups[this.state.groupIndex].users[this.state.userIndex].info = info;
    groups[this.state.groupIndex].users[this.state.userIndex].name = name;
   }
   else {
    // GÖR FÖRSTA BÄSTA TILL SUPERADMIN OM DET SKULLE VARA SÅ
    // ATT SUPERADMIN RADERAS SITT KONTO
    if(groups[this.state.groupIndex].users[this.state.userIndex].role == "superadmin")
    groups[this.state.groupIndex].users.map(function(user) {
    if(user.role == "admin") {
     user.role = "superadmin";
     return false;
    }
    });
    // RADERA UR FIREBASE
    var user = firebase.auth().currentUser;
    user.delete().then(function() {
     component.setState({
      userDeleted: true
     })
    }, function(error) {
      // An error happened.
    });
    // RADERA UR DATAN
     groups[this.state.groupIndex].users.splice(this.state.userIndex,1);
     // LOGGA UT
     component.logOut();
   }
    component.setState({
        groups: groups
    })
}
// UPPDATERA ALLMÄN INFORMATION
updateGroup(groupName,maxBookings,weeks) {
  let groups = this.state.groups;
      groups[this.state.groupIndex].groupName = groupName;
      groups[this.state.groupIndex].maxBookings = maxBookings;
      groups[this.state.groupIndex].weeks = weeks;

  this.setState({
      groups: groups
  })
}
// SPARA MASKINER
saveMachines(machines) {
  let groups = this.state.groups;
      groups[this.state.groupIndex].machines = machines;

  this.setState({
      groups: groups,
      updatedData: false
  })
}
// SPARA TIDER
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
//////////////////////////////////////////////
////////  HJÄLP-MODAL
/////////////////////////////////////////////
toggleHelp(state) { // MENUTOGGLE I MOBILLÄGE
 this.setState({
  help: state
 })
}
//////////////////////////////////////////
///////// RENDER
//////////////////////////////////////////
 render() {
  const { groups, help, menuOpen, credentials, userBanned,
   resetPasswordSent, userDeleted, groupIndex, userIndex  } = this.state;
  return (
   <div className={this.state.menuOpen ? "locked" : null}>
      {
      this.state.loading ? <Loader type="Laddar" /> :
      this.state.groupIndex == null ?
       <LoggedOut
           // STATE
           menuOpen = {menuOpen}
           groups = {groups}
           credentials = {credentials}
           userBanned = {userBanned}
           resetPasswordSent = {resetPasswordSent}
           userDeleted={userDeleted}
           // FUNKTIONER
           registerUser = {::this.registerUser}
           registerUsergroup = {::this.registerUsergroup}
           authenticate = {::this.authenticate}
           logOut = {::this.logOut}
           logIn = {::this.logIn}
           loading = {::this.loading}
           toggleMenu = {::this.toggleMenu}
           toggleHelp = {::this.toggleHelp}
           resetPassword = {::this.resetPassword}
       /> :
       <LoggedIn
        // STATE
        group = {groups[groupIndex]}
        bookings = {groups[groupIndex].bookings}
        user = {groups[groupIndex].users[userIndex]}
        help = {help}
        menuOpen = {menuOpen}
        // FUNKTIONER
        bookMachine = {::this.bookMachine}
        handleUser = {::this.handleUser}
        logOut = {::this.logOut}
        saveMachines = {::this.saveMachines}
        saveTimes = {::this.saveTimes}
        toggleMenu = {::this.toggleMenu}
        toggleHelp = {::this.toggleHelp}
        updateGroup = {::this.updateGroup}
        updateMe = {::this.updateMe}
        />
    }
    {
     this.state.help ? <Help
     toggleHelp = {::this.toggleHelp}
     /> : null
    }
   </div>
  )
 }
}
