import React from "react";
import ReactDOM from "react-dom";
export default class Header extends React.Component {
constructor() {
 super()
 this.state = {
  date: "",
  time: "",
  intervalID: 0
 }
}
 toggleModal(type) {
  this.props.toggleModal(type);
 }

logOut() {
 this.props.logOut();
}
toggleMenu(state) {
 this.props.toggleMenu(state)
}

updateClock(id) {
let allDate = new Date();
let weekDays = ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
let months = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];
let currentWeekday = allDate.getDay();
let currentDay = allDate.getDate();
let currentMonth = allDate.getMonth();
let currentYear = allDate.getFullYear();
let currentHour = allDate.getHours();
let currentMinute = allDate.getMinutes();
let weekNumber = allDate.getMonth();
currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
 this.setState({
  date: weekDays[currentWeekday] + " " + currentDay + " " + months[currentMonth],
  time: currentHour + ":" + currentMinute,
  intervalID: id
 })
}
componentDidMount() {
  var id = window.setInterval(function () {
    this.updateClock(id);
  }.bind(this), 1000);
}
componentWillUnmount() {
 window.clearInterval(this.state.intervalID);
}
 render() {
  return (
   <header className="header-container">
    <div className={this.props.menuOpen ? "hamburger-container open":"hamburger-container"} onClick={() => this.toggleMenu(this.props.menuOpen)}>
      <div className="hamburger-inner-container">
        <div className="hamburger"></div>
     </div>
    </div>

    <div className={this.props.menuOpen ? "header-inner-container open":"header-inner-container"}>
    <div className="header-logo-container">
     <div className="header-logo-inner-container">
      <h1 className="app-header">React Bokningsapp</h1>
      <p className="capitalize">Dagens datum: {this.state.date} {this.state.time}</p>
     </div>
   </div>


   <div className="header-user-container">
    <div className="header-user-inner-container">
     <h4 className="header-user-name">Användare: {this.props.user.name}</h4>
     <p>Tillhör förening: {this.props.groupName}</p>
    </div>
   </div>


    <div className="header-btns-container">
     {
      this.props.user.role == "admin" || this.props.user.role == "superadmin" ?
      <button className="edit-group-btn" onClick={() => this.toggleModal("admin")}>Redigera grupp</button> : null
     }
      <button className="show-mybookings-btn" onClick={() => this.toggleModal("bookings")}>
        {this.props.user.bookings > 0 ? "Visa mina: "+this.props.user.bookings+" bokningar" : "Du har inga bokningar"}
      </button>

      <button className="logout-btn" onClick={::this.logOut}>Logga ut</button>
    </div>
    </div>
    </header>
  )
 }
}
