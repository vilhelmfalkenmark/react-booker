import React from "react";
import ReactDOM from "react-dom";
export default class Time extends React.Component {
 addTime(e) {
  this.props.addTime(this.props.index, e.target.value);
 }
 render() {
  return (
   <div className="">
    <h4>Tidsintervall nummer {this.props.index}</h4>
    <input type="text"
      onChange = {::this.addTime}
      placeholder = {"Tidsintervall nummer "+this.props.index}
      required/>
   </div>
  )
 }
}
