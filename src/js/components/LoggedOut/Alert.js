import React from "react";
import ReactDOM from "react-dom";
export default class Alert extends React.Component {
closeAlert() {
 this.props.alert(false,"",false)
}
 render() {
  return (
   <div className= "modal-background">
    <div className="modal-container">
     <div className="modal-inner-container">
      <button onClick={::this.closeAlert}>Stäng</button>
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
          <div>
          <h2>Gruppen {this.props.data.groupName} har skapats.</h2>
           <p>Gå nu vidare till att registera den första användaren på gruppen.
           Eftersom du skapade gruppen kommer du automatiskt bli superadministratör med möjlighet att ändra inställningar för gruppen.</p>
          <h3>Sammanfattning för gruppen</h3>
          <h4>ID: {this.props.data.groupName}</h4>
          <h4>Max antal bokningar per medlem: {this.props.data.maxBookings != "" ? this.props.data.maxBookings : "Ej satt"}</h4>
          <h4>Maskiner</h4>
           <ul>
           {
            this.props.data.machines.map(function(machine, index) {
             return <li key = {index}>{machine}</li>
            })
           }
           </ul>
           <h4>Tider</h4>
            <ul>
            {
             this.props.data.times.map(function(time, index) {
              return <li key = {index}>{time}</li>
             })
            }
            </ul>
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
              // this.props.type == "password-sent" ? <p>Ett mail har skickats till den angivna e-postadressen med instruktioner till hur du återställer ditt lösenord.</p> :
              // null

       }

      </div>
      </div>
      </div>
  )
 }
}
