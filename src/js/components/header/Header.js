import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {
 changeUser(id) {
  this.props.changeUser(id)
 }
 render() {
  return (
   <div>
    <h3>Inloggad som {this.props.user.name} som har id {this.props.user.id}</h3>
    <button onClick = {() => this.changeUser(12)}>Logga in som Fredrik</button>
    <button onClick = {() => this.changeUser(14)}>Logga in som Ville</button>
    <div className="show-mybookings-btn">
    {this.props.user.bookings > 0 ? "Visa mina "+this.props.user.bookings+" bokningar" : "Du har inga bokningar"}
    </div>
    </div>
  )
 }
}
