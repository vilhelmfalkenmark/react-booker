import React from "react";
import ReactDOM from "react-dom";

export default class myApp extends React.Component {
 constructor() {
  super();
  this.state = {
   todos: [
    {
     id: 1,
     item: "First thing"
    },
    {
     id: 2,
     item: "Second thing"

    },
    {
     id: 3,
     item: "Third thing"
    }
   ]
  }
 };
 render() {
  return (
   <div className="">
    <h2>React App</h2>
   </div>
  )
 }
}
