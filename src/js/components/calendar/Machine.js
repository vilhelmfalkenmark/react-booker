import React from "react";
import ReactDOM from "react-dom";

export default class Machine extends React.Component {

componentDidMount() {
  // this.setState({
  //  bookedBy: null
  // })
}
bookMachine(id) {


if(this.props.bookedBy == null || this.props.user.id == this.props.bookedBy.id)
 {

  this.props.bookMachine(id);

}


}
 render() {
  return (
   <div className={this.props.booked ? "booked-machine-container":"free-machine-container "}>
   <div className="checkbox-container">
   <input type="checkbox"
    className="machine-checkbox"
    label =""
    name = {this.props.machine}
    checked = {this.props.booked ? "checked":""}
    disabled= {this.props.booked ? this.props.bookedBy.id != this.props.user.id ? "disabled":"":""}
    onChange = {() => this.bookMachine(this.props.id)}
    />
   <label className="capitalize line-through is-booked"
    for={this.props.machine}  onClick = {() => this.bookMachine(this.props.id)}>{this.props.machine}</label>
   <span className="name-of-booker">{this.props.booked ? "Bokat av "+this.props.bookedBy.name:""} </span>
  </div>
   {/*<p className="is-booked">Ledig? {this.props.booked ? "Nej" : "Ja"}</p>*/}
   </div>
  )
 }
}
