import React from "react";
import ReactDOM from "react-dom";
export default class Login extends React.Component {
 constructor() {
  super();
  this.state = {
   name: "",
   password: ""
  }
 }

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
 login(e) {
  e.preventDefault();
  this.props.login(this.state.name,this.state.password);
 }
 render() {
  return (
   <div className="form-container">
    <h1>Logga in</h1>
    <form className="" method="" action="">
      <h4>Användarnamn</h4>
      <h4>hej@hej.se</h4>
      <input name="username" type="email" onChange={::this.handleName} value={this.state.name} placeholder="Ange din mailadress" />
      <h4>Lösenord</h4>
      <h4>hej</h4>
      <input name="password" type="text" onChange={::this.handlePassword} value={this.state.password} placeholder="Ditt lösenord" />
      <button type="submit" onClick={::this.login} >Logga in</button>
    </form>
   </div>
  )
 }
}
