const cities = {
  sanFrancisco : {
    name: 'San Francisco',
    country: 'USA',
    location: [37.774929, -122.419416],
    connections: ['tokyo', 'manila', 'losAngeles', 'chicago'],
    color: 'blue'
  },
  chicago : {
    name: 'Chicago',
    country: 'USA',
    location: [41.878114, -87.629798],
    connections: ['sanFrancisco', 'losAngeles', 'mexicoCity', 'atlanta', 'montreal'],
    color: 'blue'
  },
  atlanta : {
    name: 'Atlanta',
    country: 'USA',
    location: [33.748995, -84.387982],
    connections: ['dc', 'miami', 'chicago'],
    color: 'blue'
  },
  montreal : {
    name: 'Montreal',
    country: 'Canada',
    location: [45.501689, -73.567256],
    connections: ['dc', 'newYork', 'chicago'],
    color: 'blue'
  },
  newYork : {
    name: 'New York',
    country: 'USA',
    location: [40.712784, -74.005941],
    connections: ['montreal', 'dc', 'london', 'madrid'],
    color: 'blue'
  },
  dc : {
    name: 'Washington DC',
    country: 'USA',
    location: [38.907192, -77.036871],
    connections: ['atlanta', 'montreal', 'newYork', 'miami'],
    color: 'blue'
  },
  london : {
    name: 'London',
    country: 'UK',
    location: [51.507351, -0.127758],
    connections: ['newYork', 'madrid', 'paris', 'berlin'],
    color: 'blue'
  },
  madrid : {
    name: 'Madrid',
    country: 'Spain',
    location: [40.416775, -3.703790],
    connections: ['saoPaulo', 'newYork', 'algiers', 'paris', 'london'],
    color: 'blue'
  },
  paris : {
    name: 'Paris',
    country: 'France',
    location: [48.856614, 2.352222],
    connections: ['london', 'madrid', 'milan', 'berlin', 'algiers'],
    color: 'blue'
  },
  berlin : {
    name: 'Berlin',
    country: 'Germany',
    location: [52.520007,13.404954],
    connections: ['london', 'milan', 'paris', 'stPetersburg'],
    color: 'blue'
  },
  milan : {
    name: 'Milan',
    country: 'Italy',
    location: [45.465422, 9.185924],
    connections: ['istanbul', 'paris', 'berlin'],
    color: 'blue'
  },
  stPetersburg : {
    name: 'St Petersburg',
    country: 'Russia',
    location: [59.934280, 30.335099],
    connections: ['moscow', 'istanbul', 'berlin'],
    color: 'blue'
  },
  losAngeles : {
    name: 'Los Angeles',
    country: 'USA',
    location: [34.052234, -118.243685],
    connections: ['sydney', 'sanFrancisco', 'chicago', 'mexicoCity'],
    color: 'yellow'
  },
  mexicoCity : {
    name: 'Mexico City',
    country: 'Mexico',
    location: [19.432608, -99.133208],
    connections: ['chicago', 'losAngeles', 'miami', 'bogota', 'lima'],
    color: 'yellow'
  },
  miami : {
    name: 'Miami',
    country: 'USA',
    location: [25.761680, -80.19179],
    connections: ['dc', 'atlanta', 'mexicoCity', 'bogota'],
    color: 'yellow'
  },
  bogota : {
    name: 'Bogota',
    country: 'Colombia',
    location: [4.710989, -74.072092],
    connections: ['miami', 'mexicoCity', 'lima', 'buenosAires', 'saoPaulo'],
    color: 'yellow'
  },
  lima : {
    name: 'Lima',
    country: 'Peru',
    location: [-12.046374, -77.042793],
    connections: ['mexicoCity', 'bogota', 'santiago'],
    color: 'yellow'
  },
  santiago : {
    name: 'Santiago',
    country: 'Chile',
    location: [-33.472788, -70.629831],
    connections: ['lima'],
    color: 'yellow'
  },
  buenosAires : {
    name: 'Buenos Aires',
    country: 'Argentina',
    location: [-34.603684, -58.381559],
    connections: ['saoPaulo', 'bogota'],
    color: 'yellow'
  },
  saoPaulo : {
    name: 'Sao Paulo',
    country: 'Brazil',
    location: [-23.550520, -46.633309],
    connections: ['buenosAires', 'bogota', 'madrid', 'lagos'],
    color: 'yellow'
  },
  lagos : {
    name: 'Lagos',
    country: 'Nigeria',
    location: [6.524379, 3.379206],
    connections: ['saoPaulo', 'kinshasa', 'khartoum'],
    color: 'yellow'
  },
  kinshasa : {
    name: 'Kinshasa',
    country: 'Democratic Republic of Congo',
    location: [-4.441931, 15.266293],
    connections: ['lagos', 'johannesburg', 'khartoum'],
    color: 'yellow'
  },
  khartoum : {
    name: 'Khartoum',
    country: 'Sudan',
    location: [15.500654, 32.559899],
    connections: ['lagos', 'cairo', 'kinshasa', 'johannesburg'],
    color: 'yellow'
  },
  johannesburg : {
    name: 'Johannesburg',
    country: 'South Africa',
    location: [-26.204103, 28.047305],
    connections: ['kinshasa', 'khartoum'],
    color: 'yellow'
  },
  algiers : {
    name: 'Algiers',
    country: 'Algeria',
    location: [36.752887, 3.042048],
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
    color: 'black'
  },
  cairo : {
    name: 'Cairo',
    country: 'Egypt',
    location: [30.044420, 31.235712],
    connections: ['algiers', 'istanbul', 'baghdad', 'riyadh', 'khartoum'],
    color: 'black'
  },
  istanbul : {
    name: 'Istanbul',
    country: 'Turkey',
    location: [41.008238, 28.978359],
    connections: ['algiers', 'cairo', 'baghdad', 'moscow', 'stPetersburg', 'milan'],
    color: 'black'
  },
  moscow : {
    name: 'Moscow',
    country: 'Russia',
    location: [55.755826, 37.6173],
    connections: ['stPetersburg', 'istanbul', 'tehran'],
    color: 'black'
  },
  baghdad : {
    name: 'Baghdad',
    country: 'Iraq',
    location: [33.312806, 44.361488],
    connections: ['istanbul', 'tehran', 'karachi', 'riyadh', 'cairo'],
    color: 'black'
  },
  riyadh : {
    name: 'Riyadh',
    country: 'Saudi Arabia',
    location: [25.005448, 46.544831],
    connections: ['cairo', 'baghdad', 'karachi'],
    color: 'black'
  },
  tehran : {
    name: 'Tehran',
    country: 'Iran',
    location: [35.689197, 51.388974],
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
    color: 'black'
  },
  karachi : {
    name: 'Karachi',
    country: 'Pakistan',
    location: [24.861462, 67.009939],
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
    color: 'black'
  },
  mumbai : {
    name: 'Mumbai',
    country: 'India',
    location: [19.075984, 72.877656],
    connections: ['karachi', 'delhi', 'chennai'],
    color: 'black'
  },
  delhi : {
    name: 'Delhi',
    country: 'India',
    location: [21.566381, 73.220507],
    connections: ['tehran', 'kolkata', 'chennai', 'mumbai', 'karachi'],
    color: 'black'
  },
  kolkata : {
    name: 'Kolkata',
    country: 'India',
    location: [22.572646, 88.363895],
    connections: ['delhi', 'hongKong', 'bangkok', 'chennai'],
    color: 'black'
  },
  chennai : {
    name: 'Chennai',
    country: 'India',
    location: [13.082680, 80.270718],
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
    color: 'black'
  },
    beijing : {
    name: 'Beijing',
    country: 'China',
    location: [39.904211, 116.407395],
    connections: ['seoul', 'shanghai'],
    color: 'red'
  },
  seoul : {
    name: 'Seoul',
    country: 'South Korea',
    location: [37.566535, 126.977969],
    connections: ['beijing', 'tokyo', 'shanghai'],
    color: 'red'
  },
  tokyo : {
    name: 'Tokyo',
    country: 'Japan',
    location: [35.689487, 139.691706],
    connections: ['sanFrancisco', 'seoul', 'osaka', 'shanghai'],
    color: 'red'
  },
  shanghai : {
    name: 'Shanghai',
    country: 'China',
    location: [31.230416, 121.473701],
    connections: ['beijing', 'tokyo', 'seoul', 'taipei', 'hongKong'],
    color: 'red'
  },
  hongKong : {
    name: 'Hong Kong',
    country: 'China',
    location: [22.396428, 114.109497],
    connections: ['kolkata', 'taipei', 'shanghai', 'bangkok', 'hoChiMinhCity', 'manila'],
    color: 'red'
  },
  taipei : {
    name: 'Taipei',
    country: 'Taiwan',
    location: [25.032969, 121.565418],
    connections: ['osaka', 'hongKong', 'shanghai', 'manila'],
    color: 'red'
  },
  osaka : {
    name: 'Osaka',
    country: 'Japan',
    location: [34.693738, 135.502165],
    connections: ['taipei', 'tokyo'],
    color: 'red'
  },
  bangkok : {
    name: 'Bangkok',
    country: 'Thailand',
    location: [13.756331, 100.501765],
    connections: ['kolkata', 'hongKong', 'hoChiMinhCity', 'jakarta', 'chennai'],
    color: 'red'
  },
  jakarta : {
    name: 'Jakarta',
    country: 'Indonesia',
    location: [-6.208763, 106.845599],
    connections: ['chennai', 'bangkok', 'hoChiMinhCity', 'sydney'],
    color: 'red'
  },
  hoChiMinhCity : {
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    location: [10.823099, 106.629664],
    connections: ['bangkok', 'hongKong', 'jakarta', 'manila'],
    color: 'red'
  },
  manila : {
    name: 'Manila',
    country: 'Philippines',
    location: [14.599512, 120.984219],
    connections: ['hoChiMinhCity', 'hongKong', 'taipei', 'sanFrancisco', 'sydney'],
    color: 'red'
  },
  sydney : {
    name: 'Sydney',
    country: 'Australia',
    location: [-33.867487, 151.20699],
    connections: ['jakarta', 'manila', 'losAngeles'],
    color: 'red'
  }
};


