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

  for (var i = 0; i < sortedBookings.length; i++) {

  let bookingDate = new Object();
  bookingDate.date = sortedBookings[i].dateformat;
  bookingDate.bookings = new Array();
  bookingDate.bookings.push(sortedBookings[i]);

  hej.push(bookingDate);
  }
  for (var i = 0; i < hej.length; i++) {

   if(i == 0 )
   {
    if(hej[i].date == hej[1].date)
    {
     console.log("Tjena!");
    }
   }
  }

  console.log(hej);

  let myArray = [
  {
   date: "29052016",
   bookings: [
    {

    }
   ]
  },
  {

  }

  ];


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
