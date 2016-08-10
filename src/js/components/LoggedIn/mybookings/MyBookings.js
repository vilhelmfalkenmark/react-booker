import React from "react";
import ReactDOM from "react-dom";
import SingleBooking from "./SingleBooking.js";


export default class MyBookings extends React.Component {
 constructor() {
  super();

}
cancelBooking(key) {
this.props.cancelBooking(key);
}

 render() {

   console.log(this.props.bookings);

  return (
   <div className="mybookings-date-container">
   <h4 className="mybookings-date-header">{this.props.dateString}</h4>
   {
     this.props.bookings.map(function(singlebooking) {
     return <SingleBooking
      cancelBooking = {::this.cancelBooking}
      key = {singlebooking.id}
      id = {singlebooking.id}
      machine = {singlebooking.machine}
      interval = {singlebooking.interval}
      />;
     }.bind(this))
   }
   </div>
  )
 }
}
