import React from "react";
import Time from "./Time.js";

export default class TimeAndMachines extends React.Component {

constructor(props) {
 super(props);
 this.state = {
  times: props.times,
  timeChanged: false
 }
}


 //////////////////////////////////////////
 /////  FUNKTIONER
 //////////////////////////////////////////
 editTime(index,name) {
  this.props.editTime(index, name);
  this.setState({
   timeChanged: true
  })
 }
 deleteTime(index) {
  this.props.deleteTime(index)
  this.setState({
   timeChanged: true
  })
 }
 addTime() {
  this.props.addTime()
  this.setState({
   timeChanged: true
  })
 }
 saveTimes() {
   this.props.saveTimes()
   this.setState({
    timeChanged: false
   })
 }

 render() {
  return (
   <div className="admin-time-section">
    <h2 className="admin-header-time-machines"><i className="flaticon-time-1"></i>Tider</h2>
    <ul className="time-machine-list">
    {
      this.props.times.map(function(time,index) {
      return <Time
       time = {time}
       key = {index}
       index = {index}
       editTime = {::this.editTime}
       deleteTime = {::this.deleteTime}
      />;
      }.bind(this)
    )
    }
     </ul>
     <div className="add-btn-container">
      <button className="add-btn" onClick={::this.addTime}><i className="flaticon-add"></i></button>
       <span>Lägg till tid</span>
     </div>

     {
       this.state.timeChanged ? <p className="danger-reminder">Klicka på uppdatera nedan för att spara dina ändringar</p> : null
      }
     <button className="update-btn" onClick={::this.saveTimes}><i className="flaticon-rotate"></i>Uppdatera tider</button>
  </div>

  )
 }
}
