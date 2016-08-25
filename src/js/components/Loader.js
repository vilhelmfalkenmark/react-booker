import React from "react";
export default class Loader extends React.Component {

 render() {
  return (
   <div className="loader-wall">
    <div>
     {
       <h1>Laddar data</h1>
     }
   <div class="spinner">
     <div class="double-bounce1"></div>
     <div class="double-bounce2"></div>
   </div>
    </div>
   </div>
  )
 }
}
