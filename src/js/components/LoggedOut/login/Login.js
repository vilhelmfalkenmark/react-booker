import React from "react";
import ReactDOM from "react-dom";

export default class Login extends React.Component {
 constructor() {
  super();
  this.state = {
   name: "",
   password: "",
   banned: false
  }
  window.history.pushState("object or string", "Title", "/logga-in");

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

 logIn(e) {
  e.preventDefault();
  this.props.logIn(this.state.name,this.state.password);
 }
//////////////////////////////////////////
///////// ÅTERSTÄLL LÖSENORD
//////////////////////////////////////////
resetPassword(e) {
e.preventDefault();
this.props.resetPassword(this.state.password);
}
 render() {
  return (
   <div className="form-container">
    <h1>Logga in</h1>
    {
     this.props.userDeleted ? <h2 className="danger-reminder">Användaren har raderats</h2> : null
    }
    <form className="" method="" action="">
      <label for="username">E-postadress</label>
      <input name="username"  type="email" onChange={::this.handleName} value={this.state.name} placeholder="Ange din e-postadress" required/>
      <label for="password">Lösenord</label>
      <input name="password" type="password" onChange={::this.handlePassword} value={this.state.password} placeholder="Ditt lösenord" required/>
      <button type="submit" className="log-in-btn" onClick={::this.logIn} >Logga in</button>
      {
       this.props.credentials != true ? <div>
       <p>Felaktigt användarnamn eller lösenord. Fyll i din e-postadress och klicka på knappen nedan om du vill återställa ditt lösenord.</p>
       <button className="reset-password-btn" onClick={::this.resetPassword}>Återställ lösenord</button>

      </div> : null
      }
      {
       this.props.userBanned ? <p>Kontouppgifterna stämmer men det här kontot är spärrat. Vänligen kontakta administratören för gruppen.</p>:null
      }
    </form>
   </div>
  )
 }
}
