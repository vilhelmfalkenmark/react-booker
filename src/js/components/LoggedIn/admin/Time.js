import React from "react";

export default class Time extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  time: props.time
 }
}
 editTime(e) {
  this.setState({
   time: e.target.value
  })
  this.props.editTime(this.props.index, e.target.value);
 }
 deleteTime() {
  this.props.deleteTime(this.props.index)
 }
 render() {
  return (
   <li className="">
    <h4>{this.props.time}</h4>
    <input type="text"
      onChange = {::this.editTime}
      placeholder = {"Namn på maskin nummer "+this.props.index}
      value = {this.state.time}
      required />
     <button onClick={::this.deleteTime}>Radera Tid</button>
   </li>
  )
 }
}
