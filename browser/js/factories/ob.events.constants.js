// These are the special actions available as events, with a verb.
app.constant('Events', {
  airlift: {
    verb: 'Move',
    type: 'eventCard',
    key: 'airlift',
    name: 'Airlift',
    color: 'green',
    text: 'Move any one pawn to any city. Get permission before moving another players pawn.'
  },
  oneQuietNight: {
    verb: 'Mitigate',
    type: 'eventCard',
    key: 'oneQuietNight',
    name: 'One Quiet Night',
    color: 'green',
    text: 'Skip the next infect city step (do not flip over any infection cards).'
  },
  governmentGrant: {
    verb: 'Build',
    type: 'eventCard',
    key: 'governmentGrant',
    name: 'Government Grant',
    color: 'green',
    text: 'Add one research station to any city (no discard needed).'
  },
  forecast: {
    verb: 'Mitigate',
    type: 'eventCard',
    key: 'forecast',
    name: 'Forecast',
    color: 'green',
    text: 'Draw, look at, and rearrange the top six cards of the infection deck and put them back on top.'
  },
  resilientPopulation: {
    verb: 'Mitigate',
    type: 'eventCard',
    key: 'resilientPopulation',
    name: 'Resilient Population',
    color: 'green',
    text: 'Remove any one card in the infection discard pile from the game. You may play this between the infect and intensify steps of an epidemic.'
  }

});
