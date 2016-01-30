'use strict'
describe('Card Factory', () => {
  beforeEach(module("FullstackGeneratedApp"));
  let CardFactory;
  let Cities;
  let deck;

  beforeEach('get Card Factory', inject(_CardFactory_ => {
    CardFactory = _CardFactory_;
    deck = CardFactory.createADeck({"card1": "test1", "card2" : "test2", "card3" : "test3"});
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



