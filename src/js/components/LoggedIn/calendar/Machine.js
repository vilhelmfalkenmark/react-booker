import React from "react";
export default class Machine extends React.Component {

bookMachine(id) {
if(this.props.bookedBy == null || this.props.user.id == this.props.bookedBy.id)
 {
  this.props.bookMachine(id,this.props.user.id);
}
}
 render() {
  return (
   <div className={this.props.booked ? "booked-machine-container":"free-machine-container"}>
   <div className="checkbox-container">
   <input type="checkbox"
    className="checkbox"
    label =""
    name = {this.props.machine}
    checked = {this.props.booked ? "checked":""}
    disabled= {this.props.booked ? this.props.bookedBy.id != this.props.user.id ? "disabled":null:null}
    onChange = {() => this.bookMachine(this.props.id)}
    />
   <label className="capitalize line-through is-booked"
    for={this.props.machine}
    onClick = {() => this.bookMachine(this.props.id)}>{this.props.machine}</label>
   <span className="name-of-booker">{this.props.booked ? "Bokat av "+this.props.bookedBy.name:null} </span>
  </div>
   </div>
  )
 }
}
