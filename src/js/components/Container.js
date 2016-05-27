import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar.js";
import MyBookings from "./MyBookings.js";


export default class Booker extends React.Component {
 constructor() {
  super();
 let calendar = [];
 let bookings = [];
 const daysInCal = 7;
 const times = ["6-10","10-14","14-18","18-22"];
 const machines = ["tvättmaskin","torktumlare","torkskåp"];
 const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
 const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
 let booked = [false,false,false];
 let bookedBy = [null,null,null];
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
      machine.bookedBy = bookedBy[l];
      machine.id = time.id+""+l;
      machine.id = parseInt(machine.id); // DAGENS DATUM + TIDSINTERVALL + MASKIN. EXEMPELVIS 270520161014 + 1 (Där 1 är TORKTUMLARE)
      time.machines.push(machine);
    }
    weekday.times.push(time);
    }
   calendar.push(weekday);
  }
  // console.log(calendar);
    this.state = {
    calendar: calendar,
    bookings: bookings
    };
}
bookMachine(key) {
let newArray = [];
let oldArray = this.state.calendar;
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
              }
              else {
                oldArray[h].times[s].machines[r].booked = true;

                let booking = new Object();
                booking.id = key;
                booking.key = key;
                booking.machine = oldArray[h].times[s].machines[r].machine;
                booking.bookedBy = "Håkan bråkan";
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
this.setState({
 calendar: newArray,
 bookings: bookings
})
}
 render() {
  return (
   <div className="">
    <h2>React Bokningsapp</h2>
    <MyBookings />
    <Calendar
    calendar = {this.state.calendar}
    bookMachine = {::this.bookMachine}
    />
   </div>
  )
 }
}
