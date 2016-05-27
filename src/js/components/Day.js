import React from "react";
import ReactDOM from "react-dom";
import Time from "./Time.js";

export default class Day extends React.Component {

 render() {
   return (
     <div className="day-container">
     <h4>{this.props.dayname}</h4>
        {
          this.props.times.map(function(time) {
          return <Time
          key= {time.key}
          interval= {time.interval}
          machines = {time.machines}
          booked={time.booked}
          bookedBy ={time.bookedBy} />;
          }.bind(this))
        }
   </div>
   )
 }
}
