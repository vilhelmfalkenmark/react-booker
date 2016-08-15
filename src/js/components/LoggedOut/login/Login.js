import React from "react";
import ReactDOM from "react-dom";
export default class Login extends React.Component {
 constructor() {
  super();
  this.state = {
   name: "hej@hej.se",
   password: "hejsan"
  }
 }

 handleName (e) {
  this.setState({
   name: e.target.value
  });
 };

 sayHi(e) {
  e.preventDefault();

  this.props.sayHi();

 }


 handlePassword (e) {
  this.setState({
   password: e.target.value
  });
 };
 logIn(e) {
  e.preventDefault();
  this.props.logIn(this.state.name,this.state.password);
 }
 render() {
  return (
   <div className="form-container">
    <h1>Logga in</h1>
    <form className="" method="" action="">
      <label for="username">Användarnamn</label>
      <input name="username"  type="email" onChange={::this.handleName} value={this.state.name} placeholder="Ange din mailadress" />
      <label for="password">Användarnamn</label>
      <input name="password" type="text" onChange={::this.handlePassword} value={this.state.password} placeholder="Ditt lösenord" />
      <button type="submit" className="log-in-btn" onClick={::this.logIn} >Logga in</button>
    </form>
   </div>
  )
 }
}
