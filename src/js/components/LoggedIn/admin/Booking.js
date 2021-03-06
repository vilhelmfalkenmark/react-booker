import React from "react";
export default class Booking extends React.Component {
cancelBooking(userID,key) {
this.props.cancelBooking(userID,key);
}
 render() {
  return (

    <div className="admin-booking-date-container">
     <h3 className="capitalize">{this.props.booking.dateString}</h3>
     {
      this.props.booking.bookings.map(function(booking) {
       return <div className="admin-booking" key={booking.id}>
        <div className="admin-cancel-booking-container">
         <button className="admin-cancel-booking" onClick={() => this.cancelBooking(booking.bookedBy.id, booking.id)}></button>
        </div>
        <div className="admin-booking-info-container">
         <span className="admin-booking-info">{booking.machine} {booking.interval} </span>
         <span className="admin-booking-bookedby">Bokat av: {booking.bookedBy.name}</span>
        </div>
       </div>
      }.bind(this))
     }
    </div>
  )
 }
}
