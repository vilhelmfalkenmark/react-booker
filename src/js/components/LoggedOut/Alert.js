import React from "react";
import ReactDOM from "react-dom";
export default class Alert extends React.Component {
closeAlert() {
 this.props.alert(false,"",false)
}
userLink(groupID) {

this.props.userLink(groupID)

}
 render() {
  return (
   <div className= "modal-background">
    <div className="modal-clickarea" onClick={::this.closeAlert}></div>
    <div className="modal-container">
     <div className="modal-inner-container">
      <button className="close-modal-btn" onClick={::this.closeAlert}><i class="flaticon-cancel"></i></button>
       {
          //////////////////////////////////
          /// fail-group
          //////////////////////////////////
         this.props.type == "fail-group" ?
         <p>Gruppen kunde inte skapas eftersom du inte har fyllt i alla fälten korrekt</p> :
          //////////////////////////////////
          /// success-group
          //////////////////////////////////
          this.props.type == "success-group" ?
          <div className="success-group-container">
          <h1 className="success">Grattis, Gruppen <i>{this.props.data.groupName}</i> har skapats!</h1>
          <p>Nästa steg är att skapa ett användarkonto och registera dig som första användare i gruppen.<br></br>
          Eftersom du skapade gruppen kommer du automatiskt bli superadministratör med möjlighet att ändra inställningar för gruppen.</p>
         <h2 className="success">Sammanfattning för gruppen:</h2>
           <h3 className="">ID: {this.props.data.id}</h3>
           <span className="warning">Ovanstående ID sparas i sidhuvudet tills dess att du har skapat en användare</span>
          <h3>Max antal bokningar per medlem: {this.props.data.maxBookings != "" ? this.props.data.maxBookings : "Ej satt"}</h3>
          <h3>Veckor i kalender: {this.props.data.weeks}</h3>
          <h3>Maskiner</h3>
           <ul>
           {
            this.props.data.machines.map(function(machine, index) {
             return <li key = {index}><i className="flaticon-checked-1"></i>{machine}</li>
            })
           }
           </ul>
           <h3>Tider</h3>
            <ul>
            {
             this.props.data.times.map(function(time, index) {
              return <li key = {index}><i className="flaticon-checked-1"></i>{time}</li>
             })
            }
            </ul>
            <h3 className="text-center">Steg 2. Skapa användare</h3>
            <button className="create-user-link-btn" onClick={() => this.userLink(this.props.data.id)}>Skapa användare</button>

           </div> :
           //////////////////////////////////
           /// fail-user
           //////////////////////////////////
            this.props.type == "fail-user-missing-fields" ? <p>Vänligen fyll i samtliga fält</p> :
            this.props.type == "fail-user" ?
            <p>
             {
              this.props.data == "auth/invalid-email" ? "Ogiltig mailadress" :
              this.props.data == "auth/weak-password" ? "Lösenordet måste vara minst 6 tecken" :
              this.props.data == "auth/email-already-in-use" ? "Det finns redan ett konto registrerat med den här E-post adressen" : null
             }
            </p> : null
       }
      </div>
      </div>
      </div>
  )
 }
}
