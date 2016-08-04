import React from "react";
import ReactDOM from "react-dom";
export default class Loader extends React.Component {

 render() {
  return (
   <div className="loader-wall">
    <div>
     {
      <h1>{this.props.type}</h1>

     }
    </div>
   </div>
  )
 }
}
