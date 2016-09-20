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
    {/* <h4>{this.props.time}</h4> */}
    <button className="delete-time-btn"onClick={::this.deleteTime}><i className="flaticon-cancel"></i></button>
    <input type="text"
      onChange = {::this.editTime}
      placeholder = {"Tidsintervall nummer "+(this.props.index+1)}
      value = {this.state.time}
      required />
   </li>
  )
 }
}
