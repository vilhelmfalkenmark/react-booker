import React from "react";
import ReactDOM from "react-dom";
export default class Bookings extends React.Component {
 constructor() {
 super();
 // this.state = {
 //
 // };
}

 render() {
  return (
   <li className="admin-booking-container">
    <h4>Datum: {this.props.bookings.dateString}</h4>
    {
     this.props.bookings.bookings.map(function(booking) {
      return <div>
       {booking.dayname}
      </div>


     })
    }
   </li>
  )
 }
}
