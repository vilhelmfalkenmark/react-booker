import React from "react";

export default class Machine extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  machine: props.machine
 }
}
 editMachine(e) {
  this.setState({
   machine: e.target.value
  })
  this.props.editMachine(this.props.index, e.target.value);
 }
 deleteMachine() {
  this.props.deleteMachine(this.props.index)
 }
 render() {
  return (
   <li className="">
    <h4>{this.props.machine}</h4>
    <input type="text"
      onChange = {::this.editMachine}
      placeholder = {"Namn på maskin nummer "+this.props.index}
      value = {this.state.machine}
      required />
     <button onClick={::this.deleteMachine}>Radera maskin</button>
   </li>
  )
 }
}
