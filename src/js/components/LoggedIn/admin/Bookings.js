import React from "react";
import Booking from "./Booking.js";
export default class Bookings extends React.Component {
 constructor() {
 super();
}

cancelBooking(key,userID) {
this.props.cancelBooking(key,userID);
}
 render() {
  ////////////////////////////////////////////////
  /////// SORTERA BOKNINGAR
  ///////////////////////////////////////////////
    let sortedBookings = this.props.bookings;
    var bookingsExist = true;
    if(typeof(sortedBookings[0]) == "string") {
     bookingsExist = false;
    }
    var bookingsArray = [];
    if(bookingsExist) {
    // let sortedBookings = this.props.group;

    console.log(sortedBookings[0].interval);

    sortedBookings.sort(function (a, b) {
     // Sortera först efter månad och sen efter dag.
      return  a.dateObject.month - b.dateObject.month || a.dateObject.day - b.dateObject.day || a.dateObject.interval - b.dateObject.interval;
    });
    let uniqueDates = []; // HUR MÅNGA UNIKA DATUM SOM FINNS I BOKNINGARNA
    for (var i = 0; i < sortedBookings.length; i++) {
     if(uniqueDates.indexOf(sortedBookings[i].dateFormat) == -1)
     {
      uniqueDates.push(sortedBookings[i].dateFormat)
     }
    }
    for (var i = 0; i < uniqueDates.length; i++) {
    let bookingDate = new Object();
    bookingDate.date = uniqueDates[i];
    bookingDate.id = parseInt(uniqueDates[i]);
    bookingDate.bookings = new Array();

    for (var j = 0; j < sortedBookings.length; j++) {
       if(sortedBookings[j].dateFormat == uniqueDates[i])
       {
        bookingDate.bookings.push(sortedBookings[j])
        if(bookingDate.hasOwnProperty("dateString") == false) {
         bookingDate.dateString = sortedBookings[j].dateObject.dayName+" "+sortedBookings[j].dateObject.day+" "+sortedBookings[j].dateObject.monthName;
        }
       }
    }
    bookingsArray.push(bookingDate);
    }
    }
  return (

    <div className="admin-booking-container">
     <h2 className="admin-header-bookings"><i className="flaticon-calendar-1"></i>Bokningar</h2>
     {
      bookingsExist ?
      bookingsArray.map(function(booking) {
      return <Booking // BOOKINGS
      key = {booking.id}
      booking = {booking}
      cancelBooking = {::this.cancelBooking}/>;}.bind(this))
      : <p className="text-center">Det finns inga bokningar</p>
     }

    </div>
  )
 }
}
