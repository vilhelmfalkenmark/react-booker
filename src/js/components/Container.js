import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./calendar/Calendar.js";
import Bookings from "./bookings/Bookings.js";
import Header from "./header/Header.js";

export default class Booker extends React.Component {
 constructor() {
  super();
 let calendar = [];
 let bookings = [
   {
     "id": 100620166100,
     "key": 100620166100,
     "machine": "tvättmaskin",
     "dateformat": "10062016",
     "bookedBy": {
       "id": 12,
       "name": "fredrik löfgren",
       "additionalInfo": "lägenhet 3",
       "bookings": 0
     },
     "booked": true,
     "interval": "6-10",
     "dayname": "fredag",
     "date": 10,
     "month": "juni"
   },
   {
     "id": 906201614180,
     "key": 906201614180,
     "machine": "tvättmaskin",
     "dateformat": "9062016",
     "bookedBy": {
       "id": 14,
       "name": "vilhelm falkenmark",
       "additionalInfo": "lägenhet 4",
       "bookings": 0
     },
     "booked": true,
     "interval": "14-18",
     "dayname": "torsdag",
     "date": 9,
     "month": "juni"
   },
   {
     "id": 906201614181,
     "key": 906201614181,
     "machine": "torktumlare",
     "dateformat": "9062016",
     "bookedBy": {
       "id": 14,
       "name": "vilhelm falkenmark",
       "additionalInfo": "lägenhet 4",
       "bookings": 0
     },
     "booked": true,
     "interval": "14-18",
     "dayname": "torsdag",
     "date": 9,
     "month": "juni"
   },
   {
     "id": 906201614182,
     "key": 906201614182,
     "machine": "torkskåp",
     "dateformat": "9062016",
     "bookedBy": {
       "id": 12,
       "name": "fredrik löfgren",
       "additionalInfo": "lägenhet 3",
       "bookings": 0
     },
     "booked": true,
     "interval": "14-18",
     "dayname": "torsdag",
     "date": 9,
     "month": "juni"
   },
   {
     "id": 1006201610142,
     "key": 1006201610142,
     "machine": "torkskåp",
     "dateformat": "10062016",
     "bookedBy": {
       "id": 14,
       "name": "vilhelm falkenmark",
       "additionalInfo": "lägenhet 4",
       "bookings": 0
     },
     "booked": true,
     "interval": "10-14",
     "dayname": "fredag",
     "date": 10,
     "month": "juni"
   },
   {
     "id": 1006201614181,
     "key": 1006201614181,
     "machine": "torktumlare",
     "dateformat": "10062016",
     "bookedBy": {
       "id": 14,
       "name": "vilhelm falkenmark",
       "additionalInfo": "lägenhet 4",
       "bookings": 0
     },
     "booked": true,
     "interval": "14-18",
     "dayname": "fredag",
     "date": 10,
     "month": "juni"
   },
   {
     "id": 1106201610141,
     "key": 1106201610141,
     "machine": "torktumlare",
     "dateformat": "11062016",
     "bookedBy": {
       "id": 12,
       "name": "fredrik löfgren",
       "additionalInfo": "lägenhet 3",
       "bookings": 0
     },
     "booked": true,
     "interval": "10-14",
     "dayname": "lördag",
     "date": 11,
     "month": "juni"
   },
   {
     "id": 1106201614180,
     "key": 1106201614180,
     "machine": "tvättmaskin",
     "dateformat": "11062016",
     "bookedBy": {
       "id": 12,
       "name": "fredrik löfgren",
       "additionalInfo": "lägenhet 3",
       "bookings": 0
     },
     "booked": true,
     "interval": "14-18",
     "dayname": "lördag",
     "date": 11,
     "month": "juni"
   }
 ];

 let users = [
  {
   id: 14,
   name: "vilhelm falkenmark",
   additionalInfo: "lägenhet 4",
   bookings: 4
  },
  {
   id: 12,
   name: "fredrik löfgren",
   additionalInfo: "lägenhet 3",
   bookings: 4
  }
 ]

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
      for(var m =0; m<bookings.length; m++) {
       if(bookings[m].id == machine.id)
       {
        machine.booked = bookings[m].booked;
        machine.bookedBy = bookings[m].bookedBy;
        time.bookedMachines++; //
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
    user: users[1] // TODO Ta bort den här hårdkodningen
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
 ############################################
 KOLLA HUR MÅNGA BOKNINGAR DEN
 INLOGGADE PERSONEN HAR
 ############################################
 ############################################*/

// function onlyMyBookings(myBookings) {
//   return myBookings.bookedBy.id == user.id;
// }
// let amountOfBookings = bookings.filter(onlyMyBookings).length;



/*###########################################
 ############################################
 SKICKA IN DATA I STATE
 ############################################
 ############################################*/
this.setState({
 calendar: newArray,
 bookings: bookings
})
// console.log(bookings);

}
 render() {
  return (
   <div className="container">
    <Header
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
