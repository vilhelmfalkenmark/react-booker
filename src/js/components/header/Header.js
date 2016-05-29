import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {

 render() {
  return (
   <div className="show-mybookings-btn">Visa mina {this.props.amountOfBookings} bokningar</div>


  )
 }
}
