import React from "react";
export default class CookieInfo extends React.Component {
setCookie() {
 this.props.setCookie();
}
 render() {
  return (
   <div className="cookie-info-container">
    <button className="close-cookie" onClick={::this.setCookie}></button>

    <div className="cookie-info-inner-container">
      <p>Den här sidan använder kakor för att underlätta upplevelsen för dig som besökare. Du kan läsa mer om vad det innebär
       <a className="cookie-link" href="https://www.pts.se/cookies" target="_blank"> här.</a>
       </p>
    </div>
   </div>
  )
 }
}
