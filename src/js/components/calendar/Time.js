import React from "react";
import ReactDOM from "react-dom";
import Machine from "./Machine.js";
export default class Time extends React.Component {
  bookMachine(id) {
   this.props.bookMachine(id);
  }
 render() {
  return (
   <div className="time-container col-3">
   <h4>{this.props.interval}</h4>
   {
     this.props.machines.map(function(machine) {
     return <Machine
     bookMachine = {::this.bookMachine}
     key= {machine.id}
     id = {machine.id}
     dateformat = {machine.dateformat}
     machine = {machine.machine}
     bookedBy = {machine.bookedBy}
     booked = {machine.booked}
     user = {this.props.user}
     />;
     }.bind(this))
   }
   </div>
  )
 }
}
