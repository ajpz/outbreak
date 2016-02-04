'use strict'
describe('CitiesCard Factory', () => {
  beforeEach(module("FullstackGeneratedApp"));
  let CitiesCardFactory;
  let deck;

  beforeEach('CitiesCardFactory', inject(_CitiesCardFactory_ => {
    CitiesCardFactory = _CitiesCardFactory_;
    deck = CitiesCardFactory.createDeckWithCitiesAndEvents();
  }));

  /**
   * default number of epidemics should be 4 if no parameters are passed in
   */
  it('should expect the createPlayerDeck to have 4 epidemics', () => {
    deck = CitiesCardFactory.createPlayerDeck(deck)
    let epidemicCardsOnly = deck.filter(function(card){
      return card!== undefined && card.name === "Epidemic"
    });
    expect(epidemicCardsOnly).to.have.length(4);
  });

  /**
   * with default epidemics, deck should be 57 cards long
   */

  it('should have 53 cards', () => {
    expect(deck).to.have.length(53);
  });

  /**
   * number of epidemics should be the number of epidemics passed in
   * to the createPlayerDeck method
   */
  it('should expect the createPlayerDeck to have 8 epidemics', () => {
    let cards = CitiesCardFactory.createPlayerDeck(deck,8);
    let epidemicCardsOnly = cards.filter(function(card){
      return card['type'] === "epidemicCard";
    });

    expect(epidemicCardsOnly).to.have.length(8);
  });

  /**
   * There are 5 event cards
   */
  it('check that there are event cards in the deck', () => {
    let eventCards = deck.filter(function(card) {
        return card.type === "eventCard";
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
