
app.constant('Cities', {
  sanFrancisco : {
    key: 'sanFrancisco',
    name: 'San Francisco',
    type: 'cityCard',
    country: 'USA',
    location: [37.774929, -122.419416],
    connections: ['tokyo', 'manila', 'losAngeles', 'chicago'],
    color: 'blue'
  },
  chicago : {
    key: 'chicago',
    name: 'Chicago',
    type: 'cityCard',
    country: 'USA',
    location: [41.878114, -87.629798],
    connections: ['sanFrancisco', 'losAngeles', 'mexicoCity', 'atlanta', 'montreal'],
    color: 'blue'
  },
  atlanta : {
    key: 'atlanta',
    name: 'Atlanta',
    type: 'cityCard',
    country: 'USA',
    location: [33.748995, -84.387982],
    connections: ['dc', 'miami', 'chicago'],
    color: 'blue'
  },
  montreal : {
    key: 'montreal',
    name: 'Montreal',
    type: 'cityCard',
    country: 'Canada',
    location: [45.501689, -73.567256],
    connections: ['dc', 'newYork', 'chicago'],
    color: 'blue'
  },
  newYork : {
    key: 'newYork',
    name: 'New York',
    type: 'cityCard',
    country: 'USA',
    location: [40.712784, -74.005941],
    connections: ['montreal', 'dc', 'london', 'madrid'],
    color: 'blue'
  },
  dc : {
    key: 'dc',
    name: 'Washington DC',
    type: 'cityCard',
    country: 'USA',
    location: [38.907192, -77.036871],
    connections: ['atlanta', 'montreal', 'newYork', 'miami'],
    color: 'blue'
  },
  london : {
    key: 'london',
    name: 'London',
    type: 'cityCard',
    country: 'UK',
    location: [51.507351, -0.127758],
    connections: ['newYork', 'madrid', 'paris', 'berlin'],
    color: 'blue'
  },
  madrid : {
    key: 'madrid',
    name: 'Madrid',
    type: 'cityCard',
    country: 'Spain',
    location: [40.416775, -3.703790],
    connections: ['saoPaulo', 'newYork', 'algiers', 'paris', 'london'],
    color: 'blue'
  },
  paris : {
    key: 'paris',
    name: 'Paris',
    type: 'cityCard',
    country: 'France',
    location: [48.856614, 2.352222],
    connections: ['london', 'madrid', 'milan', 'berlin', 'algiers'],
    color: 'blue'
  },
  berlin : {
    key: 'berlin',
    name: 'Berlin',
    type: 'cityCard',
    country: 'Germany',
    location: [52.520007,13.404954],
    connections: ['london', 'milan', 'paris', 'stPetersburg'],
    color: 'blue'
  },
  milan : {
    key: 'milan',
    name: 'Milan',
    type: 'cityCard',
    country: 'Italy',
    location: [45.465422, 9.185924],
    connections: ['istanbul', 'paris', 'berlin'],
    color: 'blue'
  },
  stPetersburg : {
    key: 'stPetersburg',
    name: 'St Petersburg',
    type: 'cityCard',
    country: 'Russia',
    location: [59.934280, 30.335099],
    connections: ['moscow', 'istanbul', 'berlin'],
    color: 'blue'
  },
  losAngeles : {
    key: 'losAngeles',
    name: 'Los Angeles',
    type: 'cityCard',
    country: 'USA',
    location: [34.052234, -118.243685],
    connections: ['sydney', 'sanFrancisco', 'chicago', 'mexicoCity'],
    color: 'yellow'
  },
  mexicoCity : {
    key: 'mexicoCity',
    name: 'Mexico City',
    type: 'cityCard',
    country: 'Mexico',
    location: [19.432608, -99.133208],
    connections: ['chicago', 'losAngeles', 'miami', 'bogota', 'lima'],
    color: 'yellow'
  },
  miami : {
    key: 'miami',
    name: 'Miami',
    type: 'cityCard',
    country: 'USA',
    location: [25.761680, -80.19179],
    connections: ['dc', 'atlanta', 'mexicoCity', 'bogota'],
    color: 'yellow'
  },
  bogota : {
    key: 'bogota',
    name: 'Bogota',
    type: 'cityCard',
    country: 'Colombia',
    location: [4.710989, -74.072092],
    connections: ['miami', 'mexicoCity', 'lima', 'buenosAires', 'saoPaulo'],
    color: 'yellow'
  },
  lima : {
    key: 'lima',
    name: 'Lima',
    type: 'cityCard',
    country: 'Peru',
    location: [-12.046374, -77.042793],
    connections: ['mexicoCity', 'bogota', 'santiago'],
    color: 'yellow'
  },
  santiago : {
    key: 'santiago',
    name: 'Santiago',
    type: 'cityCard',
    country: 'Chile',
    location: [-33.472788, -70.629831],
    connections: ['lima'],
    color: 'yellow'
  },
  buenosAires : {
    key: 'buenosAires',
    name: 'Buenos Aires',
    type: 'cityCard',
    country: 'Argentina',
    location: [-34.603684, -58.381559],
    connections: ['saoPaulo', 'bogota'],
    color: 'yellow'
  },
  saoPaulo : {
    key: 'saoPaulo',
    name: 'Sao Paulo',
    type: 'cityCard',
    country: 'Brazil',
    location: [-23.550520, -46.633309],
    connections: ['buenosAires', 'bogota', 'madrid', 'lagos'],
    color: 'yellow'
  },
  lagos : {
    key: 'lagos',
    name: 'Lagos',
    type: 'cityCard',
    country: 'Nigeria',
    location: [6.524379, 3.379206],
    connections: ['saoPaulo', 'kinshasa', 'khartoum'],
    color: 'yellow'
  },
  kinshasa : {
    key: 'kinshasa',
    name: 'Kinshasa',
    type: 'cityCard',
    country: 'Democratic Republic of Congo',
    location: [-4.441931, 15.266293],
    connections: ['lagos', 'johannesburg', 'khartoum'],
    color: 'yellow'
  },
  khartoum : {
    key: 'khartoum',
    name: 'Khartoum',
    type: 'cityCard',
    country: 'Sudan',
    location: [15.500654, 32.559899],
    connections: ['lagos', 'cairo', 'kinshasa', 'johannesburg'],
    color: 'yellow'
  },
  johannesburg : {
    key: 'johannesburg',
    name: 'Johannesburg',
    type: 'cityCard',
    country: 'South Africa',
    location: [-26.204103, 28.047305],
    connections: ['kinshasa', 'khartoum'],
    color: 'yellow'
  },
  algiers : {
    key: 'algiers',
    name: 'Algiers',
    type: 'cityCard',
    country: 'Algeria',
    location: [36.752887, 3.042048],
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
    color: 'black'
  },
  cairo : {
    key: 'cairo',
    name: 'Cairo',
    type: 'cityCard',
    country: 'Egypt',
    location: [30.044420, 31.235712],
    connections: ['algiers', 'istanbul', 'baghdad', 'riyadh', 'khartoum'],
    color: 'black'
  },
  istanbul : {
    key: 'istanbul',
    name: 'Istanbul',
    type: 'cityCard',
    country: 'Turkey',
    location: [41.008238, 28.978359],
    connections: ['algiers', 'cairo', 'baghdad', 'moscow', 'stPetersburg', 'milan'],
    color: 'black'
  },
  moscow : {
    key: 'moscow',
    name: 'Moscow',
    type: 'cityCard',
    country: 'Russia',
    location: [55.755826, 37.6173],
    connections: ['stPetersburg', 'istanbul', 'tehran'],
    color: 'black'
  },
  baghdad : {
    key: 'baghdad',
    name: 'Baghdad',
    type: 'cityCard',
    country: 'Iraq',
    location: [33.312806, 44.361488],
    connections: ['istanbul', 'tehran', 'karachi', 'riyadh', 'cairo'],
    color: 'black'
  },
  riyadh : {
    key: 'riyadh',
    name: 'Riyadh',
    type: 'cityCard',
    country: 'Saudi Arabia',
    location: [25.005448, 46.544831],
    connections: ['cairo', 'baghdad', 'karachi'],
    color: 'black'
  },
  tehran : {
    key: 'tehran',
    name: 'Tehran',
    type: 'cityCard',
    country: 'Iran',
    location: [35.689197, 51.388974],
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
    color: 'black'
  },
  karachi : {
    key: 'karachi',
    name: 'Karachi',
    type: 'cityCard',
    country: 'Pakistan',
    location: [24.861462, 67.009939],
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
    color: 'black'
  },
  mumbai : {
    key: 'mumbai',
    name: 'Mumbai',
    type: 'cityCard',
    country: 'India',
    location: [19.075984, 72.877656],
    connections: ['karachi', 'delhi', 'chennai'],
    color: 'black'
  },
  delhi : {
    key: 'delhi',
    name: 'Delhi',
    type: 'cityCard',
    country: 'India',
    location: [21.566381, 73.220507],
    connections: ['tehran', 'kolkata', 'chennai', 'mumbai', 'karachi'],
    color: 'black'
  },
  kolkata : {
    key: 'kolkata',
    name: 'Kolkata',
    type: 'cityCard',
    country: 'India',
    location: [22.572646, 88.363895],
    connections: ['delhi', 'hongKong', 'bangkok', 'chennai'],
    color: 'black'
  },
  chennai : {
    key: 'chennai',
    name: 'Chennai',
    type: 'cityCard',
    country: 'India',
    location: [13.082680, 80.270718],
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
    color: 'black'
  },
  beijing : {
    key: 'beijing',
    name: 'Beijing',
    type: 'cityCard',
    country: 'China',
    location: [39.904211, 116.407395],
    connections: ['seoul', 'shanghai'],
    color: 'red'
  },
  seoul : {
    key: 'seoul',
    name: 'Seoul',
    type: 'cityCard',
    country: 'South Korea',
    location: [37.566535, 126.977969],
    connections: ['beijing', 'tokyo', 'shanghai'],
    color: 'red'
  },
  tokyo : {
    key: 'tokyo',
    name: 'Tokyo',
    type: 'cityCard',
    country: 'Japan',
    location: [35.689487, 139.691706],
    connections: ['sanFrancisco', 'seoul', 'osaka', 'shanghai'],
    color: 'red'
  },
  shanghai : {
    key: 'shanghai',
    name: 'Shanghai',
    type: 'cityCard',
    country: 'China',
    location: [31.230416, 121.473701],
    connections: ['beijing', 'tokyo', 'seoul', 'taipei', 'hongKong'],
    color: 'red'
  },
  hongKong : {
    key: 'hongKong',
    name: 'Hong Kong',
    type: 'cityCard',
    country: 'China',
    location: [22.396428, 114.109497],
    connections: ['kolkata', 'taipei', 'shanghai', 'bangkok', 'hoChiMinhCity', 'manila'],
    color: 'red'
  },
  taipei : {
    key: 'taipei',
    name: 'Taipei',
    type: 'cityCard',
    country: 'Taiwan',
    location: [25.032969, 121.565418],
    connections: ['osaka', 'hongKong', 'shanghai', 'manila'],
    color: 'red'
  },
  osaka : {
    key: 'osaka',
    name: 'Osaka',
    type: 'cityCard',
    country: 'Japan',
    location: [34.693738, 135.502165],
    connections: ['taipei', 'tokyo'],
    color: 'red'
  },
  bangkok : {
    key: 'bangkok',
    name: 'Bangkok',
    type: 'cityCard',
    country: 'Thailand',
    location: [13.756331, 100.501765],
    connections: ['kolkata', 'hongKong', 'hoChiMinhCity', 'jakarta', 'chennai'],
    color: 'red'
  },
  jakarta : {
    key: 'jakarta',
    name: 'Jakarta',
    type: 'cityCard',
    country: 'Indonesia',
    location: [-6.208763, 106.845599],
    connections: ['chennai', 'bangkok', 'hoChiMinhCity', 'sydney'],
    color: 'red'
  },
  hoChiMinhCity : {
    key: 'hoChiMinhCity',
    name: 'Ho Chi Minh City',
    type: 'cityCard',
    country: 'Vietnam',
    location: [10.823099, 106.629664],
    connections: ['bangkok', 'hongKong', 'jakarta', 'manila'],
    color: 'red'
  },
  manila : {
    key: 'manila',
    name: 'Manila',
    type: 'cityCard',
    country: 'Philippines',
    location: [14.599512, 120.984219],
    connections: ['hoChiMinhCity', 'hongKong', 'taipei', 'sanFrancisco', 'sydney'],
    color: 'red'
  },
  sydney : {
    key: 'sydney',
    name: 'Sydney',
    type: 'cityCard',
    country: 'Australia',
    location: [-33.867487, 151.20699],
    connections: ['jakarta', 'manila', 'losAngeles'],
    color: 'red'
  }

});


