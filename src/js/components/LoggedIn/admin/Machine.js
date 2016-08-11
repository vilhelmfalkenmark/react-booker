import React from "react";


export default class Machine extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
  machine: props.machine
 };
}
editMachine(e) {
this.setState({
  machine: e.target.value
})
this.props.editMachine(this.state.machine,this.props.index);
}
 render() {
  return (
   <li className="">
   <input value={this.state.machine} onChange={::this.editMachine}/>
   <button>Radera</button>
   </li>
  )
 }
}
