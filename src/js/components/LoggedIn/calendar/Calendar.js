import React from "react";
import Day from "./Day.js";
export default class Calendar extends React.Component {

 bookMachine(userID,action,booking) {
  this.props.bookMachine(userID,action,booking);
 }

render() {

var times = this.props.times;
var machines = this.props.machines;
  let calendar = [];
  const daysInCal = 7;
  const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
  const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
  let booked = [];
  for (var i = 0; i < times.length; i++) {
   booked.push(false)
  }
   for (var i = ((this.props.week-1) * daysInCal); i < (this.props.week * daysInCal); i++) {
    //////////////////////////////////////////
    //// SKAPA DAGAR I KALENDER
    //////////////////////////////////////////
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
    weekday.dateObject = dateObject;

    //////////////////////////////////////////
    //// SKAPA TIDER PÅ DAGAR
    //////////////////////////////////////////
     weekday.times = new Array();
     for (var k = 0; k < times.length; k++) {
     let time = new Object();
     time.interval = times[k];
     time.bookedMachines = 0;
     time.id = weekday.id+""+(time.interval.replace(/-/g, ''));
     time.id = parseInt(time.id); // DAGENS DATUM + TIDSINTERVALL. EXEMPELVIS 270520161014
     //////////////////////////////////////////
     //// SKAPA MASKINER PÅ TIDER
     //////////////////////////////////////////
     time.machines = new Array();
     for(var l = 0;l<machines.length;l++)
     {
       let machine = {
           machine: machines[l],
           booked: false,
           bookedBy: null,
           id: parseInt(time.id+""+l), // DAGENS DATUM + TIDSINTERVALL + MASKIN. EXEMPELVIS 270520161014 + 1 (Där 1 är TORKTUMLARE)
           dateformat: formattedDate,
           dateObject: dateObject
       }
       //////////////////////////////////////////////
       ////  KOLLA VAD SOM REDAN ÄR BOKAT. DVS
       ////  VAD SOM LIGGER LAGRAT I BOOKINGS ARRAYEN
       ///////////////////////////////////////////////
       // console.log(this.props.bookings);
       for(var m =0; m<this.props.bookings.length; m++) {
       if(typeof(this.props.bookings[m]) !== "undefined") {
         if(this.props.bookings[m].id == machine.id)
         {
          machine.booked = true;
          machine.bookedBy = this.props.bookings[m].bookedBy;
          time.bookedMachines++;
         }
       }
       }
       time.machines.push(machine);
     }
     weekday.times.push(time);
     }
    calendar.push(weekday);
   }
  return (
    <div className={this.props.menuOpen ? "calendar-container open fixed": this.props.adminModal || this.props.bookingsModal || this.props.helpModal  ? "calendar-container fixed" : "calendar-container"}>
   {
    calendar.map(function(calendar) {
     return <Day
     dayName = {calendar.dayname}
     date = {calendar.date}
     monthName = {calendar.month}
     dateObject = {calendar.dateObject}
     key= {calendar.id}
     times ={calendar.times}
     user = {this.props.user}
     bookMachine = {::this.bookMachine}
     bookings = {this.props.bookings}
     />;
     }.bind(this))
   }
  </div>
  )
 }
}
