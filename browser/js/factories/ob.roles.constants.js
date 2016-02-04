app.constant('Roles', {
  medic: {
    name: 'Medic',
    ability: 'The medic removes all cubes of the same color when treating a disease. If a disease has been cured, they automatically remove all disease cubes of that color from a city simply by entering it or being there. This does not take an action.',
    icon: "http://i.imgur.com/4Qdsdzd.png"
  },
  scientist: {
    name: 'Scientist',
    ability: 'The scientist needs only four (not five) city cards of the same disease color to discover a cure for that disease.',
    icon: "http://i.imgur.com/WulkLDY.png"
  },
  operationsExpert: {
    name: 'Operations Expert',
    ability: 'The operations expert may, as an action, either build a research station in their city without discarding a card or, once per turn, move from a research station to any city by discarding any city card.',
    icon: "http://i.imgur.com/LkRLXAQ.png"
  },
  researcher: {
    name: 'Researcher',
    ability: 'The researcher may give any city card from their hand to another player in the same city without this card having to match the researcher\'s city. The transfer must be from the researcher\'s hand to the other player\'s hand, but it can occur on either player\'s turn',
    icon: "http://i.imgur.com/VJJfVf2.png"
  }
});

