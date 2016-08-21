import React from "react";
import Machine from "./Machine.js";
import Time from "./Time.js";

export default class TimeAndMachines extends React.Component {

constructor(props) {
 super(props);
 this.state = {
  machines: props.machines,
  times: props.times
 }
}
//////////////////////////////////////////
///// MASKIN FUNKTIONER
//////////////////////////////////////////
 editMachine(index,name) {
  this.props.editMachine(index, name);
 }
 deleteMachine(index) {
  this.props.deleteMachine(index)
 }
 saveMachines() {
   this.props.saveMachines()
 }
 addMachine() {
  this.props.addMachine()
 }
 //////////////////////////////////////////
 ///// TID FUNKTIONER
 //////////////////////////////////////////
 editTime(index,name) {
  this.props.editTime(index, name);
 }
 deleteTime(index) {
  this.props.deleteTime(index)
 }
 saveTimes() {
   this.props.saveTimes()
 }
 addTime() {
  this.props.addTime()
 }

 render() {
  return (
   <div className="time-and-machines-container flex-row">
    <div className="time-machine-card-container">
    <div className="time-machine-card-inner-container">
     <h3>Maskiner</h3>
      <div>
     <ul className="time-machine-list">
     {
       this.props.machines.map(function(machine,index) {
       return <Machine
       machine = {machine}
       key = {index}
       index = {index}
       editMachine = {::this.editMachine}
       deleteMachine = {::this.deleteMachine}
       />;
       }.bind(this)
     )
     }
      </ul>
      <button className="add-btn" onClick={::this.addMachine}></button>
      <button className="update-btn" onClick={::this.saveMachines}>Uppdatera maskiner</button>
      </div>
      </div>
   </div>
   <div className="time-machine-card-container">
    <div className="time-machine-card-inner-container">

    <h3>Tider</h3>
     <div>
    <ul className="time-machine-list">
    {
      this.props.times.map(function(time,index) {
      return <Time
       time = {time}
       key = {index}
       index = {index}
       editTime = {::this.editTime}
       deleteTime = {::this.deleteTime}
      />;
      }.bind(this)
    )
    }
     </ul>
     <button className="add-btn" onClick={::this.addTime}></button>
     <button className="update-btn" onClick={::this.saveTimes}>Uppdatera tider</button>
     </div>
  </div>
  </div>
   </div>
  )
 }
}
