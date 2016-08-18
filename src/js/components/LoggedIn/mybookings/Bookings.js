import React from "react";
import ReactDOM from "react-dom";
import MyBookings from "./MyBookings.js";

export default class Bookings extends React.Component {
constructor() {
 super();

}

cancelBooking(key,userID) {
this.props.cancelBooking(key,userID);
}

 toggleModal(type) {
  this.props.toggleModal(type)
 }

 render() {
  //  console.log(this.props.bookings);
   let bookingsExist = true;
   if(typeof(this.props.bookings[0]) == "string") {
    //  console.log("kommer in här");
     bookingsExist = false;
   }
  var myBookingsArray = [];
  if(bookingsExist) {
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
  let userID = this.props.user.id;
  function onlyMyBookings(myBookings) {
    return myBookings.bookedBy.id == userID; // TODO::: MÅSTE LÖSA SÅ DEN JÄMFÖR MED THIS.PROP
  }
  sortedBookings = sortedBookings.filter(onlyMyBookings)

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
  }
  return (
       <div className= "modal-background" >
        <div className="modal-container">
         <div className="modal-inner-container">

        <div className="close-modal-btn" onClick={() => this.toggleModal("bookings")}>
          <div>Stäng</div>
        </div>
        {
           bookingsExist ?   <h2>Mina Bokningar</h2> : <h2>Du har inga bokningar</h2>
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
  )
 }
}
