import React from "react";

export default class Me extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  info: props.user.info,
  name: props.user.name,
  updated: false,
  sure: false
 }
}
handleName(e) {
this.setState({
 name: e.target.value
})
}
handleInfo(e) {
this.setState({
 info: e.target.value
})
}
updateMe(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 this.props.updateMe(this.state.info,this.state.name);
 this.setState({
  updated: true
 })
}
deleteAccount(e) {
e.preventDefault(); // PREVENT FORM FROM RELOADING.
this.setState({
sure: true
})
if(this.state.sure) {
 this.props.updateMe("delete",false);
}
}
 render() {
  return (
   <div className="about-me-section">
       <h2 className="admin-header-me"><i className="flaticon-user"></i>{this.props.user.name}</h2>
       <ul>
        <li><i className="flaticon-bookmark"></i>ID: {this.props.user.id}</li>
        <li><i className="flaticon-mail"></i>E-postadress: {this.props.user.email}</li>
        <li><i className="flaticon-calendar-1"></i>Bokningar: {this.props.user.bookings}</li>
       </ul>
       <form className="" method="" action="">
         <label for="name">Namn</label>
         <input type="text" name="group-name" value={this.state.name} onChange={::this.handleName}/>
         <label for="info">Allmän information (syns för alla)</label>
         <textarea maxLength="200" value= {this.state.info} onChange={::this.handleInfo}></textarea>
          {
           this.state.updated ? <p className="success-reminder">Min information är uppdaterad </p> : null
          }
         <button type="submit" onClick={::this.updateMe}><i className="flaticon-rotate"></i>Uppdatera mitt konto</button>
          {
           this.state.sure ? <p className="danger-reminder">Är du helt säker? Det här kommandot kan inte ångras!</p> : null
          }
         <button className="delete-account-btn" onClick={::this.deleteAccount}>{ this.state.sure ? "Ja, radera mitt konto" : "Radera mitt konto" }</button>

       </form>
      </div>
  )
 }
}
