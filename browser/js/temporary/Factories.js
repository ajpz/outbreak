/*


FirebaseFactory
 - returns firebase DB reference

GameFactory:
  - initializes gameState FireBase
  - intiailizes gameState view
  - deals Roles
  - deals Infections
  - initiates game:
    - activates Action Phase when the TURN matches USER

ActionFactory:
  calculatePossibleActions()

  methods:
   - playTurn()
   - actionPhase()
   - drawPhase()
   - discardPhase()
   - infectionPhase()
   - epidemic()
   - eventInterrupt()

CardFactory:
  methods:
    - createPlayerDeck()
    - createInfectionDeck()
    - shuffleDeck()
    - pickCardFromTop()
    - pickCardFromBottom()
    - shuffleDiscardDeck()
    - addCardsToTop()
    - isEmpty()
    - etc...

InfectionFactory:
  infectionRateArray = [2, 2,, 3, 3, 4, 4];
  methods:
    - infectCity(number) // max 3 then outbreak
    - infectConnections() //for outbreak
    - initializeInfections()
    - isEmpty(color)

RenderFactory:
  methods:
    - renderAction()
    - renderShuffle()
    -


EventCardFactory:

CityCardDirective:
  - selectable for discarding/spending/trading purposes

EventCardDirective:
  - listens on USER click event
  - event emitter - updates eventCardInEffect game state



Map has to have user interactions





*/
