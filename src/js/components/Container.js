import React from "react";
import ReactDOM from "react-dom";
import Logged_In_Container from "./logged_in/Logged_In_Container.js";
import Logged_Out_Container from "./logged_out/Logged_Out_Container.js";


import Rebase from 're-base';
var base = Rebase.createClass("https://react-booker.firebaseio.com/");

export default class Container extends React.Component {
 constructor() {
  super();
  let users = [
   {
    id: 14,
    name: "vilhelm falkenmark",
    additionalInfo: "lägenhet 4",
    bookings: 0
   },
   {
    id: 12,
    name: "fredrik löfgren",
    additionalInfo: "lägenhet 3",
    bookings: 0
   }
  ]

  this.state = {
   users: users,
   user: users[0],
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

  changeUser(userID) {
  let allUsers = this.state.users;
  for (var i = 0; i < allUsers.length; i++) {
   if(allUsers[i].id == userID)
   {
    this.setState({
     user: allUsers[i]
    })
   }
  }
  }

 render() {
  return (
   <div>
    {/*{this.state.loading === true ? <h3> LADDAR </h3> : <Logged_In_Container
     bookings={this.state.bookings}
     calender={this.state.calendar}
     bookMachine = {::this.bookMachine}

     changeUser = {::this.changeUser}
     user = {this.state.user}
     />}*/}
      <Logged_Out_Container />

   </div>
  )
 }
}
