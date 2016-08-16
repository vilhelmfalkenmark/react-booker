import React from "react";
import Day from "./Day.js";

export default class Calendar extends React.Component {
 bookMachine(id,userID) {
  this.props.bookMachine(id,userID);
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
     key= {calendar.id}
     times ={calendar.times}
     user = {this.props.user}
     bookMachine = {::this.bookMachine}
     />;
     }.bind(this))
   }
  </div>
  )
 }
}
