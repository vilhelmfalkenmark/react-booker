import React from "react";
import ReactDOM from "react-dom";
export default class Time extends React.Component {
 addTime(e) {
  this.props.addTime(this.props.index, e.target.value);
 }
 render() {
  return (
   <div className="">
    <h5>Tidsintervall {this.props.index}, exempelvis {(this.props.index+10)+"-"+(this.props.index+11)}</h5>
    <input type="text"
      onChange = {::this.addTime}
      placeholder = {"Tidsintervall nummer "+this.props.index}
      required/>
   </div>
  )
 }
}
