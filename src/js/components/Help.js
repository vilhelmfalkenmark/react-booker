import React from "react";
export default class Help extends React.Component {

toggleHelp() {
 this.props.toggleHelp(false);
}
 render() {
  return (
   <div className= "modal-background">
    <div className="modal-clickarea" onClick={::this.toggleHelp}></div>
    <div className="modal-container help-modal">
     <div className="modal-inner-container">
      <section>
      <h2>Utloggat läge</h2>
      <h3>Skapa grupp</h3>
      <p>Om du har för avsikt att skapa en ny grupp/förening som andra personer senare kan ansluta sig till så ska du <span className="important">börja med att skapa en grupp innan du skapar ett användarkonto.</span>
      Fälten där är relativt självförklarande men följande kan vara värt att förtydliga:</p>
      <ul>
       <li>I fältet "maskiner" anger du vilka maskiner ni har i er tvättstuga. Exempelvis "torktumlare", "Den vänstra tvättmaskinen etc.". Om man inte ska kunna boka maskinerna individuellt så kan du bara fylla i att det är en maskin och att det är tvättstugan.</li>
       <li>I fältet "tider" så anger du hur många tidsintervall det finns i er tvättstuga och sedan själva tidsintervallen. Exempelvis 11-13, 13-15 etc.</li>
       <li>I fältet "veckor" så anger du hur många veckor framåt i tiden som er kalender ska sträcka er från den aktuella dagen. Ange värdet med en siffra, exempelvis 3.</li>
       <li>Maximalt antal bokningar innebär precis vad det låter som. Kan vara bra att inte låta en användare boka mer än exempelvis 10 tider samtidigt.</li>
      </ul>
      <p>Efter att du har fyllt i fälten så skapas gruppen och du får ett Grupp-ID som består av 10-14 siffror. Använd dig av det när du sedan ska registrera ditt konto för att lägga till din användare i gruppen.
      <span className="important">Den första personen som går med i gruppen blir automatiskt superadministratör med möjlighet att redigera gruppens inställningar. Observera att det inte går att radera en skapad grupp från applikationens gränssnitt!</span></p>
    <h3>Skapa användare</h3>
    <p>Följ fältens angivelser. Du behöver ange gruppens ID för att kunna gå med i en grupp. Be adminstratören om de uppgifterna.</p>
    <h3>Logga in</h3>
    <p>Logga in med dina uppgifter. Har du glömt ditt lösenord kan du lämna fälten tomma och klicka på logga in. Du kommer då kunna återställa ditt lösenord genom att fylla i din E-post adress och sedan klicka på "Återställ lösenord". Ett mail skickas den till angivna E-post adressen med vidare instruktioner.</p>
      </section>
      <section>
       <h2>Inloggat läge</h2>
       <h3>Boka maskiner</h3>
       <p>När du ska boka en maskin på en tid så räcker det med att du bockar i rutan för maskinen du vill boka. Du behöver inte klicka på spara någonstans utan det sparas automatiskt.</p>
       <h3>Redigera grupp</h3>
       <p>Är du adminstratör för gruppen så kan du redigare gruppens inställningar, exempelvis ändra tider och maskiner (alla bokningar måste då vara borttagna). Du kan även spärra användare, tilldela andra användare adminstratörstatus, ta bort andra användares bokningar etc.</p>
       <p>Nästan alla data hanteras asynkront, dvs. du behöver inte klicka på spara. Det finns dock några undantag då du faktiskt behöver klicka på uppdatera, detta framgår då tydligt. Detta är gjort medvetet för att optimera applikationens prestanda.</p>
       </section>
      <section>
      <h2>Om tvättstugebokaren</h2>
      <h3>Användarvillkor</h3>
      <p>Tvättstugebokaren är inte registrerat varumärke utan är en webbapplikation som är helt gratis att använda. Jag som uppehovsman till produkten friskriver mig från allt ansvar för eventuella konsekvenser som användning av applikationen kan komma att leda till. Jag förbehåller mig också rätten att närsomhelst stänga ned applikationen om
       jag inte känner att den fyller sitt syfte.
      </p>
      <h3>Hantering av uppgifter</h3>
      <p>Dina användaruppgifter lagras i <a href="" target="_blank" >Firebase</a> som är en google-produkt. Dina uppgifter kommer inte under några omständigheter spridas vidare till en tredjepart.
       Ditt lösenord är även helt skyddad och ingen annan i gruppen, oavsett roll, kan se ditt lösenord.
      </p>
      <h3>Problem</h3>
      <p>Har du några problem med applikationen eller undrar något som inte har svarats på här så är du varmt välkommen att <a href="mailto:info@vilhelmfalkenmark.se">maila.</a> Mailen besvaras i mån av tid.</p>
      <h3>Teknisk information</h3>
      <p>Tvättstugebokaren är byggt på <a href="https://facebook.github.io/react/" target="_blank">React.JS</a>, <a href="https://github.com/tylermcginnis/re-base" target="_blank">Rebase</a> & <a href="https://firebase.google.com/" target="_blank">Firebase.</a></p>
      <p>Ikoner kommer från <a href="http://www.flaticon.com/" target="_blank">Flaticon</a>. Till projekt på <a href="https://github.com/vilhelmfalkenmark/react-booker" target="_blank">Github</a></p>
      </section>
      <p>Tvättstugebokaren är helt gratis att använda men om du tycker om den och den exempelvis gör livet i din bostadsrättsförening lättare så får du väldigt gärna bjuda mig på en kopp kaffe genom att swisha en symbolisk summa till 0705580198.</p>
   </div>
   </div>
   </div>
  )
 }
}
