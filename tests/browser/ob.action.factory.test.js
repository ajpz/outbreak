'use strict';
describe('ActionFactory', () => {
  beforeEach(module('FullstackGeneratedApp'));

  let ActionFactory;
  let gamer;
  let state;

  beforeEach('inject ActionFactory ', inject(function($injector) {
    ActionFactory = $injector.get('ActionFactory');

  }));

  beforeEach('create state and gamer objects', function() {
    state =
    {
      number: 1,
      gamers: [
        {
          username : 'victor',
          role : 'medic',
          currentCity : 'dc',
          hand : [
            {type: 'cityCard', key: 'newYork', color: 'blue'},
            {type: 'cityCard', key: 'losAngeles', color: 'yellow'}
          ]
        },
        {
          username : 'jonathan',
          role : 'researcher',
          currentCity : 'dc',
          hand : [
            {type: 'cityCard', key: 'dc', color: 'blue'},
            {type: 'cityCard', key: 'atlanta', color: 'blue'}]
        },
        {
          username : 'julie',
          role : 'scientist',
          currentCity : 'atlanta',
          hand : [
            {type: 'cityCard', key: 'chicago', color: 'blue'},
            {type: 'cityCard', key: 'sanFrancisco', color: 'blue'},
            {type: 'cityCard', key: 'london', color: 'blue'},
            {type: 'cityCard', key: 'madrid', color: 'blue'},
            {type: 'cityCard', key: 'paris', color: 'blue'}
          ]
        },
        {
          username : 'dan',
          role : 'operationsExpert',
          currentCity : 'atlanta',
          hand : [
            {type: 'cityCard', key: 'mumbai', color: 'black'},
            {type: 'cityCard', key: 'manila', color: 'red'}
          ]
        }
      ],
      cities: [
        {
          key: 'dc',
          red: 1,
          yellow: 2,
          blue: 3,
          black: 1
        },
        {
          key: 'moscow',
          red: 0,
          yellow: 0,
          blue: 0,
          black: 0
        }
      ],
      researchCenterLocations: [
        'atlanta'
      ],
      isCured: {
        red: false,
        yellow: false,
        blue: false,
        black: false
      }
    };

    gamer =
    {
      username : 'jonathan',
      role : 'researcher',
      currentCity : 'dc',
      hand : [
        {type: 'cityCard', key: 'dc', color: 'blue'},
        {type: 'cityCard', key: 'atlanta', color: 'blue'}]
    };
  });

  it('has 13 exposed methods', function() {
    Object.keys(ActionFactory).length.should.equal(13);
  })

  it('can find cities in walking distance', function() {
    let cities = ActionFactory.walkingOrFerryKeys(gamer);
    cities.length.should.equal(4);
  });

  it('can find cities directFlights away', function() {
    let cities = ActionFactory.directFlightsKeys(gamer);
    expect(cities).to.contain('dc');
    expect(cities).to.contain('atlanta');
  });

  it('can find cities charterFlights away', function() {
    let cities = ActionFactory.charterFlightsKeys(gamer);
    cities.length.should.equal(47);
  });

  it('can find cities shuttleFlights away', function() {
    let cities = ActionFactory.shuttleFlightsKeys(gamer, state);
    cities.length.should.equal(0); // 0 changed to zero since the user is not standing on a research center
  })

  it('can determine what colors can be treated, and how much', function() {
    let treatmentOptions = ActionFactory.whatAndHowMuchCanBeTreated(gamer, state);
    treatmentOptions.red.should.equal(1);
    treatmentOptions.yellow.should.equal(1);
    treatmentOptions.blue.should.equal(1);
    treatmentOptions.black.should.equal(1);
  });

  it('if color is cured, will treat all of the color', function() {
    state.isCured.blue = true;
    let treatmentOptions = ActionFactory.whatAndHowMuchCanBeTreated(gamer, state);
    treatmentOptions.red.should.equal(1);
    treatmentOptions.yellow.should.equal(1);
    treatmentOptions.blue.should.equal(3);
    treatmentOptions.black.should.equal(1);
  });

  it('if gamer is medic, will treat all of the color', function() {
    //set gamer to be a medic
    gamer.role = 'medic';
    let treatmentOptions = ActionFactory.whatAndHowMuchCanBeTreated(gamer, state);
    treatmentOptions.red.should.equal(1);
    treatmentOptions.yellow.should.equal(2);
    treatmentOptions.blue.should.equal(3);
    treatmentOptions.black.should.equal(1);
  });

  it('returns cards you can give to people', function() {
    let giveToObject = ActionFactory.giveWhatToWhom(gamer, state);
    giveToObject[0].giveTo.should.equal('medic');
    giveToObject[0].city.should.equal('dc');
  });

  it('returns cards you can take from people', function() {
    //move test gamers to newYork
    state.gamers[0].currentCity = 'newYork';
    gamer.currentCity = 'newYork';
    let takeFromObject = ActionFactory.takeWhatFromWhom(gamer, state);
    takeFromObject[0].takeFrom.should.equal('medic');
    takeFromObject[0].city.should.equal('newYork');
  });

  it('returns the color you can cure', function() {
    let cureColor = ActionFactory.cureWhichDisease(state.gamers[2]);
    cureColor.blue.should.be.true;
  });

  it('determines all availableVerbs', function() {
    let verbs = ActionFactory.availableVerbs(gamer, state);
    verbs.length.should.equal(5);
  });

  it('will not allow you to build if there is already a research center there', function() {
    state.researchCenterLocations = ['atlanta', 'dc'];
    let verbs = ActionFactory.availableVerbs(gamer, state);
    verbs.length.should.equal(4);
  });

  it('will not allow you take and give cards if no one is in a city with you', function() {
    gamer.currentCity = 'moscow';
    let verbs = ActionFactory.availableVerbs(gamer, state);
    verbs.length.should.equal(1);
  });

  it('will not let you treat if there is no infection', function() {

    state.cities = [
      {
        key: 'dc',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      },
      {
        key: 'moscow',
        red: 0,
        yellow: 0,
        blue: 0,
        black: 0
      }]
    let verbs = ActionFactory.availableVerbs(gamer, state);
    verbs.length.should.equal(4);

  });

});
