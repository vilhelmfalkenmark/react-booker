import React from "react";
import ReactDOM from "react-dom";
import MyBookings from "./MyBookings.js";

export default class Bookings extends React.Component {
 constructor() {
  super();
 }
 cancelBooking(key) {
 this.props.cancelBooking(key);
 }

 render() {
  let sortedBookings = this.props.bookings;
  sortedBookings.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  function onlyMyBookings(myBookings) {
    return myBookings.bookedBy == 12; // TODO::: MÅSTE LÖSA SÅ DEN JÄMFÖR MED THIS.PROP
  }
  sortedBookings = sortedBookings.filter(onlyMyBookings)

  let myBookingsArray = [];
  let uniquesDates = []; // HUR MÅNGA UNIKA DATUM SOM FINNS I BOKNINGARNA
  for (var i = 0; i < sortedBookings.length; i++) {
   if(uniquesDates.indexOf(sortedBookings[i].dateformat) == -1)
   {
    uniquesDates.push(sortedBookings[i].dateformat)
   }
  }
  for (var i = 0; i < uniquesDates.length; i++) {
  let bookingDate = new Object();
  bookingDate.date = uniquesDates[i];
  bookingDate.id = parseInt(uniquesDates[i]);
  bookingDate.bookings = new Array();
  for (var j = 0; j < sortedBookings.length; j++) {
     if(sortedBookings[j].dateformat == uniquesDates[i])
     {
      bookingDate.bookings.push(sortedBookings[j])
      if(bookingDate.hasOwnProperty("dateString") == false) {
       bookingDate.dateString = sortedBookings[j].dayname+" "+sortedBookings[j].date+" "+sortedBookings[j].month;
      }
     }
  }
  myBookingsArray.push(bookingDate);
  }
  // console.log(myBookingsArray);

  //  let filteredBookings = sortedBookings.filter(
  //   // VI VILL BARA HA BOKNINGARNA FÖR DEN INLOGGADE PERSONEN
  //   (booking) => {
  //     return booking.bookedBy.toString().indexOf(this.props.userID.toString()) != -1
  //     // MÅSTE KONVERTERA TILL STRÄNGAR FÖR ATT KÖRA INDEXOF
  //   }
  // );

  // { myBookingsArray.map((myBooking) => {
  //    return <SingleBooking
  //     machine = {booking.machine}
  //     dateformat = {booking.dateformat}
  //     date = {booking.date}
  //     month = {booking.month}
  //     dayname = {booking.dayname}
  //     interval = {booking.interval}
  //     key = {booking.id}
  //     id = {booking.id}
  //     cancelBooking = {::this.cancelBooking}
  //     />
  //  })
  // }

  return (
   <div className="my-bookings-container">
    <h2>Mina Bokningar</h2>
     {
       myBookingsArray.map(function(myBooking) {
       return <MyBookings
        dateString = {myBooking.dateString}
        bookings={myBooking.bookings}
        key = {myBooking.id}
        cancelBooking = {::this.cancelBooking}
        />;
       }.bind(this))
     }
   </div>
  )
 }
}
