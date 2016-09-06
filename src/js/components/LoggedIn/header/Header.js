import React from "react";
import ReactDOM from "react-dom";
export default class Header extends React.Component {
constructor() {
 super()
 this.state = {
  weekDays: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
  date: "",
  time: "",
  intervalID: 0,
  weekNumber: 0,
  firstWeekDay: "",
  lastWeekDay: "",
  isMonday: false
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

toggleWeek(int) {
this.props.toggleWeek(int);
}


updateClock(id) {
let allDate = new Date();
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
  date: this.state.weekDays[currentWeekday] + " " + currentDay + " " + months[currentMonth],
  time: currentHour + ":" + currentMinute,
  intervalID: id
 })
}
componentDidMount() {
  var id = window.setInterval(function () {
    this.updateClock(id);
  }.bind(this), 1000);

//////////////////////////////////////////
///////// HÄMTA HEM VECKONUMMER OCH DATUM
//////////////////////////////////////////
  Date.prototype.getWeek = function() {
          var firstJan = new Date(this.getFullYear(), 0, 1);
          return Math.floor((((this - firstJan) / 86400000) + firstJan.getDay() + 1) / 7);
      }
      var today = new Date();
      var weekNumber = (new Date()).getWeek();
      var isMonday = false;
      var isSunday = false;
      var lastWeekDay;

      if(today.getDay() == 1) {
       isMonday = true;
       lastWeekDay = 0 // lördag

      }
      else if ( today.getDay() == 0) {
       isSunday = true;
       lastWeekDay = 6 // lördag
      }
      else {
       lastWeekDay = today.getDay() - 1;
      }

      this.setState({
       weekNumber: weekNumber,
       firstWeekDay: this.state.weekDays[today.getDay()],
       lastWeekDay: this.state.weekDays[lastWeekDay],
       isMonday: isMonday
      })
}
componentWillUnmount() {
 window.clearInterval(this.state.intervalID);
}
 render() {
  return (
   <header className="header-container">

    <div className={this.props.menuOpen ? "header-inner-container open":"header-inner-container"}>
   <div className="header-user-container">
    <div className="header-user-icon-container">
      <i className="flaticon-user"></i>
    </div>

    <div className="header-user-inner-container">
     <h4 className="header-header">Inloggad som {this.props.user.name}</h4>
     <p className="header-paragraph">Tillhör grupp {this.props.groupName}</p>

    </div>
   </div>


   <div className="header-date-container">
    <div className="header-date-icon-container">
      <i className="flaticon-calendar"></i>
    </div>
     <div className="header-date-inner-container">
      <h4 className="header-header">{this.state.date} Vecka {this.state.weekNumber}</h4>
      <p className="header-paragraph">Klockan: {this.state.time}</p>
      </div>
   </div>


    <div className="header-btns-container">
     {
      this.props.user.role == "admin" || this.props.user.role == "superadmin" ?
      <button className="edit-group-btn" onClick={() => this.toggleModal("admin")}><i className="flaticon-controls"></i>Redigera grupp </button> :
      <button className="edit-group-btn" onClick={() => this.toggleModal("admin")}><i className="flaticon-controls"></i>Visa grupp</button>
     }
      <button className="show-mybookings-btn" onClick={() => this.toggleModal("bookings")}>
        <i className="flaticon-calendar-1"></i>
        {this.props.user.bookings > 0 ? "Visa mina "+this.props.user.bookings+" bokningar" : "Du har inga bokningar"}
      </button>

      <button className="logout-btn" onClick={::this.logOut}><i className="flaticon-exit"></i>Logga ut</button>
    </div>
    </div>

    <div className={this.props.menuOpen ? "header-calendar-container open":"header-calendar-container"}>
    <div className="header-calendar-inner-container">

     {
      this.props.week > 1 ? <button className="previous-week-btn" onClick={() => ::this.toggleWeek(-1)}><i className="flaticon-back"></i></button> : null
     }
     {
      this.props.week < this.props.maxWeek ?  <button className="next-week-btn" onClick={() => ::this.toggleWeek(1)}><i className="flaticon-next"></i></button> : null
     }
     <h3 className="capitalize">
      {this.state.firstWeekDay}
      Vecka{this.state.weekNumber + (this.props.week - 1)}-{this.state.lastWeekDay}
      Vecka{this.state.isMonday ? this.state.weekNumber + (this.props.week - 1) : this.state.weekNumber + this.props.week }
     </h3>
    </div>
    </div>





     <div className={this.props.menuOpen ? "hamburger-container open":"hamburger-container"} onClick={() => this.toggleMenu(this.props.menuOpen)}>
       <div className="hamburger-inner-container">
         <div className="hamburger"></div>
      </div>
     </div>



    </header>
  )
 }
}
