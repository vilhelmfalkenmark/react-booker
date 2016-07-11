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

 render() {
  return (
   <div className="form-container">
    <h1>Logga in</h1>
    <form className="" method="" action="">
      <h4>Användarnamn</h4>
      <input name="username" type="email" placeholder="Ange din mailadress" />
       <h4>Lösenord</h4>
      <input name="password" type="text" placeholder="Ditt lösenord" />
      <button type="submit" onClick="" >Logga in</button>
    </form>
   </div>
  )
 }
}
