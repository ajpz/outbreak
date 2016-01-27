const cities = {
  sanFrancisco : {
    name: 'San Francisco',
    country: 'USA',
    location: [],
    connections: ['tokyo', 'manila', 'losAngeles', 'chicago'],
    color: 'blue'
  },
  chicago : {
    name: 'Chicago',
    country: 'USA',
    location: [],
    connections: ['sanFrancisco', 'losAngeles', 'mexicoCity', 'atlanta', 'montreal'],
    color: 'blue'
  },
  atlanta : {
    name: 'Atlanta',
    country: 'USA',
    location: [],
    connections: ['dc', 'miami', 'chicago'],
    color: 'blue'
  },
  montreal : {
    name: 'montreal',
    country: 'Canada',
    location: [],
    connections: ['dc', 'newYork', 'chicago'],
    color: 'blue'
  },
  newYork : {
    name: 'New York',
    country: 'USA',
    location: [],
    connections: ['montreal', 'dc', 'london', 'madrid'],
    color: 'blue'
  },
  dc : {
    name: 'Washington DC',
    country: 'USA',
    location: [],
    connections: ['atlanta', 'montreal', 'newYork', 'miami'],
    color: 'blue'
  },
  london : {
    name: 'London',
    country: 'UK',
    location: [],
    connections: ['newYork', 'madrid', 'paris', 'berlin'],
    color: 'blue'
  },
  madrid : {
    name: 'Madrid',
    country: 'Spain',
    location: [],
    connections: ['saoPaulo', 'newYork', 'algiers', 'paris', 'london'],
    color: 'blue'
  },
  paris : {
    name: 'Paris',
    country: 'France',
    location: [],
    connections: ['london', 'madrid', 'milan', 'berlin', 'algiers'],
    color: 'blue'
  },
  berlin : {
    name: 'Berlin',
    country: 'Germany',
    location: [],
    connections: ['london', 'milan', 'paris', 'stPetersburg'],
    color: 'blue'
  },
  milan : {
    name: 'Milan',
    country: 'Italy',
    location: [],
    connections: ['istanbul', 'paris', 'berlin'],
    color: 'blue'
  },
  stPetersburg : {
    name: 'St Petersburg',
    country: 'Russia',
    location: [],
    connections: ['moscow', 'istanbul', 'berlin'],
    color: 'blue'
  },
  losAngeles : {
    name: 'Los Angeles',
    country: 'USA',
    location: [],
    connections: ['sydney', 'sanFrancisco', 'chicago', 'mexicoCity'],
    color: 'yellow'
  },
  mexicoCity : {
    name: 'Mexico City',
    country: 'Mexico',
    location: [],
    connections: ['chicago', 'losAngeles', 'miami', 'bogota', 'lima'],
    color: 'yellow'
  },
  miami : {
    name: 'Miami',
    country: 'USA',
    location: [],
    connections: ['dc', 'atlanta', 'mexicoCity', 'bogota'],
    color: 'yellow'
  },
  bogota : {
    name: 'Bogota',
    country: 'Colombia',
    location: [],
    connections: ['miami', 'mexicoCity', 'lima', 'buenosAires', 'saoPaulo'],
    color: 'yellow'
  },
  lima : {
    name: 'Lima',
    country: 'Peru',
    location: [],
    connections: ['mexicoCity', 'bogota', 'santiago'],
    color: 'yellow'
  },
  santiago : {
    name: 'Santiago',
    country: 'Chile',
    location: [],
    connections: ['lima'],
    color: 'yellow'
  },
  buenosAires : {
    name: 'Buenos Aires',
    country: 'Argentina',
    location: [],
    connections: ['saoPaulo', 'bogota'],
    color: 'yellow'
  },
  saoPaulo : {
    name: 'Sao Paulo',
    country: 'Brazil',
    location: [],
    connections: ['buenosAires', 'bogota', 'madrid', 'lagos'],
    color: 'yellow'
  },
  lagos : {
    name: 'Lagos',
    country: 'Nigeria',
    location: [],
    connections: ['saoPaulo', 'kinshasa', 'khartoum'],
    color: 'yellow'
  },
  kinshasa : {
    name: 'Kinshasa',
    country: 'Democratic Republic of Congo',
    location: [],
    connections: ['lagos', 'johannesburg', 'khartoum'],
    color: 'yellow'
  },
  khartoum : {
    name: 'Khartoum',
    country: 'Sudan',
    location: [],
    connections: ['lagos', 'cairo', 'kinshasa', 'johannesburg'],
    color: 'yellow'
  },
  johannesburg : {
    name: 'Johannesburg',
    country: 'South Africa',
    location: [],
    connections: ['kinshasa', 'khartoum'],
    color: 'yellow'
  },
  algiers : {
    name: 'Algiers',
    country: 'Algeria',
    location: [],
    connections: ['madrid', 'paris', 'istanbul', 'cairo'],
    color: 'black'
  },
  cairo : {
    name: 'Cairo',
    country: 'Egypt',
    location: [],
    connections: ['algiers', 'istanbul', 'baghdad', 'riyadh', 'khartoum'],
    color: 'black'
  },
  istanbul : {
    name: 'Istanbul',
    country: 'Turkey',
    location: [],
    connections: ['algiers', 'cairo', 'baghdad', 'moscow', 'stPetersburg', 'milan'],
    color: 'black'
  },
  moscow : {
    name: 'Moscow',
    country: 'Russia',
    location: [],
    connections: ['stPetersburg', 'istanbul', 'tehran'],
    color: 'black'
  },
  baghdad : {
    name: 'Baghdad',
    country: 'Iraq',
    location: [],
    connections: ['istanbul', 'tehran', 'karachi', 'riyadh', 'cairo'],
    color: 'black'
  },
  riyadh : {
    name: 'Riyadh',
    country: 'Saudi Arabia',
    location: [],
    connections: ['cairo', 'baghdad', 'karachi'],
    color: 'black'
  },
  tehran : {
    name: 'Tehran',
    country: 'Iran',
    location: [],
    connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
    color: 'black'
  },
  karachi : {
    name: 'Karachi',
    country: 'Pakistan',
    location: [],
    connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
    color: 'black'
  },
  mumbai : {
    name: 'Mumbai',
    country: 'India',
    location: [],
    connections: ['karachi', 'delhi', 'chennai'],
    color: 'black'
  },
  delhi : {
    name: 'Delhi',
    country: 'India',
    location: [],
    connections: ['tehran', 'kolkata', 'chennai', 'mumbai', 'karachi'],
    color: 'black'
  },
  kolkata : {
    name: 'Kolkata',
    country: 'India',
    location: [],
    connections: ['delhi', 'hongKong', 'bangkok', 'chennai'],
    color: 'black'
  },
  chennai : {
    name: 'Chennai',
    country: 'India',
    location: [],
    connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
    color: 'black'
  },
    beijing : {
    name: 'Beijing',
    country: 'China',
    location: [],
    connections: ['seoul', 'shanghai'],
    color: 'red'
  },
  seoul : {
    name: 'Seoul',
    country: 'South Korea',
    location: [],
    connections: ['beijing', 'tokyo', 'shanghai'],
    color: 'red'
  },
  tokyo : {
    name: 'Tokyo',
    country: 'Japan',
    location: [],
    connections: ['sanFrancisco', 'seoul', 'osaka', 'shanghai'],
    color: 'red'
  },
  shanghai : {
    name: 'Shanghai',
    country: 'China',
    location: [],
    connections: ['beijing', 'tokyo', 'seoul', 'taipei', 'hongKong'],
    color: 'red'
  },
  hongKong : {
    name: 'Hong Kong',
    country: 'China',
    location: [],
    connections: ['kolkata', 'taipei', 'shanghai', 'bangkok', 'hoChiMinhCity', 'manila'],
    color: 'red'
  },
  taipei : {
    name: 'Taipei',
    country: 'Taiwan',
    location: [],
    connections: ['osaka', 'hongKong', 'shanghai', 'manila'],
    color: 'red'
  },
  osaka : {
    name: 'Osaka',
    country: 'Japan',
    location: [],
    connections: ['taipei', 'tokyo'],
    color: 'red'
  },
  bangkok : {
    name: 'Bangkok',
    country: 'Thailand',
    location: [],
    connections: ['kolkata', 'hongKong', 'hoChiMinhCity', 'jakarta', 'chennai'],
    color: 'red'
  },
  jakarta : {
    name: 'Jakarta',
    country: 'Indonesia',
    location: [],
    connections: ['chennai', 'bangkok', 'hoChiMinhCity', 'sydney'],
    color: 'red'
  },
  hoChiMinhCity : {
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    location: [],
    connections: ['bangkok', 'hongKong', 'jakarta', 'manila'],
    color: 'red'
  },
  manila : {
    name: 'Manila',
    country: 'Philippines',
    location: [],
    connections: ['hoChiMinhCity', 'hongKong', 'taipei', 'sanFrancisco', 'sydney'],
    color: 'red'
  },
  sydney : {
    name: 'Sydney',
    country: 'Australia',
    location: [],
    connections: ['jakarta', 'manila', 'losAngeles'],
    color: 'red'
  },
}
