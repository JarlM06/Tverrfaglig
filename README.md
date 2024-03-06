# Tverrfaglig Prosjekt - Jarl Mathias

### Om prosjektet
Hovedinnholdet i prosjektet er et spill inspirert av 'Wordle', men det er en tvist. Wordle er et spill hvor man prøver å gjette et ord, og så får man tilbakemelding på om bokstavene var riktig, feil plassert, feil ol. I mitt program så skal man heller gjette en 'boss' fra spillet Elden Ring. Dette prosjektet er noe jeg startet på i YFF tidligere i år, og ville bygge ut på nå.

Programmet blir hovedsakelig kodet it HTML/CSS/JavaScript, men bruker en MySQL database og PHP for å snakke med databasen. Jeg har satt opp en server for MySQL databasen, og en Ubuntu server hvor programmet ligger.

### Hva gjør filene
``index.html`` → Standard HTML side. Det er her selve spillet ligger og er startsiden til programmet.

``manual.html`` → HTML side hvor brukeren kan lese seg opp på hvordan programmet fungerer.

``insertBosser.html`` → HTML side hvor det er mulig å legge til nye 'bosser' i databasen (Dette vil endre databasen for alle brukere. Dette kan kreve login senere).

``base.css`` → All CSS/styling for programmet, gjelder for alle HTML sider.

``main.js`` → All JavaScript for programmet, gjelder for alle HTML sider. Det er her mesteparten av backend-koden skjer, med unntak av det som omhandler MySQL databasen.

``getData.php`` → PHP for å hente all informasjon fra MySQL databasen, og gjør det om til riktig format for JavaScript.

``insertBosser.php`` → PHP for å sette inn en ny verdi i databasen.

``Bilder`` → Mappe som inneholder alle bilder som blir brukt i programmet.
