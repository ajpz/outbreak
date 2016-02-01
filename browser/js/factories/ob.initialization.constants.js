// these are the static conditions for a new game.

app.constant('Initialize', {
  gameOver: false,
  //map: <create an empty map>
  researchCenters: ['Atlanta'],
  outbreakLevel: 0,
  infectionLevelIndex: 0,
  isCured: {
    red: false,
    blue: false,
    yellow: false,
    black: false
  },
  isEradicated: {
    red: false,
    blue: false,
    yellow: false,
    black: false
  },
  cities: [
    {
      key: 'sanFrancisco',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'chicago',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'atlanta',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'montreal',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'newYork',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'dc',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'london',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'madrid',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'paris',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'berlin',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'milan',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'stPetersburg',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'losAngeles',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'mexicoCity',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'miami',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'bogota',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'lima',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'santiago',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'buenosAires',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'saoPaulo',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'lagos',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'kinshasa',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'khartoum',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'johannesburg',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'algiers',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'cairo',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'istanbul',
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
    },
    {
      key: 'baghdad',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'riyadh',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'tehran',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'karachi',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'mumbai',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'delhi',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'kolkata',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'chennai',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'beijing',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'seoul',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'tokyo',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'shanghai',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'hongKong',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'taipei',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      name: 'Osaka',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'bangkok',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'jakarta',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'hoChiMinhCity',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'manila',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    },
    {
      key: 'sydney',
      red: 0,
      yellow: 0,
      blue: 0,
      black: 0
    }

  ]
});
