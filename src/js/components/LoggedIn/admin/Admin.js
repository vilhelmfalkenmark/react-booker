import React from "react";
import User from "./User.js";
import Bookings from "./Bookings.js";
import TimeAndMachines from "./TimeAndMachines.js";

export default class Admin extends React.Component {
 constructor(props) {
 super(props);
  this.state = {
  machines: props.group.machines,
  times: props.group.times
  }
}
//////////////////////////////////////////
///////// ANVÄNDARE
//////////////////////////////////////////
userStatus(role,id) {
this.props.userStatus(role,id);
}
userApprove(status,id) {
this.props.userApprove(status,id);
}
//////////////////////////////////////////
///////// MODAL
//////////////////////////////////////////
toggleModal(type) {
 this.props.toggleModal(type)
}
//////////////////////////////////////////
///////// BOKNINGAR
//////////////////////////////////////////
cancelBooking(key) {
this.props.cancelBooking(key);
}

//////////////////////////////////////////
///////// MASKINER
//////////////////////////////////////////
editMachine(index,newName) {
let machineArray = this.state.machines;
machineArray.splice(index,1,newName);
}
addMachine() {
let machineArray = this.state.machines;
machineArray.push("Namn på ny maskin");
this.setState({
 machines: machineArray
})
}
deleteMachine(index) {
 let machineArray = this.state.machines;
 machineArray.splice(index,1);
 this.setState({
  machines: machineArray
 })
}
saveMachines() {
  this.props.saveMachines(this.state.machines)
}
//////////////////////////////////////////
///////// TIDER
//////////////////////////////////////////
editTime(index,newName) {
 let timeArray = this.state.times;
 timeArray.splice(index,1,newName);
 console.log(this.state.times);
}
addTime() {
let timeArray = this.state.times;
timeArray.push("Nytt tidsintervall");
this.setState({
 times: timeArray
})
}
deleteTime(index) {
 let timeArray = this.state.times;
 timeArray.splice(index,1);
 this.setState({
  times: timeArray
 })
}
saveTimes() {
 this.props.saveTimes(this.state.times)
}

render() {
////////////////////////////////////////////////
/////// SORTERA BOKNINGAR
///////////////////////////////////////////////
  let sortedBookings = this.props.group.bookings;
  var bookingsExist = true;
  if(typeof(sortedBookings[0]) == "string") {
   bookingsExist = false;
  }

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
  return (
   <div className="modal-container">
    <div className="modal-inner-container">
     <h2>ADMIN</h2>
     <div className="close-modal-btn" onClick={() => this.toggleModal("admin")}>
       <div>Stäng</div>
     </div>
       <h3>Bokningar</h3>
       <ul>
        { bookingsExist ?
          bookingsArray.map(function(bookings) {
          return <Bookings
          key = {bookings.id}
          bookings = {bookings}
          cancelBooking = {::this.cancelBooking}
          />;
        }.bind(this)) : null
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
      <h2>Maskiner och Tider</h2>
      {
       bookingsExist != false ?
       <p>Du måste ta bort alla bokningar innan du kan ändra maskiner och tider</p> :
        <TimeAndMachines
         // MASKINER
         machines = {this.state.machines}
         editMachine = {::this.editMachine}
         deleteMachine = {::this.deleteMachine}
         addMachine = {::this.addMachine}
         saveMachines = {::this.saveMachines}
         // TIDER
         times = {this.state.times}
         editTime = {::this.editTime}
         deleteTime = {::this.deleteTime}
         addTime = {::this.addTime}
         saveTimes = {::this.saveTimes}
        />
      }
    </div>
   </div>
  )
 }
}
