import React from "react";
import Machine from "./Machine.js";

export default class TimeAndMachines extends React.Component {

constructor(props) {
 super(props);
 this.state = {
  machines: props.machines
 }
}

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

 render() {
  return (
   <div className="">
    <h3>Maskiner</h3>
    <ul>
    {
      this.state.machines.map(function(machine,index) {
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
  )
 }
}
