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
    machines: [],
    amountofMachines: "",
    times: [],
    amountofTimes: ""
  };
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
this.setState({
 maxBookings: e.target.value
})
}
/////////////////////////////////////////////
//// REGISTRERA GRUPP
////////////////////////////////////////////
 registerGroup(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 let group = new Object();
 group.groupName = this.state.name;
 group.times = this.state.times;
 group.machines = this.state.machines;
 group.users = [""];
 group.bookings = [""];
 group.maxBookings = this.state.maxBookings;
 group.id = Date.now();
 group.key = Date.now();
 console.log(this.state.maxBookings);


 this.props.registerGroup(group);
 }
 render() {
  let machineIndex = 0;
  let timeIndex = 0;
  return (
   <div className="form-container register-container">
    <form className="" method="" action="">
      <h1>Skapa ny förening</h1>
      <label for="groupName">Föreningens namn</label>
      <input type="text" name="groupName" placeholder="Föreningens namn"
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
         }, this) : "" // The this is the context passed to the map function.
        }
        <label>Sätt maximalt antal bokningar per person</label>
        <div className="checkbox-container">
         <input type="checkbox" className="checkbox" name="setMax" onChange={::this.toggleMax} checked={this.state.setMax}/>
          {
           this.state.setMax ?  <label for="setMax">JA</label> : <label for="setMax">NEJ</label>
          }
        </div>
         {
          this.state.setMax ?
          <div>
           <label for="maxBookings">Maximalt antal bokningar samtidigt per medlem</label>
           <input type="number" min="0" name="maxBookings" placeholder="0" onChange={::this.setMax} />
          </div> : null
         }
      <button type="submit" className="create-group-btn" onClick={::this.registerGroup}>Skapa ny användargrupp</button>
    </form>
   </div>
  )
 }
}
