/*
Pseudo code for INITIALIZATION......

  set gameOver to false
  initialize empty map
  research center placed in Atlanta



  initialize: outbreakLevel, infectionLevelIndex, cures, eradications, discard piles

  static above... setting below...

  all gamers in Atlanta
  create playerDeck (shuffle)
  create infectionDeck (shuffle)

  deal hands:
    - roles
    - icon
    - playerCards (# depends on gamer count)

  seed city infections
  update discard decks

TRANSITION to GAME PLAY ('inProgress')


Pseudo code for TURN.........

-->Action Phase BEGINS: [ActionFactory]
    calculatePossibleActions()
    create tempGameState to track user choices
      loop:
        -RENDER user-selection dialogue with available action VERBS
        -USER selects action VERB
        -RENDER available NOUNS (or other modifiers)
        -USER selects NOUN (or other modifiers)
        -if actions < 4:
          - calculatePossibleActions()
          - repeat loop

      USER can change selection via EDIT buttons?
    USER executeActions()
    loop: (make gameState conform to tempState)
      while(actions remaining)
        - RenderFactory animates action
        - GameFactory checks all users (except current USER) for excess cards:
          -if any USER (except current USER) has excess cards:
            - go to Discard Phase for that USER

<-- Action Phase ENDS

--> Draw Phase BEGINS: [CardFactory, RenderFactory]
      RenderFactory tells user to draw cards:
      loop for 2 cards:
        USER draws card
        if(epidemic) ---> go to EPIDEMIC Phase (control will eventually return)
        else if(event || city) --- > draw card or exit
      go to Discard Phase for current USER
<-- Draw Phase ENDS

--> Discard Phase BEGINS: [RenderFactory, GameFactory]
      if(USER's hand has more than 7 cards)
        RenderFactory tells user to discard excess cards:
        USER selects cards to discard
      RenderFactory animates discard
      go to Infect Phase
<-- Dicard Phase ENDS

--> Infect Phase BEGINS:
    RenderFactory tells players that infections are spreading....
    loop: (infectionRate times)
      CardFactory draws draws infection card
      if(outbreak) RenderFactory notifies players
        -increment infection based on outbreak
      RenderFactory animates infection
      repeat
<-- Infect Phase ENDS

INCREMENT TURN....


---------------------------
--> define 'calculatePossibleActions'



---------------------------
--> Epidemic Phase BEGINS: [GameFactory, CardFactory]
    increment infectionRate
    infect by drawing bottom card
    GAME renders new infections based on logic:
      - check whether eradicated
      - check whether outbreak occurs
    intensify:
      - reshuffle infectionDiscard
      - update infectionDeck
    remove Epidemic card from game
    return control to Draw phase
<-- Epidemic Phase Ends
-----------------------------

--> Event Phase BEGINS:
  [event emitter that sidelined USER can emit by pressing button]
  USER (not turn USER) clicks on event card to use
  emits event to interrupt flow elsewhere
  USER selects when to use event card
  control goes back to action handler

<-- Event Phase ENDS:

*/
