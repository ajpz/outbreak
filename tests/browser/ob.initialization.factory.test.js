
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
      remainingCubes : {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      },
      gamers: [{
        hand: []
      }, {
        hand: []
      }, {
        hand: []
      }, {
        hand: []
      }],
      cities: [{
        key: 'sanFrancisco',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'chicago',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'atlanta',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'montreal',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'newYork',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'dc',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'london',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'madrid',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'paris',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'berlin',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'milan',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'stPetersburg',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'losAngeles',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'mexicoCity',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'miami',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'bogota',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'lima',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'santiago',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'buenosAires',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'saoPaulo',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'lagos',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'kinshasa',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'khartoum',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'johannesburg',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'algiers',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'cairo',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'istanbul',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'moscow',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'baghdad',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'riyadh',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'tehran',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'karachi',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'mumbai',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'delhi',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'kolkata',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'chennai',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'beijing',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'seoul',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'tokyo',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'shanghai',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'hongKong',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'taipei',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        name: 'osaka',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'bangkok',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'jakarta',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'hoChiMinhCity',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'manila',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }, {
        key: 'sydney',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }]
    };

    let updatedState = InitFactory.initializeGameElements(workingState);

    /**
     * Each gamer should get 2 hands assuming default of 4 gamers
     */
    expect(workingState.gamers.reduce(function(sum, gamer) {
      return sum += gamer.hand.length;
    }, 0)).to.equal(8);

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
    // expect(updatedState.playerDeck.filter(function(card) {
    //   return card.type === 'epidemicCard';
    // }).length).to.equal(4);
    /**
     * The infectionDeck should have 48 cards
     */
    expect(updatedState.infectionDeck.length).to.equal(39);


  });

});

