import React from "react";
import ReactDOM from "react-dom";
export default class Machine extends React.Component {
 addMachine(e) {
  this.props.addMachine(this.props.index, e.target.value);
 }
 render() {
  return (
   <div className="">
    <h5>Maskin {this.props.index+1}</h5>
    <input type="text"
      onChange = {::this.addMachine}
      placeholder = {"Namn på maskin nummer "+(this.props.index+1)}
      required/>
   </div>
  )
 }
}
