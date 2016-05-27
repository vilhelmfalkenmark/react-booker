import React from "react";
import ReactDOM from "react-dom";

export default class Machine extends React.Component {
bookMachine(id) {
 this.props.bookMachine(id);
}
 render() {
  return (
   <div className={this.props.booked ? "booked-machine-container":"free-machine-container "}>
   <p className="capitalize line-through">{this.props.machine}</p>
   <input type="checkbox" className="machine-checkbox" label ="" onClick={() => this.bookMachine(this.props.id)}/>
   <p className="is-booked">Ledig? {this.props.booked ? "Nej" : "Ja"}</p>
   </div>
  )
 }
}
