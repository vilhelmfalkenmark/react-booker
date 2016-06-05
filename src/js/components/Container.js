import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./calendar/Calendar.js";
import Bookings from "./bookings/Bookings.js";
import Header from "./header/Header.js";

export default class Booker extends React.Component {
 constructor() {
  super();
 let calendar = [];
 let bookings = [];
 let user = {
  id: 14,
  name: "vilhelm falkenmark",
  additionalInfo: "lägenhet 4",
  bookings: 0
 }

 let users = [
  {
   id: 14,
   name: "vilhelm falkenmark",
   additionalInfo: "lägenhet 4",
   bookings: 0
  },
  {
   id: 12,
   name: "fredrik löfgren",
   additionalInfo: "lägenhet 3",
   bookings: 0
  }
 ]


 function onlyMyBookings(myBookings) {
   return myBookings.bookedBy == user.id; // TODO::: MÅSTE LÖSA SÅ DEN JÄMFÖR MED THIS.PROP
 }

 let amountOfBookings = bookings.filter(onlyMyBookings).length;

 const daysInCal = 7;
 const times = ["6-10","10-14","14-18","18-22"];
 const machines = ["tvättmaskin","torktumlare","torkskåp"];
 const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
 const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
 let booked = [false,false,false];
  for (var i = 0; i < daysInCal; i++) {
   /*###########################################
    ############################################
    SKAPA DAGAR I KALENDER
    ############################################
    ############################################*/
   let weekday = new Object();
   let currentDate = new Date(+new Date() + (86400000*i));
   let formattedDate = currentDate.getDate()+"0"+(currentDate.getMonth()+1)+""+(1900+currentDate.getYear());
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
      machine.id = time.id+""+l;
      machine.id = parseInt(machine.id); // DAGENS DATUM + TIDSINTERVALL + MASKIN. EXEMPELVIS 270520161014 + 1 (Där 1 är TORKTUMLARE)
      machine.dateformat = formattedDate;
     /*###########################################
      ############################################
      KOLLA VAD SOM REDAN ÄR BOKAT. DVS VAD SOM
      LIGGER LAGRAT I BOOKINGS ARRAYEN
      ############################################
      ############################################*/
      for(var m =0; m<bookings.length; m++) {
       if(bookings[m].id == machine.id)
       {
        machine.booked = bookings[m].booked;
       }
      }
      time.machines.push(machine);
    }
    weekday.times.push(time);
    }
   calendar.push(weekday);
  }
    this.state = {
    calendar: calendar,
    bookings: bookings,
    users: users,
    user: users[1], // TODO Ta bort den här hårdkodningen
    amountOfBookings: amountOfBookings // Hur många bokingar som den inloggade personen har
    };
}

changeUser(userID) {
let allUsers = this.state.users;
for (var i = 0; i < allUsers.length; i++) {
 if(allUsers[i].id == userID)
 {
  this.setState({
   user: allUsers[i]
  })
 }
}
}




bookMachine(key) { // HANTERA KALENDERVYN!
let newArray = [];
let oldArray = this.state.calendar;
let user = this.state.user;

let bookings = [];
let oldBookings = this.state.bookings;

for (var i = 0; i < oldBookings.length; i++) {
bookings.push(oldBookings[i]);
}

for(var h = 0; h < oldArray.length; h++)
{
  if((key+"").indexOf((oldArray[h].id)+"") !== -1)
  {
      newArray.push(oldArray[h]);
      for(var s = 0; s < oldArray[h].times.length;s++)
      {
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
              if(oldArray[h].times[s].machines[r].booked)
              {
                oldArray[h].times[s].machines[r].booked = false;
                for (var t = 0; t < bookings.length; t++) {
                 if (bookings[t].id == oldArray[h].times[s].machines[r].id) {
                  bookings.splice(t,1);
                 }
                }
              }
              else {
                oldArray[h].times[s].machines[r].booked = true;
                let booking = new Object();
                booking.id = key;
                booking.key = key;
                booking.machine = oldArray[h].times[s].machines[r].machine;
                booking.dateformat = oldArray[h].times[s].machines[r].dateformat
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

/*###########################################
 ############################################
 KOLLA HUR MÅNGA BOKNINGAR DEN
 INLOGGADE PERSONEN HAR
 ############################################
 ############################################*/

function onlyMyBookings(myBookings) {
  return myBookings.bookedBy.id == user.id;
}
let amountOfBookings = bookings.filter(onlyMyBookings).length;
/*###########################################
 ############################################
 SKICKA IN DATA I STATE
 ############################################
 ############################################*/
this.setState({
 calendar: newArray,
 bookings: bookings,
 amountOfBookings: amountOfBookings
})
}
 render() {
  return (
   <div className="container">
    <h2>React Bokningsapp</h2>
    <Header
     amountOfBookings = {this.state.amountOfBookings}
     changeUser = {::this.changeUser}
     user = {this.state.user}
     />
    <Bookings
     bookings = {this.state.bookings}
     user = {this.state.user}
     cancelBooking = {::this.bookMachine}
     />
    <Calendar
    calendar = {this.state.calendar}
    bookMachine = {::this.bookMachine}
    user = {this.state.user}
    />
   </div>
  )
 }
}
