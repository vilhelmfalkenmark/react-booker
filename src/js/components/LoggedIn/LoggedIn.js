import React from "react";
import Calendar from "./calendar/Calendar.js";
import Bookings from "./mybookings/Bookings.js";
import Header from "./header/Header.js";
import Admin from "./admin/Admin.js";
import Warning from "./warning/Warning.js";
import Footer from "../Footer.js";

export default class LoggedIn extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 bookingsModal: false,
 bookings: props.group.bookings,
 adminModal: false,
 user: props.user,
 bookingsExist: false, // För att vi ska kunna loopa ut flera bokningar utan att få errors i Bookings.js komponenenterna.
 checkedOldBookings: false, // Varje gång någon loggar in på en förening så ska gårdagens bokningar raderas.
 warningOpen: false, // Varningsmeddelandet som kommer om man försöker boka fler än man får
 week: 1,
 maxWeek: props.group.weeks
 };
}
componentDidMount() {
//////////////////////////////////////////
///////// URL
//////////////////////////////////////////
 let groupURL = "/"+encodeURIComponent(this.props.group.groupName).toLowerCase();
groupURL = groupURL.replace(/!/g,'').replace(/%20/g,'-').replace(/%c3%a5/g,'a').replace(/%c3%a4/g,'a').replace(/%c3%b6/g,'o');
groupURL = groupURL.split('.').join("");
window.history.pushState("object or string", "Title", groupURL);
///////////////////////////////////////////////////////////////
//// RADERA TIDIGARE DAGARS BOKNINGAR OCH UPPDATERA ANVÄNDARE
//////////////////////////////////////////////////////////////
  let todaysDate = new Date(new Date());
  var today = new Object();
  today.day = todaysDate.getDate();
  today.month = todaysDate.getMonth()+1;
  today.year = 1900+todaysDate.getYear();
  let bookings = [];
  let users = this.props.group.users;
  // console.log(users);
  if(this.props.group.bookings.length > 0 && typeof(this.props.group.bookings[0]) != "string") {
    this.props.group.bookings.map(function(booking) {
    // Bokningar samma månad
    if(booking.dateObject.day >= today.day && booking.dateObject.month == today.month && booking.dateObject.year == today.year) {
    bookings.push(booking);
    }
    //Bokning vid månadsskifte
    else if( booking.dateObject.month > today.month   && today.year == booking.dateObject.year) {
      bookings.push(booking);
    }
    // Bokning vid årsskifte
    else if(booking.dateObject.year > today.year ) {
      bookings.push(booking);
    }
    // Inaktuella bokningar som inte ska komma med, därav ska bokningar subtraheras
    else { // TODO VERIFIERA ATT DEN HÄR FAKTISKT FUNKAR MED RIKTIGA BOKNINGAR FRÅN IGÅR.
    for (var i = 0; i < users.length; i++) {
      if(booking.bookedBy.id == users[i].id) {
        users[i].bookings--;
      }
    }
    }
    })
    this.props.handleUser(users);
    this.props.bookMachine(bookings);
  }
}
//////////////////////////////////////////
//// TOGGLA VECKA
//////////////////////////////////////////
toggleWeek(int) {
 this.setState({
  week: this.state.week+=int
 })
}
toggleModal(type) {
if(type == "bookings") {
 this.setState({
  bookingsModal: !this.state.bookingsModal
 })
}
else if(type=="admin") {
 this.setState({
  adminModal: !this.state.adminModal
 })
}
}
//////////////////////////////////////////////////////
//// FUNKTION FÖR ATT TA BORT OCH LÄGGA TILL BOKNING
/////////////////////////////////////////////////////
bookMachine(userID, booked, booking) {
let group = this.props.group;
let bookings = group.bookings;
var user = this.props.user;
var users = this.props.group.users;
//////////////////////////////////////////////////////
//// LÄGG TILL BOKNING
/////////////////////////////////////////////////////
if (booked == false) {

 if(bookings[0] == "") {
 bookings.shift();
 }
 if(typeof(group.maxBookings) == "number") {
   if(user.bookings >= group.maxBookings ) {
      this.setState({
       warningOpen: true
       })
     return false;
   }
 }
 user.bookings++;
 let newBooking = booking;
 newBooking.bookedBy = user;
 bookings.push(newBooking);

}
//////////////////////////////////////////////////////
//// TA BORT BOKNING
/////////////////////////////////////////////////////
else {
 if(userID == user.id) {
  user.bookings--;
 }
 else {
  users.map(function(user) {
    if (user.id == userID) {
         user.bookings--;
      }
   })
 }

let removeBooking = (x) => x.id != booking.id;

bookings = bookings.filter(removeBooking);
if(bookings.length == 0) {
 bookings.push("");
}
}
this.props.bookMachine(bookings);
}
//////////////////////////////////////////////
////  ADMIN
///////////////////////////////////////////////
updateMe(info,name) {
this.props.updateMe(info,name)
}

