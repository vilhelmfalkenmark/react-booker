import React from "react";
import User from "./User.js";
export default class Users extends React.Component {
userStatus(role,id) {
this.props.userStatus(role,id);
}
userApprove(status,id) {
this.props.userApprove(status,id);
}


 render() {
  return (
   <div>
   <h2 className="admin-header-users"><i className="flaticon-users"></i>Användare i grupp {this.props.groupName}</h2>
   <div className="flex-row">
    {
      this.props.users.map(function(user) {
      return <User // USER
      user = {user}
      key = {user.key}
      userStatus = {::this.userStatus}
      userApprove = {::this.userApprove}
      role = {this.props.role} // Status på den inloggade personen
      />;
      }.bind(this))
    }

   </div>
   </div>

  )
 }
}
