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
     <h3>Namn: {this.props.user.name}</h3>
     <div className="admin-user-info">
       <span className="admin-user-name">Användarnamn: {this.props.user.email}</span>
       <span>Bokningar: {this.props.user.bookings}</span>
     </div>
     {
      this.props.user.role == "superadmin" ?
      <p>Roll: Superadministratör</p> : null
     }
      {
       this.props.user.role == "user" ?
        <div className="admin-block-container">
          <div className="admin-left-block">
           <p>Roll: Användare</p>
          </div>
          <div className="admin-right-block">
           <button className="admin-set-admin" onClick={() => this.userStatus("admin", this.props.user.id)}>Sätt till admin</button>
          </div>
         </div> : this.props.user.role == "admin" ?
         <div className="admin-block-container">
           <div className="admin-left-block">
            <p>Roll: Administratör</p>
           </div>
           <div className="admin-right-block">
            <button className="admin-set-user" onClick={() => this.userStatus("user", this.props.user.id)}>Sätt till status Användare</button>
           </div>
          </div>
         : null
      }
      {
      this.props.user.approved && this.props.user.role != "superadmin" ?
      <div className="admin-block-container">
        <div className="admin-left-block">
         <p>Status: Godkänd</p>
        </div>
        <div className="admin-right-block">
         <button className="admin-ban-user" onClick={() => this.userApprove(false, this.props.user.id)}>Spärra användare</button>
        </div>
       </div>
      : this.props.user.approved != true && this.props.user.role != "superadmin" ?
      <div className="admin-block-container">
        <div className="admin-left-block">
         <p>Status: Ej Godkänd</p>
        </div>
        <div className="admin-right-block">
         <button className="admin-approve-user" onClick={() => this.userApprove(true, this.props.user.id)}>Godkänn användare</button>
        </div>
       </div>
: null
      }
   </li>
  )
 }
}
