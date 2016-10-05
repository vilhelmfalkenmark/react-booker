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
   <div className="admin-booking">
    <div className="admin-cancel-booking-container">
     <button className="admin-cancel-booking" onClick={() => this.cancelBooking(this.props.id, this.props.user.id)}></button>
    </div>

    <div className="admin-booking-info-container">
     <span className="admin-booking-info">{this.props.machine} {this.props.interval} </span>
    </div>

  </div>
  )
 }
}
