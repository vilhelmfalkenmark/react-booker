import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {

 render() {
  return (
   <div className="show-mybookings-btn">{this.props.amountOfBookings > 0 ? "Visa mina "+this.props.amountOfBookings+" bokningar" : "Du har inga bokningar"} </div>
  )
 }
}
