import React from "react";
// import ReactDOM from "react-dom";
export default class RegisterUser extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
    info: "",
    selectedGroup: false,
    checkboxSelected: false,
    searchID: props.linkedID || ""
  };
  window.history.pushState("object or string", "Title", "/skapa-anvandare");

 }
selectGroup(id) {
this.setState({
 selectedGroup:id
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
 repeatPassword (e) {
  this.setState({
   repeatPassword: e.target.value
  });
 };

 handleInfo (e) {
  this.setState({
   info: e.target.value
  });
 };




//////////////////////////////////////////
///////// SÖK EFTER FÖRENING MED ID
//////////////////////////////////////////
handleID(e) {
 let id = parseInt(e.target.value)
 this.setState({
  searchID: id
 });

}
//////////////////////////////////////////
///////// REGISTRERA ANVÄNDARE
//////////////////////////////////////////
 registerUser(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 let newUser = new Object();
 newUser.email = this.state.email;
 newUser.name = this.state.name;
 newUser.info = this.state.info;
 newUser.password = this.state.password;
 newUser.bookings = 0;
 newUser.id = Date.now();
 newUser.key = Date.now();
 this.props.registerUser(newUser, this.state.selectedGroup)
 }
//////////////////////////////////////////
///////// RENDER
//////////////////////////////////////////
 render() {
  let matchedGroups = this.props.groups.filter(
   (group) => {
    return group.id == this.state.searchID
   }
 );

 if(this.state.checkboxSelected &&
    this.state.password == this.state.repeatPassword &&
    this.state.password != "" &&
    this.state.name != "" &&
    this.state.email != ""
 ) {
  var submitButton = <button type="submit" className="create-user-btn" onClick={::this.registerUser}><i className="flaticon-user"></i>Skapa användare</button>
 } else {
  submitButton =  <button className="disabled-btn"><i className="flaticon-user"></i>Skapa användare</button>
 }

 var passwordMessage;
 if(this.state.password == this.state.repeatPassword && this.state.password == "") {
  passwordMessage = null;
 }
 else if(this.state.password == this.state.repeatPassword && this.state.password != "") {
  passwordMessage =  <p className="success">Lösenorden överenstämmer</p>
 }
 else {
  passwordMessage =  <p className="warning">Lösenorden överenstämmer inte</p>
 }

  return (
   <div className="form-container register-container">
    <form className="" method="" action="">
      <h1>Skapa ny användare</h1>
      <label for="email">E-post</label>
      <input type="email" name="email" placeholder="Mailadress" onChange={::this.handleEmail} value={this.state.email} required/>
      <label for="name">Fullständigt namn</label>
      <input type="text" name="name" placeholder="Namn" onChange={::this.handleName} value={this.state.name} required/>
      <label for="password">Lösenord</label>
      <input type="password" name="password" placeholder="Lösenord" onChange={::this.handlePassword} value={this.state.password} required/>
      <label for="repeatpassword">Upprepa Lösenord</label>
      <input type="password" name="repeatpassword" placeholder="Upprepa Lösenord" onChange={::this.repeatPassword} value={this.state.repeatPassword} required/>
      {
      passwordMessage
      }
      <label for="info">Övrig info</label>
      <input type="text" name="info" maxLength="250" placeholder="Övrig information (exempelvis lägenhetsnummer)" onChange={::this.handleInfo} value={this.state.info}/>
      <div>
      <label for="groupID">Ange Föreningens id (10-14 siffror)</label>
      <input type="number" min="0" name="groupID"
       value={this.state.searchID}
       placeholder="Föreningens id"
       onChange={::this.handleID}/>
      {
       this.state.searchID == "" ? null :
       isNaN(this.state.searchID) ? null :
       matchedGroups.length == 0 ? <p class="warning">Ingen grupp hittad</p> :
       matchedGroups.map(function(group, index) {
        return <div key={index}>
         <h4>En grupp hittad:</h4>
          <div className="checkbox-container">
           <input type="checkbox"
                  className="checkbox"
                  name="group-checkbox"
                  onChange = {() => this.selectGroup(group.id, this.checked)}
                  onClick = {() => this.setState({checkboxSelected: !this.state.checkboxSelected})}
                  checked = {this.props.selectedGroup ? "checked":null}
            />
           <label for="group-checkbox">{group.groupName}</label>
          </div>
         </div>
       }, this)
      }
      </div>
      {
       submitButton
      }
    </form>
   </div>
  )
 }
}
