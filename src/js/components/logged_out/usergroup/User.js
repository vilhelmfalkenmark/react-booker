import React from "react";
import ReactDOM from "react-dom";

export default class User extends React.Component {

 constructor() {
  super();
 }


// createUser(email,password,name,groupName)



 render() {
  return (
   <div className="user-container">
      <h4>{this.props.user.name}</h4>
      <p>{this.props.user.email}</p>
      <p>{this.props.user.role}</p>
      <p>{this.props.user.additionalInfo}</p>
      <p>{this.props.user.bookings}</p>
   </div>
  )
 }
}
