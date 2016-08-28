import React from "react";
import ReactDOM from "react-dom";
import SingleBooking from "./SingleBooking.js";


export default class MyBookings extends React.Component {
 constructor() {
  super();

}
cancelBooking(key,userID) {
this.props.cancelBooking(key,userID);
}

 render() {
   // console.log(this.props.bookings);
  return (
   <div className="mybookings-date-container">
   <h3 className="mybookings-date-header">{this.props.dateString}</h3>
   {
     this.props.bookings.map(function(singlebooking) {
     return <SingleBooking
      cancelBooking = {::this.cancelBooking}
      key = {singlebooking.id}
      id = {singlebooking.id}
      machine = {singlebooking.machine}
      interval = {singlebooking.interval}
      user = {this.props.user}

      />;
     }.bind(this))
   }
   </div>
  )
 }
}
