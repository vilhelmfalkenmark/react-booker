import React from "react";
import ReactDOM from "react-dom";
import Day from "./Day.js";

export default class Calendar extends React.Component {

 render() {
  return (
    <div className="calendar-container">
   {
     this.props.calendar.map(function(calendar) {
     return <Day dayname = {calendar.dayname} key={calendar.id} times ={calendar.times}/>;
     }.bind(this))
   }
  </div>
  )
 }
}
