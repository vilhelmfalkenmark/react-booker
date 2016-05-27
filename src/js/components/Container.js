import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Calendar.js";

export default class Booker extends React.Component {
 constructor() {
  super();
 let calendar = [];
 const daysInCal = 7;
 const times = ["6-10","10-14","14-18","18-22"];
 const machines = ["tvättmaskin","torktumlare","torkskåp"];
 const daynames = ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"];
 const monthnames = ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"]
 let booked = [false,false,false];
 let bookedBy = [null,null,null];

 function newTime(interval, machines, booked,bookedBy) {
 this.interval = interval;
 this.machines = machines;
 this.booked = booked;
 this.bookedBy = bookedBy;
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
   weekday.id = parseInt(formattedDate);
   weekday.dayname = daynames[currentDate.getDay()];
   /*###########################################
    ############################################
    SKAPA TIDER PÅ DAGAR
    ############################################
    ############################################*/
    weekday.times = new Array();
    for (var k = 0; k < times.length; k++) {
    //  addTimes(times[k],machines,booked,bookedBy,k);
    let time = new Object();
    time.interval = times[k];
    time.machines = machines;
    time.booked = booked;
    time.bookedBy = bookedBy;
    time.key = Math.floor((Math.random() * 120) + 1);
    weekday.times.push(time);
    }
   calendar.push(weekday);
  }
  console.log(calendar);
    this.state = {
    calendar: calendar
    };
}
 render() {
  return (
   <div className="">
    <h2>React Bokningsapp</h2>
    <Calendar calendar = {this.state.calendar} />
   </div>
  )
 }
}
