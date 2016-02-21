# Outbreak
Victor Hom, Julie Oppermann, Jonathan Perez, Leon Daniel Thorne
http://www.playoutbreak.com/
======================================================================
## Start Screen
![alt tag](https://github.com/VictorHom/Gif/blob/master/georgiaFocus.png)
## Choosing an action
![alt tag](https://github.com/VictorHom/Gif/blob/master/goScreen.png)

###  About this project:
Outbreak is an online adaptation of the popular board game, Pandemic, a multi-player, turn-based game. At the start of the game, each player is assigned a special role with unique disease-fighting skills. As a team, the players collaborate and share knowledge to discover cures, treat infected cities, and prevent the uncontrolled spread of four deadly diseases. Can they work quickly enough to save the world?

One of the many design challenges we faced was the task of translating a large table-top game into something that can be played remotely, through the limited viewport of a browser. Game components, including the player’s hand and card decks, disease cubes, and progress markers, had to be incorporated into the player’s view, while not obscuring the view of the game board itself. 

We used Mapbox.js to create a dynamic, interactive map which serves as our game board. It contains a graph of cities and their connections; some of the cities had to be geographically offset from their true locations to even out the spacing of the board. Using Leaflet.js we created marker layers for player icons, diseases, and research centers.  

Perhaps most importantly, the state of numerous game elements (including card decks, player positioning, disease locations and counts) had to be maintained during the game. These elements were constantly being updated, by the game engine itself, or through player interactions. Every update had to be captured, centralized and held 
consistent across all players’ browsers. To solve this, we chose to maintain a centralized state object representing the truth of a game at any point in time. We used Firebase as the data store and leveraged AngularFire and its socket-based data-binding to communicate state changes between all connected browsers. In this way we were able to notify all players, in real-time, of events that occur in the game. We used Angular.js as our front-end framework and re-rendered views based on the data broadcasts.

### How to play
The best way to play this game is to create an account and have a friend join in on the fun. The minimum number of players is 2 and the max is 4. Once you create a game and have the number of players to play, all players will be sent to the board game map. If you know how to play and it's your turn, you can start picking your actions right away. However, if you need a refresher on how to play, click on the question mark icon at the bottom of the game screen to open up our rules manual.

|Icon      | Meaning            |
|--------| :------------- |
| ![](https://github.com/VictorHom/Gif/blob/master/userDashboard.png)  | This is the user dashboard for player hand information. From here, players can see their own hand and other player hands. From this dashboard, the current player in the game can also pick out their moves. |
| ![](https://github.com/VictorHom/Gif/blob/master/cardStatus.png) | This shows the number cards for drawing and the number of infection pieces available     |
| ![](https://github.com/VictorHom/Gif/blob/master/diseaseStatus.png) | This shows whether a disease is not cured/ cured/ eradicated |
| ![](https://github.com/VictorHom/Gif/blob/master/infectionRate.png) | This shows how many disease pieces to place when you are infecting |
| ![](https://github.com/VictorHom/Gif/blob/master/outbreakLevel.png) | When the green gets all the way to the right, you lose the game! |

## Contributors
- [Victor Hom](https://github.com/VictorHom)
- [Julie Oppermann](https://github.com/smooth-opperator)
- [Jonathan Perez](https://github.com/ajpz)
- [Leon Daniel Thorne](https://github.com/ldthorne)
