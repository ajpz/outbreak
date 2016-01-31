'use strict'
describe('CitiesCard Factory', () => {
  beforeEach(module("FullstackGeneratedApp"));
  let CitiesCardFactory;
  let deck;

  beforeEach('CitiesCardFactory', inject(_CitiesCardFactory_ => {
    CitiesCardFactory = _CitiesCardFactory_;
    deck = CitiesCardFactory.createPlayerDeck();
  }));

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
    let cards = CitiesCardFactory.createPlayerDeck(8);
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


});
