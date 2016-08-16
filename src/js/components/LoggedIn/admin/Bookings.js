import React from "react";
import ReactDOM from "react-dom";
export default class Bookings extends React.Component {
 constructor() {
 super();
}

cancelBooking(key,userID) {
this.props.cancelBooking(key,userID);
}
 render() {

  return (

    <li className="admin-booking-date-container">
     <h3 className="capitalize">Datum: {this.props.bookings.dateString}</h3>
     {
      this.props.bookings.bookings.map(function(booking) {
       return <div className="admin-booking" key={booking.id}>
        <div className="admin-booking-info-container">
         <span className="admin-booking-info">{booking.machine} {booking.interval} </span>
         <span className="admin-booking-bookedby">Bokat av: {booking.bookedBy.name}</span>
        </div>
        <div className="admin-cancel-booking-container">
        <button className="admin-cancel-booking" onClick={() => this.cancelBooking(booking.id, booking.bookedBy.id)}>Avboka</button>
        </div>
       </div>
      }.bind(this))
     }
    </li>
  )
 }
}
