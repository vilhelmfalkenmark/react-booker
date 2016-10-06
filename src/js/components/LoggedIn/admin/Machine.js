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
   <li>
    <button className="delete-machine-btn" onClick={::this.deleteMachine}></button>
    <input type="text"
      onChange = {::this.editMachine}
      placeholder = {"Maskin nummer "+(this.props.index+1)}
      value = {this.state.machine}
      required />
   </li>
  )
 }
}
