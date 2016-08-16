import React from "react";
import Machine from "./Machine.js";
export default class Time extends React.Component {

 constructor() {
  super();
 }
  bookMachine(id,userID) {
   this.props.bookMachine(id,userID);
  }
 render() {
  return (
   <div className="time-container col-3">
   {/*<h4>{this.props.interval}</h4>*/}
    <h4 className={this.props.bookedMachines == 0 ? "free-time"
     :this.props.bookedMachines < this.props.machines.length ? "partially-booked-time"
     :"booked-time"
    }><i className="fa fa-clock-o"></i> {this.props.interval} - <span>{this.props.bookedMachines == 0 ? "Ledig tid"
     :this.props.bookedMachines < this.props.machines.length ? "Delvis ledigt"
     :"Fullbokat"
    }</span>
    </h4>
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
