import React from "react";
import ReactDOM from "react-dom";
import User from "./User.js";
import Bookings from "./Bookings.js";

export default class Admin extends React.Component {
 constructor() {
 super();
 // this.state = {
 //
 // };
}
userStatus(role,id) {
this.props.userStatus(role,id);
}
userApprove(status,id) {
this.props.userApprove(status,id);
}
toggleModal(type) {
 this.props.toggleModal(type)
}


 render() {

  // let sortedBookings = this.props.group.bookings;
  // sortedBookings.sort(function (a, b) {
  //   if (a.id > b.id) {
  //     return 1;
  //   }
  //   if (a.id < b.id) {
  //     return -1;
  //   }
  //   return 0;
  // });

  let sortedBookings = this.props.group.bookings;
  sortedBookings.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  });

  let bookingsArray = [];
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
  bookingsArray.push(bookingDate);
  }
  // console.log(bookingsArray);
  return (
   <div className="modal-container">
    <div className="modal-inner-container">
     <h2>ADMIN</h2>
      <button onClick={() => this.toggleModal("admin")}>Stäng</button>

       <h3>Bokningar</h3>
       <ul>
        {
          bookingsArray.map(function(bookings) {
          return <Bookings
          key = {bookings.id}
          bookings = {bookings}
          />;
          }.bind(this))
        }
       </ul>

       <h3>Användare</h3>
     <ul>
      {
        this.props.group.users.map(function(user) {
        return <User
        user = {user}
        key = {user.key}
        userStatus = {::this.userStatus}
        userApprove = {::this.userApprove}
        />;
        }.bind(this))
      }
      </ul>






    </div>
   </div>
  )
 }
}
