'use strict';
describe('Infection Factory', () => {
  beforeEach(module('FullstackGeneratedApp'));

  let InfectionFactory;
  let CardFactory;
  let Cities;

  beforeEach('get Card/Infection factories and Cities Constant', inject(function($injector) {
    InfectionFactory = $injector.get('InfectionFactory');
    CardFactory = $injector.get('CardFactory');
    Cities = $injector.get('Cities');
  }));

  it('has four exposed methods', function() {
    expect(InfectionFactory.initialize).to.be.a('function');
    expect(InfectionFactory.infect).to.be.a('function');
    expect(InfectionFactory.epidemic).to.be.a('function');
    expect(InfectionFactory.createInfectionDeck).to.be.a('function');
  });

  it('can create an infection deck', function() {
    let infectionDeck = InfectionFactory.createInfectionDeck(Cities);
    (typeof infectionDeck).should.equal('object');
    infectionDeck.should.have.length(48);
  });

  it('can initialize the infections on a board', function() {
    let workingState = {
      infectionDeck: [
        { key: 'sanFrancisco', color: 'blue' },
        { key: 'chicago', color: 'blue' },
        { key: 'atlanta', color: 'blue' },
        { key: 'montreal', color: 'blue' },
        { key: 'newYork', color: 'blue' },
        { key: 'dc', color: 'blue' },
        { key: 'algiers', color: 'black' },
        { key: 'tokyo', color: 'red' },
        { key: 'buenosAires', color: 'yellow' }
      ],
      infectionDeckDiscard: [],
      cities: [
        { key: 'sanFrancisco', blue: 0 },
        { key: 'chicago', blue: 0 },
        { key: 'atlanta', blue: 0 },
        { key: 'montreal', blue: 0 },
        { key: 'newYork', blue: 0 },
        { key: 'dc', blue: 0 },
        { key: 'algiers', black: 0 },
        { key: 'tokyo', red: 0 },
        { key: 'buenosAires', yellow: 0 }
      ],
      remainingCubes: {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      }
    };
    let updatedState = InfectionFactory.initialize(workingState);

    updatedState.cities.find(city => city.key === 'buenosAires').yellow.should.equal(3);
    updatedState.cities.find(city => city.key === 'newYork').blue.should.equal(2);
    updatedState.cities.find(city => city.key === 'sanFrancisco').blue.should.equal(1);
    updatedState.infectionDeckDiscard.should.have.length(9);
  });

  it('can add infections to the board', function() {
    let workingState = {
      infectionDeck: [
        { key: 'sanFrancisco', color: 'blue' },
        { key: 'buenosAires', color: 'yellow' }
      ],
      infectionDeckDiscard: [],
      cities: [
        { key: 'sanFrancisco', blue: 0 },
        { key: 'buenosAires', yellow: 0 }
      ],
      remainingCubes: {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      }
    };

    let updatedState = InfectionFactory.infect(workingState);
    updatedState.cities.find(city => city.key === 'buenosAires').yellow.should.equal(1);
    updatedState = InfectionFactory.infect(workingState);
    updatedState.cities.find(city => city.key === 'sanFrancisco').blue.should.equal(1);
    updatedState.infectionDeckDiscard.should.have.length(2);
  })

  it('can implement an epidemic', function() {
    let workingState = {
      infectionLevelIndex: 4,
      infectionDeck: [
        { key: 'sanFrancisco', color: 'blue' },
        { key: 'buenosAires', color: 'yellow' }
      ],
      infectionDeckDiscard: [
        { key: 'tokyo', color: 'red' }
      ],
      cities: [
        { key: 'sanFrancisco', blue: 0 },
        { key: 'buenosAires', yellow: 0 }
      ],
      remainingCubes: {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      }
    };

    let updatedState = InfectionFactory.epidemic(workingState);

    updatedState.cities.find(city => city.key === 'sanFrancisco').blue.should.equal(3);
    updatedState.infectionLevelIndex.should.equal(5);
    updatedState.infectionDeck.should.have.length(3);
    updatedState.infectionDeckDiscard.should.have.length(0)
  });

  it('can handle outbreaks', function() {

    let workingState = {
      infectionLevelIndex: 0,
      outbreakLevel: 0,
      infectionDeck: [
        { key: 'sanFrancisco', color: 'blue' }
      ],
      infectionDeckDiscard: [],
      cities: [
        { key: 'sanFrancisco', blue: 3 },
        { key: 'tokyo', red: 0, blue: 0 },
        { key: 'manila', red: 0, blue: 0 },
        { key: 'losAngeles', yellow: 0, blue: 0 },
        { key: 'chicago', blue: 0 }
      ],
      remainingCubes: {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      }
    };

    let updatedState = InfectionFactory.infect(workingState);

    updatedState.cities.find(city => city.key === 'sanFrancisco').blue.should.equal(3);
    updatedState.cities.find(city => city.key === 'tokyo').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'manila').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'losAngeles').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'chicago').blue.should.equal(1);

    updatedState.outbreakLevel.should.be.equal(1);
  });

  it('it only allows a city to have one outbreak per turn', function() {

    let workingState = {
      infectionLevelIndex: 0,
      outbreakLevel: 0,
      infectionDeck: [
        { key: 'sanFrancisco', color: 'blue' }
      ],
      infectionDeckDiscard: [],
      cities: [
        { key: 'sanFrancisco', blue: 3 },
        { key: 'tokyo', red: 0, blue: 0 },
        { key: 'manila', red: 0, blue: 0 },
        { key: 'losAngeles', yellow: 0, blue: 0 },
        { key: 'chicago', blue: 3 },
        { key: 'atlanta', blue: 0 },
        { key: 'mexicoCity', yellow: 0, blue: 0 },
        { key: 'montreal', blue: 0}
      ],
      remainingCubes: {
        red: 24,
        blue: 24,
        yellow: 24,
        black: 24
      }
    };

    let updatedState = InfectionFactory.infect(workingState);

    updatedState.cities.find(city => city.key === 'sanFrancisco').blue.should.equal(3);
    updatedState.cities.find(city => city.key === 'chicago').blue.should.equal(3);
    updatedState.cities.find(city => city.key === 'losAngeles').blue.should.equal(2);
    updatedState.cities.find(city => city.key === 'tokyo').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'manila').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'mexicoCity').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'montreal').blue.should.equal(1);
    updatedState.cities.find(city => city.key === 'atlanta').blue.should.equal(1);

    updatedState.outbreakLevel.should.be.equal(2);
  });

});
