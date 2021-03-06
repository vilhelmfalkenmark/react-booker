import React from "react";
import Users from "./Users.js";
import Bookings from "./Bookings.js";
import Machines from "./Machines.js";
import Times from "./Times.js";
import Group from "./Group.js";
import Me from "./Me.js";

export default class Admin extends React.Component {
 constructor(props) {
 super(props);
  this.state = {
  machines: props.group.machines,
  times: props.group.times,
  bookingsOpen: false,
  usersOpen: false,
  machineTimesOpen: false,
  slideLeft: false,
  view: ""
  }
}
//////////////////////////////////////////
///////// SLIDE-LEFT & RIGHT
//////////////////////////////////////////
slideLeft(slide,view) {
this.setState({
slideLeft: slide,
view: view
})
}

//////////////////////////////////////////
///////// ENSKILD ANVÄNDARE (ME)
//////////////////////////////////////////
updateMe(info,name) {
this.props.updateMe(info,name)
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
///////// ALLMÄN INFORMATION
//////////////////////////////////////////
updateGroup(groupName, maxBookings,weeks) {
 this.props.updateGroup(groupName,maxBookings,weeks);
}
//////////////////////////////////////////
///////// BOKNINGAR
//////////////////////////////////////////
cancelBooking(userID,bookingID) {

 let booking = {
  id: bookingID
 }
 // console.log("hej!");

this.props.cancelBooking(userID,true,booking);
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
machineArray.push("");
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
}
addTime() {
let timeArray = this.state.times;
timeArray.push("");
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

 //State
 const {slideLeft, view, times} = this.state;
 //Props
 const {user,group } = this.props;

  return (
   <div className= "modal-background">
    <div className="modal-clickarea" onClick={() => this.toggleModal("admin")}></div>
    <div className="admin-modal-container">
     <div className="modal-inner-container admin-modal">

     <div className={slideLeft ? "admin-section-container slide-left" : "admin-section-container"}>
      <section className="admin-left-section">
       <button className="close-modal-btn" onClick={() => this.toggleModal("admin")}>

       </button>
       <h1>{group.groupName}</h1>

       <p>ID för den här gruppen är: {group.id}. Nya användare behöver ange detta ID för att kunna gå med i gruppen.</p>
        <div className="admin-section-row" onClick={() => this.slideLeft(true, "me")}>
          <div className="admin-section-row-icon"><i className="flaticon-user"></i></div>
          <div className="admin-section-row-header"><h4>{user.name}</h4></div>
          <div className="admin-section-row-btn"> <button ><i className="flaticon-next"></i></button></div>
        </div>
        {
         user.role !="user" ?
        <div className="admin-section-row" onClick={() => this.slideLeft(true,"group")}>
          <div className="admin-section-row-icon"><i className="flaticon-controls"></i></div>
          <div className="admin-section-row-header"><h4>{group.groupName}</h4></div>
          <div className="admin-section-row-btn"> <button ><i className="flaticon-next"></i></button></div>
        </div> : null
        }
        <div className="admin-section-row" onClick={() => this.slideLeft(true, "users")}>
          <div className="admin-section-row-icon"><i className="flaticon-users"></i></div>
          <div className="admin-section-row-header"><h4>Användare</h4></div>
          <div className="admin-section-row-btn"> <button onClick={() => this.slideLeft(true, "users")}><i className="flaticon-next"></i></button></div>
        </div>
        {
          user.role !="user" ?
         <div className="admin-section-row" onClick={() => this.slideLeft(true, "bookings")}>
          <div className="admin-section-row-icon"><i className="flaticon-calendar-1"></i></div>
          <div className="admin-section-row-header"><h4>Bokningar</h4></div>
          <div className="admin-section-row-btn"> <button ><i className="flaticon-next"></i></button></div>
         </div> : null
         }
        {
         user.role != "user" ?
         typeof(group.bookings[0]) == "string" ?
         <div>
         <div className="admin-section-row" onClick={() => this.slideLeft(true, "machines")}>
           <div className="admin-section-row-icon"><i className="flaticon-washing-machine"></i></div>
           <div className="admin-section-row-header"><h4>Maskiner</h4></div>
           <div className="admin-section-row-btn"> <button ><i className="flaticon-next"></i></button></div>
         </div>

         <div className="admin-section-row" onClick={() => this.slideLeft(true, "times")}>
           <div className="admin-section-row-icon"><i className="flaticon-time-1"></i></div>
           <div className="admin-section-row-header"><h4>Tider</h4></div>
           <div className="admin-section-row-btn"> <button ><i className="flaticon-next"></i></button></div>
         </div>
        </div> :
        <div>
        <div className="admin-section-row">
          <div className="admin-section-row-icon"><i className="flaticon-washing-machine"></i></div>
          <div className="admin-section-row-header"><h4>Maskiner <span className="remove-bookings-info">Vänligen ta bort alla bokningar för att ändra maskiner</span></h4></div>
          <div className="admin-section-row-btn"> </div>
        </div>

        <div className="admin-section-row">
          <div className="admin-section-row-icon"><i className="flaticon-time-1"></i></div>
          <div className="admin-section-row-header"><h4>Tider <span className="remove-bookings-info">Vänligen ta bort alla bokningar för att ändra tider</span></h4></div>
          <div className="admin-section-row-btn"> </div>
        </div>
       </div> : null
        }
      </section>
      <section className="admin-right-section">
       <button className="admin-back-btn" onClick={() => this.slideLeft(false,"")}><i className="flaticon-back"></i>Tillbaka</button>
       {
        view == "me" ? // ME
        <Me
         user = {user}
         updateMe = {::this.updateMe}
         /> : view == "group" ? // GROUP
         <Group
         groupName = {group.groupName}
         maxBookings = {group.maxBookings}
         weeks = {group.weeks}
         updateGroup = {::this.updateGroup}
         /> : view == "users" ? // USERS
         <Users
         users = {group.users}
         userStatus = {::this.userStatus}
         userApprove = {::this.userApprove}
         groupName = {group.groupName}
         role = {user.role}
          />
         :
         view == "bookings" ? // BOOKINGS
         <Bookings
          bookings = {group.bookings}
          cancelBooking = {::this.cancelBooking}
          /> :
         view == "machines" ? // MACHINES
         <Machines
          machines = {this.state.machines}
          editMachine = {::this.editMachine}
          deleteMachine = {::this.deleteMachine}
          addMachine = {::this.addMachine}
          saveMachines = {::this.saveMachines}
         /> :
         view == "times" ? // TIMES
         <Times
          times = {times}
          editTime = {::this.editTime}
          deleteTime = {::this.deleteTime}
          addTime = {::this.addTime}
          saveTimes = {::this.saveTimes}
         /> : null
       }
      </section>
    </div>
     </div>
    </div>
   </div>
  )
 }
}
