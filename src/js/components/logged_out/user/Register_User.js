import React from "react";
import ReactDOM from "react-dom";
export default class Register_User extends React.Component {
 constructor() {
  super();
  this.state = {
    email: "",
    name: "",
    password: "",
    info: "",
    selectedGroup: ""
  };
 }

selectGroup(e) {
this.setState({
 selectedGroup: e.target.value
})
}


 handleEmail (e) {
  this.setState({
   email: e.target.value
  });
 };
 handleName (e) {
  this.setState({
   name: e.target.value
  });
 };
 handlePassword (e) {
  this.setState({
   password: e.target.value
  });
 };
 handleInfo (e) {
  this.setState({
   info: e.target.value
  });
 };
 registerUser(e) {
//   console.log("Knapp klickad!");
// console.log(this.state.selectedGroup);
 e.preventDefault(); // PREVENT FORM FROM RELOADING.

 let newUser = new Object();
 newUser.email = this.state.email;
 newUser.name = this.state.name;
 newUser.info = this.state.info;
 newUser.password = this.state.password;
 newUser.role = "user";
 newUser.bookings = 0;
 newUser.id = Date.now();
 newUser.key = Date.now();
 this.props.registerUser(newUser, this.state.selectedGroup)
 }


 render() {
  return (
   <div className="form-container register-container">
    <form className="" method="" action="">
      <h1>Registrera dig på förening</h1>
      <label for="email">E-post</label>
      <input type="email" name="email" placeholder="Mailadress" onChange={::this.handleEmail} value={this.state.email} required/>
      <label for="name">Fullständigt namn</label>
      <input type="text" name="name" placeholder="Namn" onChange={::this.handleName} value={this.state.name} required/>
      <label for="password">Lösenord</label>
      <input type="text" name="password" placeholder="Lösenord" onChange={::this.handlePassword} value={this.state.password} required/>
      <label for="info">Övrig info</label>
      <input type="text" name="info" placeholder="Övrig information (exempelvis lägenhetsnummer)" onChange={::this.handleInfo} value={this.state.info}/>
      <div>
       <label for="group">Förening</label>
       <select name="group" onChange={::this.selectGroup} value={this.state.groupName}>
       {
        this.props.groups.map(function(group) {
         return <option value={group.id} key = {group.id}>{group.groupName}</option>
        }, this) // The this is the context passed to the map function.
       }
       </select>
       <p>{this.state.selectedGroup}</p>
      </div>
      <button type="submit" onClick={::this.registerUser}>Skapa användare</button>
    </form>
   </div>
  )
 }
}
