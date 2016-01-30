'use strict'
describe('Card Factory', () => {
  beforeEach(module("FullstackGeneratedApp"));
  var CardFactory;
  var Cities;
  var deck;

  beforeEach('get Card Factory', inject(_CardFactory_ => {
    CardFactory = _CardFactory_;
    deck = CardFactory.createPlayerDeck();
  }));

  beforeEach('get Card Factory', inject(_Cities_ => {
    Cities = _Cities_;
  }));

  /**
   * factory should return an object
   */
  it('should be an object', () => {
    expect(CardFactory).to.be.an('object');
  });

  /**
   * default number of epidemics should be 4 if no parameters are passed in
   */
  it('should expect the createPlayerDeck to have 4 epidemics', () => {
    let epidemicCardsOnly = deck.filter(function(card){
        if (card['name'] === "Epidemic") {
          return true;
        }
    });

    expect(epidemicCardsOnly).to.have.length(4);
  });

  /**
   * number of epidemics should be the number of epidemics passed in
   * to the createPlayerDeck method
   */
  it('should expect the createPlayerDeck to have 8 epidemics', () => {
    let cards = CardFactory.createPlayerDeck(8);
    let epidemicCardsOnly = cards.filter(function(card){
      if (card['type'] === "epidemicCard") {
        return true;
      }
    });

    expect(epidemicCardsOnly).to.have.length(8);
  });

  /**
   * There are 5 event cards
   */
  it('check that there are event cards in the deck', () => {
    let eventCards = deck.filter(function(card) {
      if (card.type === "eventCard"){
        return true;
      }
    });
    expect(eventCards).to.have.length(5);
  });

  /**
   * Testing that the epidemic cards are spread out in sections
   */
  it('should evenly distribute epidemic cards throughout a city deck', () => {
    let lengthOfSubDecks = Math.floor(deck.length / 4); //4 being the default number of epidemic cards
    let indexContainer = [];
    deck.forEach(function(card, index) {
      if (card["type"] === "epidemicCard") {
        indexContainer.push(index);
      }
    });

    let counter = lengthOfSubDecks;
    let correctPosition = indexContainer.map(function(i){
      if (i <= counter) {
        counter = counter + lengthOfSubDecks;
        return true;
      }
    })
    .every(function(elem){
      return elem === true;
    });
    expect(correctPosition).to.be.true;
  });

  /**
   * pick card from top will give me the last card in the array of cards
   */
  it('pickCardFromTop', () => {
    let drawTop = deck[deck.length-1];
    let poppedCard = CardFactory.pickCardFromTop(deck);
    expect(drawTop === poppedCard).to.be.true;
  });

  /**
   * pick card from bottom will give me first card in array
   */
  it('pickCardFromBottom', () => {
    let drawBot = deck[0];
    let poppedCard = CardFactory.pickCardFromBottom(deck);
    expect(drawBot === poppedCard).to.be.true;
  });

  /**
   *  in the game, when a epidemic card is drawn,
   *  one of the effects is to take the discard pile and put
   *  it back on the infection deck
   */
  it('adds a card to the top', () => {
    let cardObject = [{type : "dummyCard" }];
    let modifiedDeck = CardFactory.addCardsToTop(deck, cardObject);
    expect(cardObject[0] === modifiedDeck[modifiedDeck.length-1]).to.be.true;
  });

  /**
   * Check that the deck is empty
   */
  it('checks that isEmpty returns empty when the deck is empty', () => {
    expect(CardFactory.isEmpty([])===true).to.be.true;
  });

  it('checks that isEmpty returns false when the deck is not empty', () => {
    expect(CardFactory.isEmpty([1,2,3]) === false).to.be.true
  });

});



