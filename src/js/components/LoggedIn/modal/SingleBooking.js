import React from "react";
import ReactDOM from "react-dom";

export default class SingleBooking extends React.Component {
 constructor() {
  super();
}
cancelBooking(key) {
this.props.cancelBooking(key);
}
 render() {
  return (
   <div className="single-booking-container">
    <span>{this.props.machine} {this.props.interval}</span>
    <button onClick={() => this.cancelBooking(this.props.id)}>Avboka</button>
  </div>
  )
 }
}
