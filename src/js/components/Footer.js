import React from "react";
export default class Footer extends React.Component {
toggleHelp(state) {
 this.props.toggleHelp(state);
}
 render() {
  return (
   <footer>
    <button className="help-btn" onClick={()=>this.toggleHelp(true)}><i className="flaticon-question"></i> Hjälp</button>
     <div className="about-project-container">
      <p>Skapat av <a href="http://vilhelmfalkenmark.se" target="_blank">Vilhelm Falkenmark</a> med hjälp av <a href="https://facebook.github.io/react/" target="_blank">React.JS</a>, <a href="https://github.com/tylermcginnis/re-base" target="_blank">Rebase</a> & <a href="https://firebase.google.com/" target="_blank">Firebase.</a>.</p>
      </div>
   </footer>
  )
 }
}
