import React from "react";
import ReactDOM from "react-dom";
import Container from "./Container.js";

import Rebase from 're-base';
var base = Rebase.createClass("https://react-booker.firebaseio.com/");

export default class Database extends React.Component {
 constructor() {
  super();

  this.state = {
   bookings: [],
   calender: [],
   loading: true
  }
 }

 componentDidMount(){
   this.ref = base.syncState('bookings', {
     context: this,
     state: 'bookings',
     asArray: true,
     then(){
       this.setState({loading: false})
     }
   });


  }
  bookMachine(bookings) { // HANTERA KALENDERVYN!
   this.setState({
    bookings:bookings
   })
  }





 render() {
  return (
   <div>
    {this.state.loading === true ? <h3> LOADING </h3> : <Container bookings={this.state.bookings} calender={this.state.calendar} bookMachine = {::this.bookMachine} />}
   </div>
  )
 }
}
