import React from "react";
import ReactDOM from "react-dom";
import MyBookings from "./MyBookings.js";

export default class Bookings extends React.Component {
constructor() {
 super();
}
cancelBooking(key,userID) {
let booking = {
 id: key
}
this.props.cancelBooking(userID,true,booking);
}

 toggleModal(type) {
  this.props.toggleModal(type)
 }

 render() {
  //  console.log(this.props.bookings);
   let bookingsExist = true;
   if(typeof(this.props.bookings[0]) == "string" || this.props.user.bookings == 0) {
     bookingsExist = false;
   }
  var myBookingsArray = [];
  if(bookingsExist) {
  let sortedBookings = this.props.bookings;
  sortedBookings.sort(function (a, b) {
   // Sortera först efter månad och sen efter dag.
    return  a.dateObject.month - b.dateObject.month || a.dateObject.day - b.dateObject.day || a.dateObject.interval - b.dateObject.interval;
  });
  let userID = this.props.user.id;
  function onlyMyBookings(myBookings) {
    return myBookings.bookedBy.id == userID; // TODO::: MÅSTE LÖSA SÅ DEN JÄMFÖR MED THIS.PROP
  }
  sortedBookings = sortedBookings.filter(onlyMyBookings)
  // console.log(sortedBookings);
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
  myBookingsArray.push(bookingDate);
  }
  }
  return (
       <div className= "modal-background">
        <div className="modal-clickarea" onClick={() => this.toggleModal("bookings")}></div>
        <div className="modal-container">
        <div className="modal-inner-container">
        <button className="close-modal-btn" onClick={() => this.toggleModal("bookings")}>
         <i className="flaticon-cancel"></i>
        </button>
        <div className="my-bookings-inner-container">
        {
           bookingsExist ?  <div>
           <h2><i className="flaticon-calendar-1"></i>Följande bokningar är sparade för användare {this.props.user.name}</h2>
            <p>Notera att det räcker med att du bockar i rutan i kalendervyn för att din bokning ska sparas.
             Du behöver alltså inte klicka på spara någonstans.</p>
           </div>
           : <div>
           <h2 className="text-center"><i className="flaticon-calendar-1"></i>Bokningar</h2>
           <p className="text-center">Du har inga bokningar</p>
           </div>
          }
         {
           bookingsExist ?
           myBookingsArray.map(function(myBooking) {
           return <MyBookings
            dateString = {myBooking.dateString}
            bookings={myBooking.bookings}
            key = {myBooking.id}
            cancelBooking = {::this.cancelBooking}
            user = {this.props.user}
            />;
          }.bind(this)) : null
         }
         </div>
        </div>
        </div>
       </div>
  )
 }
}
