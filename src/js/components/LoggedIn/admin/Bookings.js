import React from "react";
import ReactDOM from "react-dom";
export default class Bookings extends React.Component {
 constructor() {
 super();

}





cancelBooking(key) {
this.props.cancelBooking(key);
}
 render() {

  // var bookingsExist = false;
  // console.log(typeof(this.props.bookings.bookings[0]));
  // if(typeof(this.props.bookings.bookings[0] === "object")) {
  //  console.log("bookingsExist = true");
  //  bookingsExist = true;
  // }
  // else if (typeof(this.props.bookings.bookings[0] === "string")) {
  //  bookingsExist = false;
  //  console.log("bookingsExist = false");
  // }

  return (

    <li className="admin-booking-container">
     <h4>Datum: {this.props.bookings.dateString}</h4>
     {
      this.props.bookings.bookings.map(function(booking) {
       return <div key={booking.id}>
        <p>{booking.machine} {booking.interval}
         <button onClick={() => this.cancelBooking(booking.id)}>Radera bokning</button>
        </p>
        <p>Bokat av: {booking.bookedBy.name}</p>
       </div>

      }.bind(this))
     }
    </li> 
  )
 }
}
