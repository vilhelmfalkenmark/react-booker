import React from "react";
import ReactDOM from "react-dom";
export default class User extends React.Component {
 constructor() {
 super();
 // this.state = {
 //
 // };
}
userStatus(role,id) {
this.props.userStatus(role,id);
}
userApprove(status,id) {
this.props.userApprove(status,id);
}

 render() {
  return (
   <li className="admin-user-container">
     <h4>Namn: {this.props.user.name}</h4>
     <h5>E-post (användarnamn): {this.props.user.email}</h5>
     <p>Bokningar: {this.props.user.bookings}</p>
     {
      this.props.user.role == "superadmin" ?
      <p>Roll: Superadministratör</p> : null
     }
      {
       this.props.user.role == "user" ?
         <div>
          <p>Roll: Användare</p>
          <button onClick={() => this.userStatus("admin", this.props.user.id)}>Sätt till admin</button>
         </div> : this.props.user.role == "admin" ?
         <div>
          <p>Roll: Administratör</p>
          <button onClick={() => this.userStatus("user", this.props.user.id)}>Sätt till status Användare</button>
         </div> : null
      }
      {
      this.props.user.approved && this.props.user.role != "superadmin" ?
      <div>
         <p>Status: Godkänd</p>
         <button onClick={() => this.userApprove(false, this.props.user.id)}>Spärra användare</button>
      </div> : this.props.user.approved != true && this.props.user.role != "superadmin" ?
      <div>
         <p>Status: Ej Godkänd</p>
         <button onClick={() => this.userApprove(true, this.props.user.id)}>Godkänn användare</button>
      </div> : null
      }
   </li>
  )
 }
}
