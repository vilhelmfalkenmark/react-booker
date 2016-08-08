import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./calendar/Calendar.js";
import Bookings from "./mybookings/Bookings.js";
import Header from "./header/Header.js";
import Admin from "./admin/Admin.js";

export default class LoggedIn extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 calendar: [],
 bookingsModal: false,
 adminModal: false,
 user: props.user,
 bookingsExist: false, // För att vi ska kunna loopa ut flera bokningar utan att få errors i Bookings.js komponenenterna.
 erasePassed: false // Varje gång någon loggar in på en förening så ska gårdagens bokningar raderas.
 };
}
componentDidMount() {

 let calendar = [];
 const daysInCal = 7;
 const times = this.props.group.times;
 const machines = this.props.group.machines;
 const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
 const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
 let booked = [];
 for (var i = 0; i < this.props.group.times.length; i++) {
  booked.push(false)
 }


  for (var i = 0; i < daysInCal; i++) {
   /*###########################################
    ############################################
    SKAPA DAGAR I KALENDER
    ############################################
    ############################################*/
   let weekday = new Object();
   let currentDate = new Date(+new Date() + (86400000*i));
   let formattedDate = currentDate.getDate()+"0"+(currentDate.getMonth()+1)+""+(1900+currentDate.getYear());

   let dateObject = new Object() // SKAPA DATUM SOM OBJEKT
   dateObject.day = currentDate.getDate();
   dateObject.month = currentDate.getMonth()+1;
   dateObject.year = 1900+currentDate.getYear();

   weekday.id = parseInt(formattedDate);
   weekday.dayname = daynames[currentDate.getDay()];
   weekday.month = monthnames[currentDate.getMonth()];
   weekday.date = currentDate.getDate();

   /*###########################################
    ############################################
    SKAPA TIDER PÅ DAGAR
    ############################################
    ############################################*/
    weekday.times = new Array();
    for (var k = 0; k < times.length; k++) {
    let time = new Object();
    time.interval = times[k];
    time.bookedMachines = 0;
    time.id = weekday.id+""+(time.interval.replace(/-/g, ''));
    time.id = parseInt(time.id); // DAGENS DATUM + TIDSINTERVALL. EXEMPELVIS 270520161014
    /*###########################################
     ############################################
     SKAPA MASKINER PÅ TIDER
     ############################################
     ############################################*/
    time.machines = new Array();
    for(var l = 0;l<machines.length;l++)
    {
      let machine = new Object();
      machine.machine = machines[l];
      machine.booked = booked[l];
      machine.bookedBy = null;
      machine.id = time.id+""+l;
      machine.id = parseInt(machine.id); // DAGENS DATUM + TIDSINTERVALL + MASKIN. EXEMPELVIS 270520161014 + 1 (Där 1 är TORKTUMLARE)
      machine.dateformat = formattedDate;
      machine.dateObject = dateObject;
     /*###########################################
      ############################################
      KOLLA VAD SOM REDAN ÄR BOKAT. DVS VAD SOM
      LIGGER LAGRAT I BOOKINGS ARRAYEN
      ############################################
      ############################################*/
      for(var m =0; m<this.props.group.bookings.length; m++) {

       if(this.props.group.bookings[m].id == machine.id)
       {
        machine.booked = this.props.group.bookings[m].booked;
        machine.bookedBy = this.props.group.bookings[m].bookedBy;
        time.bookedMachines++;
       }
      }
      time.machines.push(machine);
    }
    weekday.times.push(time);
    }
   calendar.push(weekday);
  }
this.setState( {
 calendar:calendar
})


//////////////////////////////////////////
//// RADERA GÅRDAGENS BOKNINGAR
//////////////////////////////////////////
let todaysDate = new Date(new Date());
let today = new Object();
today.day = todaysDate.getDate();
today.month = todaysDate.getMonth()+1;
today.year = 1900+todaysDate.getYear();
// console.log(today);


this.props.group.bookings.map(function(booking) {
// console.log(booking.dateObject.day);

})

}


