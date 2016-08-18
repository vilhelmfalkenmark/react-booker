import React from "react";

export default class SingleBooking extends React.Component {
 constructor() {
  super();
}
cancelBooking(key,userID) {
this.props.cancelBooking(key,userID);
}
 render() {
  return (
   <div className="single-booking-container">
    <span>{this.props.machine} {this.props.interval}</span>
    <button onClick={() => this.cancelBooking(this.props.id, this.props.user.id)}>Avboka</button>
  </div>
  )
 }
}
