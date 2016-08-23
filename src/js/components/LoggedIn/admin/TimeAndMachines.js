import React from "react";
import Machine from "./Machine.js";
import Time from "./Time.js";

export default class TimeAndMachines extends React.Component {

constructor(props) {
 super(props);
 this.state = {
  machines: props.machines,
  times: props.times,
  machineChanged: false,
  timeChanged: false
 }
}
//////////////////////////////////////////
///// MASKIN FUNKTIONER
//////////////////////////////////////////
 editMachine(index,name) {
  this.props.editMachine(index, name);
  this.setState({
   machineChanged: true
  })
 }
 deleteMachine(index) {
  this.props.deleteMachine(index)
  this.setState({
   machineChanged: true
  })
 }
 addMachine() {
  this.props.addMachine()
  this.setState({
   machineChanged: true
  })
 }
 saveMachines() {
   this.props.saveMachines()
   this.setState({
    machineChanged: false
   })
 }

 //////////////////////////////////////////
 ///// TID FUNKTIONER
 //////////////////////////////////////////
 editTime(index,name) {
  this.props.editTime(index, name);
  this.setState({
   timeChanged: true
  })
 }
 deleteTime(index) {
  this.props.deleteTime(index)
  this.setState({
   timeChanged: true
  })
 }
 addTime() {
  this.props.addTime()
  this.setState({
   timeChanged: true
  })
 }
 saveTimes() {
   this.props.saveTimes()
   this.setState({
    timeChanged: false
   })
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
      {
       this.state.machineChanged ? <p className="save-reminder">Glöm inte att klicka på Uppdatera</p> : null
      }
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
      {
       this.state.timeChanged ? <p className="save-reminder">Glöm inte att klicka på Uppdatera</p> : null
      }
     <button className="update-btn" onClick={::this.saveTimes}>Uppdatera tider</button>
     </div>
  </div>
  </div>
   </div>
  )
 }
}
