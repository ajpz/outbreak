// 'use strict';
// describe('Infection Factory', () => {
//   beforeEach(module('FullstackGeneratedApp'));

//   let InfectionFactory;
//   let CardFactory;
//   let Cities;

//   beforeEach('get Card/Infection factories and Cities Constant', inject(function($injector) {
//     InfectionFactory = $injector.get('InfectionFactory');
//     CardFactory = $injector.get('CardFactory');
//     Cities = $injector.get('Cities');
//   }));

//   it('has four exposed methods', function() {
//     expect(InfectionFactory.initialize).to.be.a('function');
//     expect(InfectionFactory.infect).to.be.a('function');
//     expect(InfectionFactory.epidemic).to.be.a('function');
//     expect(InfectionFactory.createInfectionDeck).to.be.a('function');
//   });

//   it('can create an infection deck', function() {
//     let infectionDeck = InfectionFactory.createInfectionDeck(Cities);
//     expect(typeof infectionDeck === 'object').to.be.true;
//     infectionDeck.should.have.length(48);
//   });

//   it('can initialize the infections on a board', function() {
//     let workingState = {
//       infectionDeck: [
//         { key: 'sanFrancisco', color: 'blue' },
//         { key: 'chicago', color: 'blue' },
//         { key: 'atlanta', color: 'blue' },
//         { key: 'montreal', color: 'blue' },
//         { key: 'newYork', color: 'blue' },
//         { key: 'dc', color: 'blue' },
//         { key: 'algiers', color: 'black' },
//         { key: 'tokyo', color: 'red' },
//         { key: 'buenosAires', color: 'yellow' }
//       ],
//       infectionDeckDiscard: [],
//       cities: [
//         { key: 'sanFrancisco', blue: 0 },
//         { key: 'chicago', blue: 0 },
//         { key: 'atlanta', blue: 0 },
//         { key: 'montreal', blue: 0 },
//         { key: 'newYork', blue: 0 },
//         { key: 'dc', blue: 0 },
//         { key: 'algiers', black: 0 },
//         { key: 'tokyo', red: 0 },
//         { key: 'buenosAires', yellow: 0 }
//       ]
//     };
//     let updatedState = InfectionFactory.initialize(workingState);

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'buenosAires';
//     })[0].yellow == 3).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'sanFrancisco';
//     })[0].blue == 1).to.be.true;
//     updatedState.infectionDeckDiscard.should.have.length(9);
//   });

//   it('can add infections to the board', function() {
//     let workingState = {
//       infectionLevelIndex: 4,
//       infectionDeck: [
//         { key: 'sanFrancisco', color: 'blue' },
//         { key: 'buenosAires', color: 'yellow' }
//       ],
//       infectionDeckDiscard: [],
//       cities: [
//         { key: 'sanFrancisco', blue: 0 },
//         { key: 'buenosAires', yellow: 0 }
//       ]
//     };

//     let updatedState = InfectionFactory.infect(workingState);

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'buenosAires';
//     })[0].yellow == 3).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'sanFrancisco';
//     })[0].blue == 3).to.be.true;
//     updatedState.infectionDeckDiscard.should.have.length(2);
//   })

//   it('can implement an epidemic', function() {
//     let workingState = {
//       infectionLevelIndex: 4,
//       infectionDeck: [
//         { key: 'sanFrancisco', color: 'blue' },
//         { key: 'buenosAires', color: 'yellow' }
//       ],
//       infectionDeckDiscard: [
//         { key: 'tokyo', color: 'red' }
//       ],
//       cities: [
//         { key: 'sanFrancisco', blue: 2 },
//         { key: 'buenosAires', yellow: 2 }
//       ]
//     };

//     let updatedState = InfectionFactory.epidemic(workingState);

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'sanFrancisco';
//     })[0].blue == 5).to.be.true;

//     updatedState.infectionLevelIndex.should.equal(5);
//     updatedState.infectionDeck.should.have.length(3);
//     updatedState.infectionDeckDiscard.should.have.length(0)
//   });

//   it('can handle outbreaks', function() {
//     //TODO: need to add test to ensure there aren't
//     //  recursively firing outbreaks....

//     let workingState = {
//       infectionLevelIndex: 0,
//       outbreakLevel: 0,
//       infectionDeck: [
//         { key: 'sanFrancisco', color: 'blue' },
//         { key: 'beijing', color: 'red' }
//       ],
//       infectionDeckDiscard: [],
//       cities: [
//         { key: 'sanFrancisco', blue: 3 },
//         { key: 'tokyo', red: 0, blue: 0 },
//         { key: 'manila', red: 0, blue: 0 },
//         { key: 'losAngeles', yellow: 0, blue: 0 },
//         { key: 'chicago', blue: 0 },
//         { key: 'beijing', red: 0 }
//       ]
//     };

//     let updatedState = InfectionFactory.infect(workingState);

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'sanFrancisco';
//     })[0].blue == 3).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'tokyo';
//     })[0].blue == 1).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'manila';
//     })[0].blue == 1).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'losAngeles';
//     })[0].blue == 1).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'chicago';
//     })[0].blue == 1).to.be.true;

//     expect(updatedState.cities.filter(function(city) {
//       return city.key === 'beijing';
//     })[0].red == 2).to.be.true;

//     updatedState.outbreakLevel.should.be.equal(1);
//   });

// });
