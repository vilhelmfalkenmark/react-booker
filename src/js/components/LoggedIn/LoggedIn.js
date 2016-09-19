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
  this.updateCalendarview(this.props.group.machines,this.props.group.times);
}
//////////////////////////////////////////
//// SKAPA KALENDER
//////////////////////////////////////////
toggleWeek(int) {
 this.setState({
  week: this.state.week+=int
 })
 this.updateCalendarview(this.props.group.machines,this.props.group.times);
}


updateCalendarview(machines,times) {
  // let calendar = [];
  // const daysInCal = 7;
  // const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
  // const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
  // let booked = [];
  // for (var i = 0; i < times.length; i++) {
  //  booked.push(false)
  // }
  //  for (var i = ((this.state.week-1) * daysInCal); i < (this.state.week * daysInCal); i++) {
  //   //////////////////////////////////////////
  //   //// SKAPA DAGAR I KALENDER
  //   //////////////////////////////////////////
  //   let weekday = new Object();
  //   let currentDate = new Date(+new Date() + (86400000*i));
  //   let formattedDate = currentDate.getDate()+"0"+(currentDate.getMonth()+1)+""+(1900+currentDate.getYear());
  //
  //   let dateObject = new Object() // SKAPA DATUM SOM OBJEKT
  //   dateObject.day = currentDate.getDate();
  //   dateObject.month = currentDate.getMonth()+1;
  //   dateObject.year = 1900+currentDate.getYear();
  //
  //   weekday.id = parseInt(formattedDate);
  //   weekday.dayname = daynames[currentDate.getDay()];
  //   weekday.month = monthnames[currentDate.getMonth()];
  //   weekday.date = currentDate.getDate();
  //
  //   //////////////////////////////////////////
  //   //// SKAPA TIDER PÅ DAGAR
  //   //////////////////////////////////////////
  //    weekday.times = new Array();
  //    for (var k = 0; k < times.length; k++) {
  //    let time = new Object();
  //    time.interval = times[k];
  //    time.bookedMachines = 0;
  //    time.id = weekday.id+""+(time.interval.replace(/-/g, ''));
  //    time.id = parseInt(time.id); // DAGENS DATUM + TIDSINTERVALL. EXEMPELVIS 270520161014
  //    //////////////////////////////////////////
  //    //// SKAPA MASKINER PÅ TIDER
  //    //////////////////////////////////////////
  //    time.machines = new Array();
  //    for(var l = 0;l<machines.length;l++)
  //    {
  //      let machine = {
  //          machine: machines[l],
  //          booked: booked[l],
  //          bookedBy: null,
  //          id: parseInt(time.id+""+l), // DAGENS DATUM + TIDSINTERVALL + MASKIN. EXEMPELVIS 270520161014 + 1 (Där 1 är TORKTUMLARE)
  //          dateformat: formattedDate,
  //          dateObject: dateObject
  //      }
  //      //////////////////////////////////////////////
  //      ////  KOLLA VAD SOM REDAN ÄR BOKAT. DVS
  //      ////  VAD SOM LIGGER LAGRAT I BOOKINGS ARRAYEN
  //      ///////////////////////////////////////////////
  //
  //      // for(var m =0; m<this.props.bookings.length; m++) {
  //      // if(typeof(this.props.bookings[m]) !== "undefined") {
  //      //   if(this.props.bookings[m].id == machine.id)
  //      //   {
  //      //    machine.booked = this.props.bookings[m].booked;
  //      //    machine.bookedBy = this.props.bookings[m].bookedBy;
  //      //    time.bookedMachines++;
  //      //   }
  //      // }
  //      // }
  //
  //
  //
  //
  //      time.machines.push(machine);
  //    }
  //    weekday.times.push(time);
  //    }
  //   calendar.push(weekday);
  //  }
  //  this.setState({
  //   calendar:calendar
  //  })
}


//////////////////////////////////////////////
////  SLUT KALENDER FUNKTION
///////////////////////////////////////////////
toggleModal(type) {
if(type == "bookings") {
 let bookingsOpen;
 this.state.bookingsModal ? bookingsOpen = false : bookingsOpen = true;
 this.setState({
  bookingsModal: bookingsOpen
 })
}
else if(type=="admin") {
 let adminOpen;
 this.state.adminModal ? adminOpen = false : adminOpen = true;
 this.setState({
  adminModal: adminOpen
 })
}
}
//////////////////////////////////////////////////////
//// FUNKTION FÖR ATT TA BORT OCH LÄGGA TILL BOKNING
/////////////////////////////////////////////////////
bookMachine(userID, booked, booking) {

// console.log(booked);


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

 user.bookings++;
 let newBooking = booking;
 newBooking.bookedBy = user;
 bookings.push(newBooking);

}
//////////////////////////////////////////////////////
//// TA BORT BOKNING
/////////////////////////////////////////////////////
else { // TODO FIXA VECKOFUNKTIONALITETEN OCH MAXBOKNINGAR
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
// FILTER
 function removeBooking(x) {
  return x.id != booking.id;
 }
bookings = bookings.filter(removeBooking);
if(bookings.length == 0) {
 bookings.push("");
}

}
this.props.bookMachine(bookings);









