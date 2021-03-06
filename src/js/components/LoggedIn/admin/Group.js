import React from "react";

export default class Group extends React.Component {
constructor(props) {
 super(props);
 this.state = {
  groupName: props.groupName,
  maxBookings: props.maxBookings,
  weeks: props.weeks
 }
}
handleGroupName(e) {
this.setState({
 groupName: e.target.value
})
}
handleMaxBookings(e) {
let c = parseInt(e.target.value)
this.setState({
 maxBookings: c
})
}
handleWeeks(e) {
 let w = parseInt(e.target.value)
 this.setState({
  weeks: w
 })
}



updateGroup(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 this.props.updateGroup(this.state.groupName,this.state.maxBookings,this.state.weeks);
 this.setState({
  updated: true
 })
}
 render() {
  return (
   <section className="general-info-section">
       <h2 className="admin-header-general"><i className="flaticon-controls"></i>Allmän info</h2>
       <form className="" method="" action="">
         <label for="group-name">Namn på förening</label>
         <input type="text" name="group-name" value={this.state.groupName} onChange={::this.handleGroupName}/>
         <label for="max-bookings">Max antal bokningar per användare</label>
         <input type="number" min="0" name="max-bookings" value={this.state.maxBookings} onChange={::this.handleMaxBookings}/>
          <label for="weeks">Veckor</label>
          <input type="number" min="0" name="weeks" value={this.state.weeks} onChange={::this.handleWeeks}/>
          {
           this.state.updated ? <p className="success-reminder">Gruppens information uppdaterad </p> : null
          }
         <button type="submit" onClick={::this.updateGroup}><i className="flaticon-rotate"></i>Uppdatera grupp</button>


       </form>
      </section>
  )
 }
}
