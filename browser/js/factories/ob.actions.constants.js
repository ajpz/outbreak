// These are the regular actions available on every turn, with a verb. nouns are indicated as well in the comments because I'm not sure how this will be stored/used.

app.constant('Actions', {
  driveFerry: {
    verb: 'Move',
    //noun: <name of the city to move to (immediate connection city)>
    name: 'Drive / Ferry',
    text: 'Move to a city connected by a white line.'
  },
  directFlight: {
    verb: 'Move',
    //noun: <name of the city to move to (named on the card being discarded)>
    name: 'Direct Flight',
    text: 'Discard a City card to move to the city named on the card.'
  },
  charterFlight: {
    verb: 'Move',
    //noun: <name of the city to move to (any city other than Role's current city)>
    name: 'Charter Flight',
    text: 'Discard the City card that matches the city you are in to move to any city.'
  },
  shuttleFlight: {
    verb: 'Move',
    //noun: <name of the city to move to (any one city with a research station)>
    name: 'Shuttle Flight',
    text: 'Move from a city with a research station to any other city that has a research station.'
  },
  buildStation: {
    verb: 'Build',
    //noun: <name of the city to build a station in (matches name of Role's current city, AND name of card being discarded)>
    name: 'Build a Research Station',
    text: 'Discard the City card that matches the city you are in to place a research station there.'
  },
  treatDisease: {
    verb: 'Treat',
    //noun: <disease color to be treated / removed>
    name: 'Treat Disease',
    text: 'Remove 1 disease cube from the city you are in. If this color is cured, remove all cubes of that color from the city.'
  },
  shareKnowledge: {
    verb: 'Share',
    //noun: <name of the card to be shared>
    //directObject: <otherRole to share with>
    name: 'Share Knowledge',
    text: 'Either: give the card that matches the city you are in to another player, or take that card from another player. The other player must also be in the city with you.'
  },
  discoverCure: {
    verb: 'Cure',
    //noun: <disease color to be cured>
    name: 'Discover a Cure',
    text: 'At any research station, discard 5 City cards of the same disease color to cure that disease.'
  }

})