// let booking = {
//   id: key,
//   machine: calendar[h].times[s].machines[r].machine,
//   dateObject: calendar[h].times[s].machines[r].dateObject,
//   dateFormat: calendar[h].times[s].machines[r].dateformat,
//   bookedBy: this.state.user,
//   interval: calendar[h].times[s].interval
// }











// for (var i = 0; i < oldBookings.length; i++) {
// if(typeof(oldBookings[i]) == "object") {
//  bookings.push(oldBookings[i]);
// }
// }
// for(var h = 0; h < calendar.length; h++)
// {
//   if((key+"").indexOf((calendar[h].id)+"") !== -1)
//   {
//       for(var s = 0; s < calendar[h].times.length;s++)
//       {
//         if((key+"").indexOf((calendar[h].times[s].id)+"") !== -1)
//         {
//           for(var r = 0; r < calendar[h].times[s].machines.length; r++) {
//             if(calendar[h].times[s].machines[r].id == key)
//             {
//              //////////////////////////////////////////////
//              //// RÄTT MASKIN PÅ RÄTT DAG HITTAD.
//              //// DAGS ATT BÖRJA MANIPULERA DATAN.
//              ///////////////////////////////////////////////
//               // TA BORT BOKNING
//
//
//               if(calendar[h].times[s].machines[r].booked)
//               {
//                 calendar[h].times[s].machines[r].booked = false;
//                 calendar[h].times[s].machines[r].bookedBy = null;
//                 calendar[h].times[s].bookedMachines--;
//                 for (var t = 0; t < bookings.length; t++) {
//                  if (bookings[t].id == calendar[h].times[s].machines[r].id) {
//                   bookings.splice(t,1);
//                  }
//                 }
//                 // OM MAN AVBOKAR VIA ADMIN PANELEN SÅ SKA BOKNINGEN INTE NÖDVÄNDIGTVIS SUBTRAHERAS FRÅN DEN PERSONEN SOM ÄR INLOGGAD
//                 if(user.id != userID) {
//                   users.map(function(user) {
//                     if (user.id == userID) {
//                       user.bookings--;
//                     }
//                   })
//                 }
//                 // TA BORT EN PÅ DEN INLOGGADES BOKNING
//                 else {
//                   user.bookings--;
//                 }
//
//               }
//               // LÄGG TILL BOKNING
//               else {
//                // OM ADMIN HAR SATT MAXIMALT ANTAL BOKINGAR
//                if(typeof(group.maxBookings) == "number") {
//                    if(this.props.user.bookings >= group.maxBookings ) {
//                     this.setState({
//                      warningOpen: true
//                     })
//                     return false;
//                    }
//                }
//                 user.bookings++; // LÄGG TILL EN PÅ DEN INLOGGADES BOKNING
//                 calendar[h].times[s].machines[r].booked = true;
//                 calendar[h].times[s].machines[r].bookedBy = user;
//                 calendar[h].times[s].bookedMachines++;
//
//                 let topInterval = calendar[h].times[s].interval.split("-");
//                 topInterval = topInterval.join("");
//                 let intInterval = parseInt(topInterval);
//                 let booking = {
//                   id: key,
//                   key: key,
//                   machine: calendar[h].times[s].machines[r].machine,
//                   dateObject: calendar[h].times[s].machines[r].dateObject,
//                   dateFormat: calendar[h].times[s].machines[r].dateformat,
//                   bookedBy: this.state.user,
//                   booked: true,
//                   interval: calendar[h].times[s].interval
//                 }
//                 booking.dateObject.monthName = calendar[h].month;
//                 booking.dateObject.dayName = calendar[h].dayname;
//                 booking.dateObject.interval = intInterval;
//                 bookings.push(booking);
//               }
//               //////////////////////////////////////////
//               //// SKICKA IN BOOKINGS I CONTAINER STATE
//               //// OCH SLUTA LOOPA
//               //////////////////////////////////////////
//               this.props.bookMachine(bookings);
//
//               return false;
//             }
//           }
//         }
//       }
//   }
// }
// //////////////////////////////////////////////////////////////////
// ///////// BOKNINGEN MAN VILL TA BORT ÄR INTE I NUVARANDE VECKOVY
// //////////////////////////////////////////////////////////////////
// var component = this;
// oldBookings.map(function(booking, index) {
//  if(booking.id == key) {
//   bookings.splice(index,1);
//   component.props.bookMachine(bookings);
//  }
// })
// if(user.id != userID) {
//   users.map(function(user) {
//     if (user.id == userID) {
//       user.bookings--;
//     }
//   })
// }
// // TA BORT EN PÅ DEN INLOGGADES BOKNING
// else {
//   user.bookings--;
// }



// this.props.bookMachine(bookings);
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
this.updateCalendarview(machines,this.props.group.times);
}
// UPPDATERA TIDER
saveTimes(times) {
this.props.saveTimes(times);
this.updateCalendarview(this.props.group.machines,times);
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
