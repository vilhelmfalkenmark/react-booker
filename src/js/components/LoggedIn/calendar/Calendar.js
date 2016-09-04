import React from "react";
import Day from "./Day.js";

export default class Calendar extends React.Component {

 bookMachine(id,userID) {
  this.props.bookMachine(id,userID);
 }
// toggleWeek(int) {
// this.props.toggleWeek(int);
// }
 render() {
  return (
    <div className={this.props.menuOpen ? "calendar-container open": this.props.adminModal || this.props.bookingsModal ? "calendar-container fixed" : "calendar-container"}>
     {
      // this.props.week > 1 ? <button className="previous-week-btn" onClick={() => ::this.toggleWeek(-1)}><i className="fa fa-angle-left"></i></button> : null
     }
     {
      // this.props.week < this.props.maxWeek ?  <button className="next-week-btn" onClick={() => ::this.toggleWeek(1)}><i className="fa fa-angle-right"></i></button> : null
     }
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
