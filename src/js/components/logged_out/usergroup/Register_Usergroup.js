import React from "react";
import ReactDOM from "react-dom";
import Machine from "./Machine.js";
import Time from "./Times.js";

export default class Register_Usergroup extends React.Component {
 constructor() {
  super();
  this.state = {
    name: "",
    id: "",
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
/*###########################################
 ############################################
 MACHINES
 ############################################
 ############################################*/
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

/*###########################################
############################################
TIMES!
############################################
############################################*/
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
 registerGroup(e) {
 e.preventDefault(); // PREVENT FORM FROM RELOADING.
 let group = new Object();
 group.groupName = this.state.name;
 group.times = this.state.times;
 group.machines = this.state.machines;
 group.users = [""];
 group.bookings = [""];
 group.id = Date.now();
 group.key = Date.now();
 this.props.registerGroup(group);
 }
 render() {
  let machineIndex = 0;
  let timeIndex = 0;
  return (
   <div className="form-container register-container">
    <form className="" method="" action="">
      <h1>Skapa ny förening</h1>
      <h3>Föreningens namn</h3>
      <input type="text" name="groupName" placeholder="Föreningens namn"
       onChange={::this.handleName}
       value={this.state.name} required/>
       <h3>Antal maskiner</h3>
      <input type="number" name="machines" placeholder="Antal maskiner"
       onChange={::this.handleMachines}
       value={this.state.amountofMachines} required/>
       {
        this.state.machines.length > 0 ?
        this.state.machines.map(function(machine) {
         machineIndex++;
         return  <Machine key = {machineIndex} index={machineIndex} addMachine={::this.addMachine}/>
        }, this) : "" // The this is the context passed to the map function.
       }
       <h3>Antal tider</h3>
       <input type="number" name="times" placeholder="Antal tider" onChange={::this.handleTimes} value={this.state.amountofTimes} required/>
        {
         this.state.times.length > 0 ?
         this.state.times.map(function(time) {
          timeIndex++;
          return  <Time key = {timeIndex} index={timeIndex} addTime={::this.addTime}/>
         }, this) : "" // The this is the context passed to the map function.
        }
      <button type="submit" onClick={::this.registerGroup}>Skapa ny användargrupp</button>
    </form>
   </div>
  )
 }
}
