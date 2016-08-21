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
   // <div className="admin-user-container col-4-desk">

    <div className="user-card-container">
      {/* <div className="face-container"> </div> */}
      <div className="adress-text-container">
      <div className="user-info-row"><i className="icon fa fa-user"></i><div className="user-info-row-info"><h3>{this.props.user.name} </h3></div></div>
       <div className="user-info-row"><i className="icon fa fa-user">
      </i><div className="user-info-row-info">{this.props.user.role == "user" ? "Användare": this.props.user.role == "admin" ? "Administratör" : "Superadministratör" }
     </div> </div>
      <div className="user-info-row"><i className="icon fa fa-envelope"></i><div className="user-info-row-info">{this.props.user.email}</div></div>
      <div className="user-info-row"><i className="icon fa fa-calendar-check-o"></i><div className="user-info-row-info">{this.props.user.bookings}</div></div>
      <div className="user-info-row"><i className="icon fa fa-info-circle"></i> <div className="user-info-row-info">{this.props.user.info}</div></div>
       {
        this.props.user.role == "user" ?
            <button className="admin-set-admin" onClick={() => this.userStatus("admin", this.props.user.id)}>Användare</button>
            : this.props.user.role == "admin" ?
             <button className="admin-set-user" onClick={() => this.userStatus("user", this.props.user.id)}>Administratör</button>

          : null
       }
       {
       this.props.user.approved && this.props.user.role != "superadmin" ?
         <button className="admin-ban-user" onClick={() => this.userApprove(false, this.props.user.id)}>Godkänd</button>
       : this.props.user.approved != true && this.props.user.role != "superadmin" ?
         <button className="admin-approve-user" onClick={() => this.userApprove(true, this.props.user.id)}>Ej Godkänd</button>

        : null
       }


      </div>



    </div>
  )
 }
}
