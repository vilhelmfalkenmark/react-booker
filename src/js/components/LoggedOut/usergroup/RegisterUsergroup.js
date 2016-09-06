import React from "react";
import ReactDOM from "react-dom";
import Machine from "./Machine.js";
import Time from "./Times.js";

export default class RegisterUsergroup extends React.Component {
 constructor() {
  super();
  this.state = {
    name: "",
    id: "",
    maxBookings: "",
    setMax: false,
    selectedOption: "no",
    machines: [],
    amountofMachines: "",
    times: [],
    amountofTimes: "",
    weeks: "",
  };
  window.history.pushState("object or string", "Title", "/skapa-grupp");
 }

handleName(e) {
this.setState({
 name: e.target.value
})
}
/////////////////////////////////////////////
//// HANTERA MASKINER
////////////////////////////////////////////
 handleMachines (e) {
  let amountofMachines = parseInt(e.target.value);
  let machineArray = new Array();
  for (var i = 0; i < amountofMachines; i++) {
   machineArray.push("");
  }
  this.setState({
   machines: machineArray,
   amountofMachines: amountofMachines
  });
 };

addMachine(index,machineName) {
let machineArray = this.state.machines;
 machineArray.splice(index-1,1,machineName);
  this.setState({
   machines: machineArray
  })
}
/////////////////////////////////////////////
//// HANTERA TIDER
////////////////////////////////////////////
handleTimes (e) {
 let amountofTimes = parseInt(e.target.value);
 let timeArray = new Array();
 for (var i = 0; i < amountofTimes; i++) {
  timeArray.push("");
 }
 this.setState({
  times: timeArray,
  amountofTimes: amountofTimes
 });
};

addTime (index,timeInterval) {
let timeArray = this.state.times;
timeArray.splice(index-1,1,timeInterval);
 this.setState({
  timeArray: timeArray
 })
}
/////////////////////////////////////////////
//// SÄTT MAXIMALT BOKNINGAR PER PERSON
////////////////////////////////////////////
toggleMax() {
 var toggle;
 if(this.state.setMax) {
  toggle = false;
  this.setState({
   maxBookings: ""
  })
 }
 else {
  toggle = true;
 }
 this.setState({
  setMax: toggle
 })
}
setMax(e) {
 let maxValue = parseInt(e.target.value)
 if(maxValue > 999) {
  maxValue = 999;
 }
 this.setState({
  maxBookings: maxValue
 })
}
//////////////////////////////////////////
///////// SÄTT VECKOR
//////////////////////////////////////////
handleWeeks(e) {
 let weeks = parseInt(e.target.value)
 this.setState({
  weeks: weeks
 })
}
/////////////////////////////////////////////
//// REGISTRERA GRUPP
////////////////////////////////////////////
 registerGroup(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 let verify = false;
 let group = {
  groupName: this.state.name,
  times: this.state.times,
  machines: this.state.machines,
  users: [""],
  bookings: [""],
  maxBookings: this.state.maxBookings,
  weeks: this.state.weeks,
  id: Date.now(),
  key: Date.now()
 }

 if(group.groupName == "" || group.machines == "" || group.times == "" || group.weeks == "") {
  this.props.alert(true,"fail-group",false)
 } else {
  this.props.registerGroup(group);
  this.props.alert(true,"success-group",group)
 }
 }
 render() {
  let machineIndex = 0;
  let timeIndex = 0;
  return (
   <div className="form-container register-container">
    <form className="" method="" action="">
      <h1>Skapa ny grupp</h1>
      <label for="groupName">Gruppens namn</label>
      <input type="text" name="groupName" placeholder="Gruppens namn"
       onChange={::this.handleName}
       value={this.state.name} required/>
      <label for="machines">Antal maskiner</label>
      <input type="number" min="0" name="machines" placeholder="Antal maskiner"
       onChange={::this.handleMachines}
       value={this.state.amountofMachines} required/>
       {
        this.state.machines.length > 0 ?
        this.state.machines.map(function(machine) {
         machineIndex++;
         return  <Machine key = {machineIndex} index={machineIndex} addMachine={::this.addMachine}/>
        }, this) : null // The this is the context passed to the map function.
       }
       <label for="times">Antal tider</label>
       <input type="number" min="0" name="times" placeholder="Antal tider" onChange={::this.handleTimes} value={this.state.amountofTimes} required/>
        {
         this.state.times.length > 0 ?
         this.state.times.map(function(time) {
          timeIndex++;
          return  <Time key = {timeIndex} index={timeIndex} addTime={::this.addTime}/>
         }, this) : null // The this is the context passed to the map function.
        }
        <label for="weeks">Veckor</label>
        <input type="number" min="0" max="5" name="weeks" placeholder="Hur många veckor framåt ska man kunna boka?" onChange={::this.handleWeeks} value={this.state.weeks} required/>
        <label>Sätt maximalt antal bokningar per person</label>
        <div className="radiobutton-container">
         <div className="radiobutton-row">
         <input
          type="radio"
          id="r2"
          className="radiobutton no-setmax"
          name="setMax"
          value="no"
          onChange={()=> this.setState({setMax: false, selectedOption: "no"})}
          checked={this.state.selectedOption === 'no'} />
         <label for="r2">Nej</label>
         </div>
          <div className="radiobutton-row">
          <input
           type="radio"
           id="r1"
           className="radiobutton yes-setmax"
           name="setMax"
           value="yes"
           onChange={()=> this.setState({setMax: true, selectedOption: "yes"})}
           checked={this.state.selectedOption === 'yes'} />
          <label for="r1">Ja</label>
          </div>

        </div>
         {
          this.state.setMax ?
          <div>
           <label for="maxBookings">Maximalt antal bokningar samtidigt per medlem</label>
           <input type="number" min="0" max="1000" name="maxBookings" placeholder="0" value={this.state.maxBookings} onChange={::this.setMax} required/>
          </div> : null
         }
      <button type="submit" className="create-group-btn" onClick={::this.registerGroup}><i className="flaticon-controls"></i>Skapa Grupp</button>
    </form>
   </div>
  )
 }
}
