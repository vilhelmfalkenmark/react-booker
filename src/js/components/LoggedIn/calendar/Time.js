import React from "react";
import Machine from "./Machine.js";
export default class Time extends React.Component {

 constructor() {
  super();
  this.state = {
   open: false
  }
 }
  bookMachine(userID,action,booking) {
   this.props.bookMachine(userID,action,booking);
  }
 render() {
  return (
   <div className={"time-col-"+this.props.columns}>
     <h4 className={this.props.bookedMachines == 0 ? "free-time"
      :this.props.bookedMachines < this.props.machines.length ? "partially-booked-time"
      :"booked-time"
     }><i className="flaticon-time-1"></i> {this.props.interval} - <span>{this.props.bookedMachines == 0 ? "Ledig tid"
      :this.props.bookedMachines < this.props.machines.length ? "Delvis ledigt"
      :"Fullbokat"
     }</span>

     </h4>
     <button className={this.state.open ? "toggle-machines hide-machines-btn" : "toggle-machines show-machines-btn"}
      onClick={()=> this.setState({open: !this.state.open})}></button>
     <div className={this.state.open ? "machine-container-open" : "machine-container-closed"}>
    {
      this.props.machines.map(function(machine) {
      return <Machine
       dayName = {this.props.dayName}
       monthName = {this.props.monthName}
       interval = {this.props.interval}
       dateObject = {this.props.dateObject}

      bookMachine = {::this.bookMachine}
      key= {machine.id}
      id = {machine.id}
      dateformat = {machine.dateformat}
      machine = {machine.machine}
      bookedBy = {machine.bookedBy}
      booked = {machine.booked}
      user = {this.props.user}
      interval = {this.props.interval}
      />;
      }.bind(this))
    }
    </div>
   </div>
  )
 }
}
