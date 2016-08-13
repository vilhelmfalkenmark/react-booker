import React from "react";
export default class Warning extends React.Component {
 closeWarning() {
  this.props.closeWarning();
 }

 render() {
  return (
   <div className="warning-container">
    <div className="warning-inner-container">
     Du har försöket boka fler maskiner än man får. Max är {this.props.max}
     <button onClick={::this.closeWarning}>Stäng</button>
    </div>
   </div>
  )
 }
}
