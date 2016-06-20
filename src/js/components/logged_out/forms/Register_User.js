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
 e.preventDefault(); // PREVENT FORM FROM RELOADING.

 let newUser = new Object();
 newUser.email = this.state.email;
 newUser.password = this.state.password;
 newUser.name = this.state.name;
 newUser.info = this.state.info;
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
      <h3>Registrera dig på förening</h3>
      <p>Mailadress</p>
      <label for="email">E-post</label>
      <input type="email" name="email" placeholder="Mailadress" onChange={::this.handleEmail} value={this.state.email} required/>
      <label for="name">Fullständigt namn</label>
      <input type="text" name="name" placeholder="Namn" onChange={::this.handleName} value={this.state.name} required/>
      <label for="password">Lösenord</label>
      <input type="text" name="password" placeholder="Lösenord" onChange={::this.handlePassword} value={this.state.password} required/>
      <label for="info">Övrig info</label>
      <input type="text" name="info" placeholder="Övrig information (exempelvis lägenhetsnummer)" onChange={::this.handleInfo} value={this.state.info}/>
      <select>
       {
        this.props.groups.map(function(group) {
         return <option>{group.groupName}</option>
        })
       }
      </select>

      <button type="submit" onClick={::this.registerUser}>Skapa användare</button>
    </form>
   </div>
  )
 }
}