toggleModal(type) {
if(type == "bookings") {
 let bookingsOpen;
 this.state.bookingsModal ? bookingsOpen = false : bookingsOpen = true;
 this.setState({
  bookingsModal: bookingsOpen
 })
}
else if(type=="admin") {
 // console.log("ionrgoinr");
 let adminOpen;
 this.state.adminModal ? adminOpen = false : adminOpen = true;
 this.setState({
  adminModal: adminOpen
 })
}
}

bookMachine(key) { // HANTERA KALENDERVYN!
let newArray = [];
let oldArray = this.state.calendar;
let bookings = [];
let oldBookings = this.props.group.bookings;
for (var i = 0; i < oldBookings.length; i++) {
if(typeof(oldBookings[i]) == "object") {
 bookings.push(oldBookings[i]);
}
}
for(var h = 0; h < oldArray.length; h++)
{
  if((key+"").indexOf((oldArray[h].id)+"") !== -1)
  {
      newArray.push(oldArray[h]);
      for(var s = 0; s < oldArray[h].times.length;s++)
      {
        // console.log(oldArray[h].times);
        if((key+"").indexOf((oldArray[h].times[s].id)+"") !== -1)
        {
          for(var r = 0; r < oldArray[h].times[s].machines.length; r++) {
            if(oldArray[h].times[s].machines[r].id == key)
            {
              /*###########################################
               ############################################
               RÄTT MASKIN PÅ RÄTT DAG HITTAD.
               DAGS ATT BÖRJA MANIPULERA DATAN.
               ############################################
               ############################################*/
              // TA BORT BOKNING
              let user = this.props.user;
              if(oldArray[h].times[s].machines[r].booked)
              {
                oldArray[h].times[s].machines[r].booked = false;
                oldArray[h].times[s].machines[r].bookedBy = null;
                oldArray[h].times[s].bookedMachines--;
                for (var t = 0; t < bookings.length; t++) {
                 if (bookings[t].id == oldArray[h].times[s].machines[r].id) {
                  bookings.splice(t,1);
                 }
                }
                let newUser = user;
                newUser.bookings--; // TA BORT EN PÅ DEN INLOGGADES BOKNING
              }
              // LÄGG TILL BOKNING
              else {
                let newUser = user;
                newUser.bookings++; // LÄGG TILL EN PÅ DEN INLOGGADES BOKNING
                oldArray[h].times[s].machines[r].booked = true;
                oldArray[h].times[s].machines[r].bookedBy = user;
                oldArray[h].times[s].bookedMachines++;

                let booking = new Object();
                booking.id = key;
                booking.key = key;
                booking.machine = oldArray[h].times[s].machines[r].machine;
                booking.dateformat = oldArray[h].times[s].machines[r].dateformat
                booking.dateObject = oldArray[h].times[s].machines[r].dateObject
                booking.bookedBy = this.state.user;
                booking.booked = true;
                booking.interval = oldArray[h].times[s].interval;
                booking.dayname = oldArray[h].dayname;
                booking.date = oldArray[h].date;
                booking.month = oldArray[h].month;
                bookings.push(booking);
              }
            }
          }
        }
      }
  }
  else {
    newArray.push(oldArray[h]);
  }
}
//////////////////////////////////////////
//// SKICKA IN DATA I STATE
//////////////////////////////////////////
// this.setState({
//  calendar: newArray,
//  bookings: bookings
// })
this.props.bookMachine(bookings);

// if(typeof(this.props.group.bookings[0]) == "object")
// {
//  this.setState({
//   bookingsExist: true
//  })
// }
// else {
//  this.setState({
//   bookingsExist: false
//  })
// }
// console.log(this.state.bookingsExist);
}


/*###########################################
############################################
               ADMIN
############################################
############################################*/
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


 render() {
  return (
   <div className="container">
    <Header
     user = {this.props.user}
     toggleModal = {::this.toggleModal}
     logOut = {::this.props.logOut}
     groupName = {this.props.group.groupName}
     />
    <Calendar
    calendar = {this.state.calendar}
    bookMachine = {::this.bookMachine}
    user = {this.props.user}
    />
   {
     this.state.bookingsModal ?
     <Bookings
         // modalOpen = {this.state.modalOpen}
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
     />
    : null
   }
   </div>
  )
 }
}
