'use strict';
describe('ActionFactory', () => {
  beforeEach(module('FullstackGeneratedApp'));

  let ActionFactory;

  beforeEach('inject ActionFactory and create temporary proposedActions state', inject(function($injector) {
    ActionFactory = $injector.get('ActionFactory');

    let priorAction =
    {
      number: 1,
      type: 'regular',
      role: 'researcher',
      verb: 'go',
      goType: 'driveFerry',
      placeFrom: 'atlanta',
      placeTo: 'dc',
      cityCardToDiscard: null,
      takeFrom: null,
      giveTo: null,
      cardColorToTreat: null,
      numToTreat: null,
      cardColorToCure: null,
      gamersAfterAction: [
        {
          username : 'victor',
          role : 'medic',
          currentCity : 'dc',
          hand : [
            {type: 'cityCard', key: 'newYork'},
            {type: 'cityCard', key: 'losAngeles'}
          ]
        },
        {
          username : 'jonathan',
          role : 'researcher',
          currentCity : 'dc',
          hand : [
            {type: 'cityCard', key: 'dc'},
            {type: 'cityCard', key: 'atlanta'}]
        },
        {
          username : 'julie',
          role : 'scientist',
          currentCity : 'atlanta',
          hand : [
            {type: 'cityCard', key: 'chicago'},
            {type: 'cityCard', key: 'sanFrancisco'}
          ]
        },
        {
          username : 'dan',
          role : 'operationsExpert',
          currentCity : 'atlanta',
          hand : [
            {type: 'cityCard', key: 'mumbai'},
            {type: 'cityCard', key: 'manila'}
          ]
        }
      ],
      citiesAfterAction: [
        // each a city
        {
          key: 'dc',
          red: 1,
          yellow: 2,
          blue: 3,
          black: 1
        }
      ],
      researchCenterLocationsAfterAction: [
        'atlanta',
        'dc'
      ],
      isCuredAfterAction: {
        red: false,
        yellow: false,
        blue: false,
        black: false
      }
    };

    let gamer =
    {
      username : 'jonathan',
      role : 'researcher',
      currentCity : 'dc',
      hand : [
        {type: 'cityCard', key: 'dc'},
        {type: 'cityCard', key: 'atlanta'}]
    };

    it('has 10 exposed methods', function() {
      Object.keys(ActionFactory).length.should.equal(10);
    })

  }));

});


/*
    availableVerbs = function(gamer, action) {
    walkingOrFerryKeys = function(gamer) {
    directFlightsKeys = function(gamer) {
    charterFlightsKeys = function(gamer) {
    shuttleFlightsKeys = function(gamer, action) {
    whatAndHowMuchCanBeTreated = function(gamer, action) {
    giveWhatToWhom = function(gamer, action) {
    takeWhatFromWhom = function(gamer, action) {
    cureWhichDisease = function(gamer) {
    calculatePossibleActions = function(state)
*/
