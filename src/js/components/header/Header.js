import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {
 changeUser(id) {
  this.props.changeUser(id)
 }

updateClock() {
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
  time: currentHour + ":" + currentMinute
 })

}
componentDidMount() {
   window.setInterval(function () {
    this.updateClock();
  }.bind(this), 1000);
}
componentWillMount(){
   this.updateClock();
 }


 render() {




  return (
   <header className="header-container">
    <div className="header-container-inner">
    <div className="logo-container col-3">
     <div class="logo"> <h2>React Bokningsapp</h2> <div className="current-time capitalize">
      <p>Dagens datum: {this.state.date} Klockan: {this.state.time}</p>
      </div>
      </div>
   </div>
   <div className="user-info-container  col-5">
    <h3>Inloggad som {this.props.user.name} som har id {this.props.user.id}</h3>
      <button onClick = {() => this.changeUser(12)}>Logga in som Fredrik</button>
      <button onClick = {() => this.changeUser(14)}>Logga in som Ville</button>
   </div>

    <div className="header-btns-container  col-4">
     <button className="show-mybookings-btn">
       {this.props.user.bookings > 0 ? "Visa mina: "+this.props.user.bookings+" bokningar" : "Du har inga bokningar"}
     </button>
     <button className="logout-btn">Logga ut</button>
    </div>
    </div>
    </header>
  )
 }
}
