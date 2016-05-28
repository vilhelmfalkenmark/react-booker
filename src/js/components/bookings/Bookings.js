import React from "react";
import ReactDOM from "react-dom";
import SingleBooking from "./SingleBooking.js";

export default class Bookings extends React.Component {
 constructor() {
  super();
  // this.state = {
  // bookings: this.props.bookings.bind(this)
  // };
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
  console.log(sortedBookings); // Nu har vi våra bokningar sorterade och klara

  let hej = [];
  let uniques = []; // HUR MÅNGA UNIKA DATUM SOM FINNS I BOKNINGARNA
  for (var i = 0; i < sortedBookings.length; i++) {
   if(uniques.indexOf(sortedBookings[i].dateformat) == -1)
   {
    uniques.push(sortedBookings[i].dateformat)
   }
  }

  console.log(uniques);

  for (var i = 0; i < uniques.length; i++) {

  let bookingDate = new Object();
  bookingDate.date = uniques[i];
  bookingDate.bookings = new Array();
  for (var j = 0; j < sortedBookings.length; j++) {
     if(sortedBookings[j].dateformat == uniques[i])
     {
      bookingDate.bookings.push(sortedBookings[j])
     }
  }
  hej.push(bookingDate);
  }
 console.log(hej);




   let filteredBookings = sortedBookings.filter(
    // VI VILL BARA HA BOKNINGARNA FÖR DEN INLOGGADE PERSONEN
    (booking) => {
      return booking.bookedBy.toString().indexOf(this.props.userID.toString()) != -1
      // MÅSTE KONVERTERA TILL STRÄNGAR FÖR ATT KÖRA INDEXOF
    }
  );
  return (
   <div className="my-bookings-container">
    <h2>Mina Bokningar</h2>
     { filteredBookings.map((booking) => {
        return <SingleBooking
         machine = {booking.machine}
         dateformat = {booking.dateformat}
         date = {booking.date}
         month = {booking.month}
         dayname = {booking.dayname}
         interval = {booking.interval}
         key = {booking.id}
         id = {booking.id}
         cancelBooking = {::this.cancelBooking}
         />
      })}

   </div>
  )
 }
}
