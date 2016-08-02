import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./calendar/Calendar.js";
import Bookings from "./modal/Bookings.js";
import Header from "./header/Header.js";

export default class LoggedIn extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 calendar: [],
 modalOpen: false,
 bookings: props.bookings,
 user: props.user
 };
}
componentDidMount() {
 var bookings = this.state.bookings;
 console.log(bookings);
 let calendar = [];
 const daysInCal = 7;
 const times = this.props.group.times;
 const machines = this.props.group.machines;
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
     /*###########################################
      ############################################
      KOLLA VAD SOM REDAN ÄR BOKAT. DVS VAD SOM
      LIGGER LAGRAT I BOOKINGS ARRAYEN
      ############################################
      ############################################*/
      for(var m =0; m<this.props.group.bookings.length; m++) {

       if(this.props.group.bookings[m].id == machine.id)
       {
        machine.booked = bookings[m].booked;
        machine.bookedBy = bookings[m].bookedBy;
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
}



changeUser(userID) {
// this.props.changeUser(userID);

}


toggleModal() {
let modalOpen;
this.state.modalOpen ? modalOpen = false : modalOpen = true;
this.setState({
 modalOpen: modalOpen
})
}


bookMachine(key) { // HANTERA KALENDERVYN!

console.log("funktion kallad!");

this.props.bookMachine(key);
let newArray = [];
let oldArray = this.state.calendar;
let user = this.props.user;

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
                this.setState({
                 user: newUser
                })
              }
              // LÄGG TILL BOKNING
              else {
                let newUser = user;
                newUser.bookings++; // LÄGG TILL EN PÅ DEN INLOGGADES BOKNING
                this.setState({
                 user: newUser
                })
                oldArray[h].times[s].machines[r].booked = true;
                oldArray[h].times[s].machines[r].bookedBy = user;
                oldArray[h].times[s].bookedMachines++;

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
 SKICKA IN DATA I STATE
 ############################################*/
this.setState({
 calendar: newArray,
 bookings: bookings
})
this.props.bookMachine(bookings);
}
 render() {
  return (
   <div className="container">
    {/*<Header
     changeUser = {::this.changeUser}
     user = {this.props.user}
     toggleModal = {::this.toggleModal}
     />*/}
    {/*<Bookings
     modalOpen = {this.state.modalOpen}
     bookings = {this.state.bookings}
     user = {this.props.user}
     cancelBooking = {::this.bookMachine}
     toggleModal = {::this.toggleModal}
     />*/}
    <Calendar
    calendar = {this.state.calendar}
    bookMachine = {::this.bookMachine}
    user = {this.props.user}
    />
   </div>
  )
 }
}
