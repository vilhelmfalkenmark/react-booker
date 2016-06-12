import React from "react";
import ReactDOM from "react-dom";

export default class Logged_Out_Container extends React.Component {

componentDidMount() {
  // this.setState({
  //  bookedBy: null
  // })
}

 render() {
  return (
   <div className="logged-out-container">
    <button>Skapa ny förening!</button>
    <button>Skapa ny användare på förening!</button>


   </div>
  )
 }
}
