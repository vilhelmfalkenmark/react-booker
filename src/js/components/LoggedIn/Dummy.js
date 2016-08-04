import React from "react";
import ReactDOM from "react-dom";

export default class Dummy extends React.Component {
 constructor() {
 super();
 // this.state = {
 //
 // };
}

 render() {
  return (
   <div className="container">
    <h1>INLOGGAD</h1>
    <h3>{this.props.group.groupName}</h3>
    <h4>{this.props.user.email}</h4>
   </div>
  )
 }
}
