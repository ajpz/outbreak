app.constant('Roles', {
  medic: {
    name: 'Medic',
    key: 'medic',
    ability: 'The Medic removes all units of the same disease color when treating a disease. If the disease is cured, they automatically clear that disease from a city simply by arriving or being there. This does not take an action.',
    icon: "http://i.imgur.com/oRKOO24.png"
  },
  scientist: {
    name: 'Scientist',
    key: 'scientist',
    ability: 'The Scientist needs only 4 City cards of the same disease color to discover a cure for that disease.',
    icon: "http://i.imgur.com/hbl2Fjv.png"
  },
  operationsExpert: {
    name: 'Operations Expert',
    key: 'operationsExpert',
    ability: 'The Operations Expert may, as an action, either: Build a Research Center in their city without discarding a card or, Once per turn, move from a Research Center to any city by discarding any City card.',
    icon: "http://i.imgur.com/DQSEFsU.png"
  },
  researcher: {
    name: 'Researcher',
    key: 'researcher',
    ability: 'When the Researcher is in the same city as another player, they can give any City card from their hand to the other player. The transfer must be from the Researcher to the other player, but can occur on either player\'s turn.',
    icon: "http://i.imgur.com/ldcDeqM.png"
  }
});

