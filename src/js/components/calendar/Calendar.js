import React from "react";
import ReactDOM from "react-dom";
import Day from "./Day.js";

export default class Calendar extends React.Component {
  bookMachine(id) {
   this.props.bookMachine(id);
  }
 render() {
  return (
    <div className="calendar-container">
   {
     this.props.calendar.map(function(calendar) {
     return <Day
     dayname = {calendar.dayname}
     date = {calendar.date}
     month = {calendar.month}
     key={calendar.id}
     times ={calendar.times}
     bookMachine = {::this.bookMachine}
     />;
     }.bind(this))
   }
  </div>
  )
 }
}