// UPPDATERA GRUPP
updateGroup(groupName, maxBookings,weeks) {
 this.props.updateGroup(groupName,maxBookings,weeks);
}
// ADMIN ELLER ANVÄNDARE
userStatus(role,key) {
 var users = this.props.group.users;
 for (var i = 0; i < users.length; i++) {
  if(users[i].key == key) {
   users[i].role = role;
   this.props.handleUser(users)
   return false;
  }
 }
}
// GODKÄND ELLER INTE
userApprove(status,key) {
 var users = this.props.group.users;
 for (var i = 0; i < users.length; i++) {
  if(users[i].key == key) {
   users[i].approved = status;
   this.props.handleUser(users)
   return false;
  }
 }
}
// UPPDATERA MASKINER
saveMachines(machines) {
this.props.saveMachines(machines);
}
// UPPDATERA TIDER
saveTimes(times) {
this.props.saveTimes(times);
}
//////////////////////////////////////////////
////  STÄNG VARNINGSMEDDELANDET
///////////////////////////////////////////////
closeWarning() {
 this.setState({
  warningOpen: false
 })
}
//////////////////////////////////////////
///////// TOGGLE MENY
//////////////////////////////////////////
toggleMenu(state) {
 this.props.toggleMenu(state)
}
//////////////////////////////////////////
///////// TOGGLE HELP
//////////////////////////////////////////
toggleHelp(state) {
 this.props.toggleHelp(state)
}
 render() {
  return (
   <div className="logged-in-container">
    <Header
     user = {this.props.user}
     toggleModal = {::this.toggleModal}
     logOut = {::this.props.logOut}
     groupName = {this.props.group.groupName}
     menuOpen = {this.props.menuOpen}
     toggleMenu = {::this.props.toggleMenu}
     week = {this.state.week}
     toggleWeek = {::this.toggleWeek}
     week = {this.state.week}
     maxWeek = {this.state.maxWeek}
     toggleHelp = {::this.toggleHelp}
     />
    <main>

     <Calendar
         bookingsModal = {this.state.bookingsModal}
         adminModal = {this.state.adminModal}
         helpModal = {this.props.help}
         bookMachine = {::this.bookMachine}
         user = {this.props.user}
         menuOpen = {this.props.menuOpen}
         bookings = {this.props.bookings}
         week = {this.state.week}

         // BUILD CALENDAR
         times = {this.props.group.times}
         machines = {this.props.group.machines}

      />

   {
     this.state.bookingsModal ?
     <Bookings
      bookings = {this.props.group.bookings}
      toggleModal = {::this.toggleModal}
      user = {this.props.user}
      cancelBooking = {::this.bookMachine}
      />
     : null
   }
   {
    this.state.adminModal ?
    <Admin
     bookingExist = {this.state.bookingExist}
     cancelBooking = {::this.bookMachine}
     toggleModal = {::this.toggleModal}
     group = {this.props.group}
     userStatus = {::this.userStatus}
     userApprove = {::this.userApprove}
     saveMachines = {::this.saveMachines}
     saveTimes = {::this.saveTimes}
     updateGroup = {::this.updateGroup}
     user = {this.props.user}
     updateMe = {::this.updateMe}
     />
    : null
   }
   {
    this.state.warningOpen ?
    // <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
     <Warning
      key = {1}
      max = {this.props.group.maxBookings}
      closeWarning = {::this.closeWarning}
      admin = {this.props.group.users[0]}
     />
    // </ReactCSSTransitionGroup>
    : null
   }
   </main>
   <Footer
    toggleHelp = {::this.toggleHelp}
    />
   </div>
  )
 }
}
