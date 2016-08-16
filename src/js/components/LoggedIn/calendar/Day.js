import React from "react";
import Time from "./Time.js";

export default class Day extends React.Component {
 bookMachine(id,userID) {
  this.props.bookMachine(id,userID);
 }
 render() {
   return (
     <div className="day-container row">
     <h3 className="capitalize date-header"><i className="fa fa-calendar!"></i> {this.props.dayname} - {this.props.date} {this.props.month}</h3>
        {
          this.props.times.map(function(time) {
          return <Time
          bookMachine = {::this.bookMachine}
          key= {time.id}
          interval= {time.interval}
          bookedMachines = {time.bookedMachines} // Antal maskiner som är bokade på tiden
          machines = {time.machines}
          user = {this.props.user}
          />;
          }.bind(this))
        }
   </div>
   )
 }
}
