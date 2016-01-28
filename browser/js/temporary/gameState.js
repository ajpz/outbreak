var gameState = {
  status: // 'initialization', 'inProgress', 'gameOver',
  playerDeck: [<cardObject>, <cardObject>, ....],
  playerDeckDiscard: [],
  infectionDeck: [<infectionObject>],
  infectionDeckDiscard: [],
  cure : { red: false, blue: false, yellow: false, black: false },
  eradicated : { red: false, blue: false, yellow: false, black: false },
  outbreakLevel: 0,
  infectionLevelIndex: 0,
  redRemaining: 24,
  blueRemaining: 24,
  yellowRemaining: 24,
  blackRemainging: 24,
  researchCenterLocations: ['atlanta'],
  // gamer array created during 'initialization' phase (bw 2 and 4 gamers)
  gamers: [
    {
      userName: 'oppperator',
      role: 'medic',
      currentCity: 'newYork',
      hand: [<cardObjects>, ....] // 7 or 9 max depending on game play
    },
    {
      userName: 'homburger',
      role: 'researcher',
      currentCity: 'atlanta'
      hand: [<cardObjects>, ....] // 7 or 9 max depending on game play
    },
    {
      userName: 'homburger',
      role: 'researcher',
      hand: [<cardObjects>, ....] // 7 or 9 max depending on game play
      currentCity: 'atlanta'
    }
  ],
  cities: {
    atlanta : {
      red: 2,
      yellow: 0,
      blue: 1,
      black: 3
    },
    newYork: {
      red: 2,
      yellow: 0,
      blue: 1,
      black: 3
    }, //......
  },
  turnBelongsTo: gamer[<index>], //ref to gamer
  turnNumber: 5, // turnBelongsTo turnNumber % gamer.length;
  epidemicInEffect: true,
  eventCardInEffect: false,
  actions: [ // length of 4 or longer, depending on 'events' being played
    {
      type: 'regular',
      user:
      verb: 'go',  //'go', 'treat', 'build', 'giveCityCard', 'takeCityCard', 'cureDisease'
      goType: , // drive/ferry, directFlight, charterFlight, shuttleFlight
      placeFrom: 'newYork', //cityKey or null
      placeTo: 'atlanta',
      cityCardToDiscard: 'mumbai',  // cityCard or null
      giveTo: 'researcher',
      takeFrom: 'medic',
      cardColorToCure: '' // blue, yellow, black, red
    },
    {
      type: 'event'
    }
  ]

}




  infectionGrowthArray: [2, 2, 2, 3, 3, 4, 4],
