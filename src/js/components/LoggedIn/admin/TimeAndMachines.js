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
   <div className="time-and-machines-container">
    <div>
     <h3>Maskiner</h3>
     <ul>
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
      <button onClick={::this.addMachine}>Lägg till maskin</button>
      <button onClick={::this.saveMachines}>Uppdatera</button>
   </div>
   <div>
    <h3>Tider</h3>
    <ul>
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
     <button onClick={::this.addTime}>Lägg till tid</button>
     <button onClick={::this.saveTimes}>Uppdatera tider</button>
  </div>
   </div>
  )
 }
}
