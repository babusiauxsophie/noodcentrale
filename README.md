# project-3---werkstuk-noodcentrale-bavo-sophie-mardoek

## Introductie:
Voor het vak @work2 hebben we een applicatie gemaakt voor de Noodcentrale.
De Noodcentrale heeft personeelsleden die gemaakte opnames moet beluisteren om feedback te kunnen geven op de operatoren.
Deze reviews willen ze per operator kunnen raadplegen met de bedoeling deze feedback te kunnen gebruiken tijdens functioneringsgesprekken. 

## Installatie:
Deze applicatie maakt gebruik van meerdere node packages.
1. Voor de server gebruiken we Express (https://www.npmjs.com/package/express).
2. Voor de templating installeerde we handlebars en express-handlebars (https://www.npmjs.com/package/handlebars)(https://www.npmjs.com/package/     express-handlebars).
3. Voor de databank gebruiken we de packages van type ORM, sqlite en de body-parser (https://typeorm.io) (https://www.npmjs.com/package/sqlite3) (https://www.npmjs.com/package/body-parser)
Om te kunnen inloggen hebben we gebruik gemaakt van bcrypt om de wachtwoorden te hashen (https://www.npmjs.com/package/bcrypt), cookie-parser (https://www.npmjs.com/package/cookie-parser), express-validator voor de middleware (https://www.npmjs.com/package/express-validator)
en jsonwebtoken voor de beveiliging. (https://www.npmjs.com/package/jsonwebtoken).
4. Voor het seeden van data, gebruikten we de structuur van de slides & code van pgm-3 (week7), de packages van toepassing hier zijn dan faker.js (https://www.npmjs.com/package/@faker-js/faker)
5. Om onze API structuur te documenteren hebben we Swagger gebruikt (https://swagger.io/docs/specification/about/). De documentatie kan je terugvinden op http://localhost:3000/api-docs/

## Seeding
Om de databank te vullen met fajer-js data voer je volgende commands uit:

 npm run seed -- --factory=category
 
 npm run seed -- --factory=role 
 
 npm run seed -- --factory=operator --amount=25
 
 npm run seed -- --factory=reviewer --amount=25
 
 npm run seed -- --factory=recording --amount=25
 
 npm run seed -- --factory=feedback --amount=25
 
 npm run seed -- --factory=category_recording


## Features:
De app heeft een aanmeld pagina, hierna komt een reviewer op zijn persoonlijk dashboard terecht.
Een reviewer kan op zijn dashboard operatoren emails versturen om een functiegesprek in te plannen. Ook kan een reviewer zijn recent gemaakte reviews bekijken.
Een reviewer kan een lijst opnames openen en doorklikken om feedback te geven op een opname. Ook kan hij gemaakte reviews via hier openen.
Een reviewer kan ook een lijst van operatoren openen en doorklikken om al zijn feedbacks te bekijken.

Er is ook een admin pagina, een administrator kan via zijn dashboard emails verzenden naar reviewers.
De administrator kan ook op de pagina reviewers alle reviewers bekijken, editen of verwijderen. Hij kan ze er ook nieuwe aanmaken.
Op de pagina Operatoren kan hij alle operatoren bekijken, editen of verwijderen.
Ten slotte kan hij op de categorien pagina nieuwe categorien toevoegen, editen of verwijderen.

Er zijn endpoints beschikbaar voor de models op een RESTFUL manier.
Er is een seeder voorzien om de databank te vullen met data.

## Author:
Bavo Beaumon, Sophie Babusiaux, Mardoek Thienpondt
