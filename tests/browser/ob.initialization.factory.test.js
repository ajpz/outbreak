'use strict';
describe('InitFactory', () => {
  beforeEach(module('FullstackGeneratedApp'));

  let InfectionFactory;
  let CardFactory;
  let CitiesCardFactory;
  let InitFactory;

  beforeEach('get Card/Infection/CitiesCard factories ', inject(function($injector) {
    InitFactory = $injector.get('InitFactory');
  }));

  it('has two exposed methods', function() {
    expect(InitFactory.initializeGameElements).to.be.a('function');
    expect(InitFactory.giveUserARole).to.be.a('function');
  });

  it('initializeGameElements creates player/infection decks and deals cards to gamers', function() {

    //TODO: create test for setting game difficult, Introductory/Standard/Heroic

    let workingState = {
      gamers: [
        { hand: [] },
        { hand: [] },
        { hand: [] },
        { hand: [] }
      ]
    };

    let updatedState = InitFactory.initializeGameElements(workingState);

    /**
     * Each gamer should get 2 hands assuming default of 4 gamers
     */
    expect(workingState.gamers.reduce(function(sum, gamer) {
      return sum += gamer.hand.length;
    },0)).to.equal(8);

    /**
     * Players decks should have 49 remaining cards (57 - 2 x 4)
     */
    expect(updatedState.playerDeck.length).to.equal(49);
    /**
     * Default decks have 4 epidemic cards
     */
    //TODO: this fails occasionally because epidemic cards may be dealt
    //will be fixed once the CitiesCardFactory createDeck logic is broken
    //into two steps, make deck without epidemic cards, and then sprinkle
    // epidemic cards
    expect(updatedState.playerDeck.filter(function(card) {
      return card.type === 'epidemicCard';
    }).length).to.equal(4);
    /**
     * The infectionDeck should have 48 cards
     */
    expect(updatedState.infectionDeck.length).to.equal(48);


  });

});
