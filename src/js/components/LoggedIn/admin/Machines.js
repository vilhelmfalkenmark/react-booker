import React from "react";
import Machine from "./Machine.js";

export default class TimeAndMachines extends React.Component {

constructor(props) {
 super(props);
 this.state = {

  machineChanged: false,
  timeChanged: false
 }
}
//////////////////////////////////////////
///// FUNKTIONER
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
 render() {
  return (
   <div className="admin-machine-section">
    <h2><i className="flaticon-washing-machine"></i>Maskiner</h2>
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
      <div className="add-btn-container">
      <button className="add-btn" onClick={::this.addMachine}><i className="flaticon-add"></i></button>
      <span>Lägg till maskin</span>
      </div>
      {
       this.state.machineChanged ? <p className="danger-reminder">Klicka på uppdatera nedan för att spara dina ändringar</p> : null
      }
      <button className="update-btn" onClick={::this.saveMachines}><i className="flaticon-rotate"></i>Uppdatera maskiner</button>
   </div>
  )
 }
}
