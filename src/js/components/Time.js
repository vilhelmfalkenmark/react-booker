import React from "react";
import ReactDOM from "react-dom";
import Machine from "./Machine.js";

export default class Time extends React.Component {

  // constructor() {
  //
  //
  //
  //
  //  super();
  //  this.state = {
  //  calendar: ""
  //  };
  //
  //
  //
  // }

 render() {
  return (
   <div className="time-container">
   <h4>{this.props.interval}</h4>
   {
    //  this.props.machines.map(function(time) {
    //  return <Machine
    //  key= {((Math.random() * 500) + 1)}
    //  machine = {time.machines}
    //  bookedBy = {time.machines}
    //  />;
    //  }.bind(this))
   }
   </div>
  )
 }
}
