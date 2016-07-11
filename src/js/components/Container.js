import React from "react";
import ReactDOM from "react-dom";
import LoggedIn from "./logged_in/LoggedIn.js";
import LoggedOut from "./logged_out/LoggedOut.js";
import Rebase from 're-base';
var base = Rebase.createClass("https://react-booker.firebaseio.com/");

export default class Container extends React.Component {
 constructor() {
  super();
  this.state = {
   loggedIn: false,
   user: null,
   userGroup: null
  }
 }

 componentDidMount(){
   // this.ref = base.syncState('bookings', {
   //   context: this,
   //   state: 'bookings',
   //   asArray: true,
   //   then(){
   //     this.setState({loading: false})
   //   }
   // });
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
      <LoggedOut />

   </div>
  )
 }
}
