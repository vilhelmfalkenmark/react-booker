import React from "react";
import ReactDOM from "react-dom";
export default class Machine extends React.Component {
 addMachine(e) {
  this.props.addMachine(this.props.index, e.target.value);
 }
 render() {
  return (
   <div className="">
    <h4>Maskin {this.props.index}</h4>
    <input type="text"
      onChange = {::this.addMachine}
      placeholder = {"Namn på maskin nummer "+this.props.index}
      required/>
   </div>
  )
 }
}
