/*

GAMER HAND DIRECTIVE
  // ALWAYS
  - shows gamer's avatar
  - shows gamer's Role and special abilities
  - shows the cards in the gamer's hand (max 7 + 2)
  - has a SELECTED section with discard / play buttons
  - indicates if it is gamer's turn

  // DURING GAMER'S TURN
  - citycard can be selected from hand and given to another player
  - new citycard can be added to hand through a share
  - 5 citycards of same disease color can be discarded to Cure a disease
  - citycard can be discarded as part of move action
  - eventcard can be played, card discarded
  - max number of cards between actions and turns is 7

  // DURING GAMER'S DRAW PHASE OF TURN
  - 2 new cards can be added to hand (up to max 9 cards)
  - eventcard can be played (e.g. during an epidemic), card discarded

  // DURING GAMER'S DISCARD PHASE OF TURN
  - card can be selected from hand and moved into SELECTED section
  - SELECTED section is emptied, cards discarded, hand count updated
  - max cards must be 7 for phase to complete

  // DURING ANOTHER PLAYER'S TURN
  - citycard can be added to hand through a share
  - card can be selected from hand and discarded if more than 7 cards
  - eventcard can be played

PLAYERCARD DIRECTIVE
  //
  - shows a deck of playercards, back side up
  - indicates number of cards remaining
  - shows a deck of discarded playercards, face up
  question > do we need to be able to examine these cards?
             if not, do we need to show it at all?

  // DURING DRAW PHASE OF TURN
  - 2 cards drawn sequentially from top of deck, displayed to all gamers
  - if epidemic, card not added to a gamer's hand,
  question: maybe card is placed face up on top of deck until epidemic resolved?
  - if last card is drawn >> GAME OVER






















*/
