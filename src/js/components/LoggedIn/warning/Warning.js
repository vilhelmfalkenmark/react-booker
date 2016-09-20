import React from "react";
export default class Warning extends React.Component {
 closeWarning() {
  this.props.closeWarning();
 }

 render() {
  return (
   <div className="warning-container">
    <button className="close-warning" onClick={::this.closeWarning}><i className="flaticon-cancel"></i></button>
    <div className="warning-inner-container">
     <p>Maximalt antal maskiner/enheter som får vara bokade samtidigt är {this.props.max} stycken. <br/>
     Vänligen avboka någon av dina andra bokningar alternativt kontakta administratören
     <a className="warning-link" href={"mailto:"+this.props.admin.email}> {this.props.admin.name} </a>
     för att höja maxantalet.</p>
    </div>
   </div>
  )
 }
}
