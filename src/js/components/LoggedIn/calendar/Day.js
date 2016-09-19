import React from "react";
import Time from "./Time.js";

export default class Day extends React.Component {
 bookMachine(userID,action,booking) {
  this.props.bookMachine(userID,action,booking);
 }
 render() {
   return (
     <div className="day-container row">
     <h3 className="capitalize date-header"><i className="fa fa-calendar!"></i> {this.props.dayName} - {this.props.date} {this.props.monthName}</h3>
        {
          this.props.times.map(function(time) {
          return <Time
           // FÖR DATEOBJECT
          dayName = {this.props.dayName}
          monthName = {this.props.monthName}
          dateObject = {this.props.dateObject}

          bookMachine = {::this.bookMachine}
          key= {time.id}
          interval= {time.interval}
          bookedMachines = {time.bookedMachines} // Antal maskiner som är bokade på tiden
          machines = {time.machines}
          user = {this.props.user}
          columns = {this.props.times.length}
          />;
          }.bind(this))
        }
   </div>
   )
 }
}
