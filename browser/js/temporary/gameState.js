var gameState = {
	status: // 'initialization', 'inProgress', 'gameOver',
	currentPhase: // action, draw, discard, epidemic, event, infect
	prevPhase: //action, draw, discard, epidemic, event, infect
	nextPhase:
	playerDeck: [<cardObject>, <cardObject>, ....],
	playerDeckDiscard: [],
	infectionDeck: [<infectionObject>],
	infectionDeckDiscard: [],
	isCured : { red: false, blue: false, yellow: false, black: false },
	isEradicated : { red: false, blue: false, yellow: false, black: false },
	outbreakLevel: 0,
	infectionLevelIndex: 0,
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
	cities: [
		{
			name: 'atlanta',
			red: 2,
			yellow: 0,
			blue: 1,
			black: 3
		},
		{
			name: 'newYork',
			red: 2,
			yellow: 0,
			blue: 1,
			black: 3
		}, //......
	],
	turnBelongsTo: gamer[<index>], //ref to gamer
	epidemicInEffect: true,
	eventCardInEffect: false,
	proposedActions: [ // length of 4 or longer, depending on 'events' being played
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


