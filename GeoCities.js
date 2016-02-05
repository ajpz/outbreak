var GeoCities = [

    {
        key: 'sanFrancisco',
        name: 'San Francisco',
        type: 'cityCard',
        country: 'USA',
        location: [41.7558, -122.419416],
        connections: ['tokyo', 'manila', 'losAngeles', 'chicago'],
        color: 'blue'
    }, {
        key: 'chicago',
        name: 'Chicago',
        type: 'cityCard',
        country: 'USA',
        location: [44.994200, -93.0936],
        connections: ['sanFrancisco', 'losAngeles', 'mexicoCity', 'atlanta', 'montreal'],
        color: 'blue'
    }, {
        key: 'atlanta',
        name: 'Atlanta',
        type: 'cityCard',
        country: 'USA',
        location: [33.748995, -84.387982],
        connections: ['dc', 'miami', 'chicago'],
        color: 'blue'
    }, {
        key: 'montreal',
        name: 'Montreal',
        type: 'cityCard',
        country: 'Canada',
        location: [46.566239, -79.116811],
        connections: ['dc', 'newYork', 'chicago'],
        color: 'blue'
    }, {
        key: 'newYork',
        name: 'New York',
        type: 'cityCard',
        country: 'USA',
        location: [44.367342, -64.012666],
        connections: ['montreal', 'dc', 'london', 'madrid'],
        color: 'blue'
    }, {
        key: 'dc',
        name: 'Washington DC',
        type: 'cityCard',
        country: 'USA',
        location: [32.407446, -64.012666],
        connections: ['atlanta', 'montreal', 'newYork', 'miami'],
        color: 'blue'
    }, {
        key: 'london',
        name: 'London',
        type: 'cityCard',
        country: 'UK',
        location: [54.683934, -15.502873],
        connections: ['newYork', 'madrid', 'paris', 'berlin'],
        color: 'blue'
    }, {
        key: 'madrid',
        name: 'Madrid',
        type: 'cityCard',
        country: 'Spain',
        location: [38.820437, -14.335510],
        connections: ['saoPaulo', 'newYork', 'algiers', 'paris', 'london'],
        color: 'blue'
    }, {
        key: 'paris',
        name: 'Paris',
        type: 'cityCard',
        country: 'France',
        location: [48.856614, 2.352222],
        connections: ['london', 'madrid', 'milan', 'berlin', 'algiers'],
        color: 'blue'
    }, {
        key: 'berlin',
        name: 'Berlin',
        type: 'cityCard',
        country: 'Germany',
        location: [52.520007, 13.404954],
        connections: ['london', 'milan', 'paris', 'stPetersburg'],
        color: 'blue'
    }, {
        key: 'milan',
        name: 'Milan',
        type: 'cityCard',
        country: 'Italy',
        location: [40.926716, 14.995174],
        connections: ['istanbul', 'paris', 'berlin'],
        color: 'blue'
    }, {
        key: 'stPetersburg',
        name: 'St Petersburg',
        type: 'cityCard',
        country: 'Russia',
        location: [59.934280, 30.335099],
        connections: ['moscow', 'istanbul', 'berlin'],
        color: 'blue'
    }, {
        key: 'losAngeles',
        name: 'Los Angeles',
        type: 'cityCard',
        country: 'USA',
        location: [23.359891, -118.485900],
        connections: ['sydney', 'sanFrancisco', 'chicago', 'mexicoCity'],
        color: 'yellow'
    }, {
        key: 'mexicoCity',
        name: 'Mexico City',
        type: 'cityCard',
        country: 'Mexico',
        location: [18.205068, -97.649483],
        connections: ['chicago', 'losAngeles', 'miami', 'bogota', 'lima'],
        color: 'yellow'
    }, {
        key: 'miami',
        name: 'Miami',
        type: 'cityCard',
        country: 'USA',
        location: [25.003754, -77.402244],
        connections: ['dc', 'atlanta', 'mexicoCity', 'bogota'],
        color: 'yellow'
    }, {
        key: 'bogota',
        name: 'Bogota',
        type: 'cityCard',
        country: 'Colombia',
        location: [4.710989, -74.072092],
        connections: ['miami', 'mexicoCity', 'lima', 'buenosAires', 'saoPaulo'],
        color: 'yellow'
    }, {
        key: 'lima',
        name: 'Lima',
        type: 'cityCard',
        country: 'Peru',
        location: [-17.604774, -87.372619],
        connections: ['mexicoCity', 'bogota', 'santiago'],
        color: 'yellow'
    }, {
        key: 'santiago',
        name: 'Santiago',
        type: 'cityCard',
        country: 'Chile',
        location: [-37.337422, -81.923400],
        connections: ['lima'],
        color: 'yellow'
    }, {
        key: 'buenosAires',
        name: 'Buenos Aires',
        type: 'cityCard',
        country: 'Argentina',
        location: [-34.603684, -58.381559],
        connections: ['saoPaulo', 'bogota'],
        color: 'yellow'
    }, {
        key: 'saoPaulo',
        name: 'Sao Paulo',
        type: 'cityCard',
        country: 'Brazil',
        location: [-23.550520, -46.633309],
        connections: ['buenosAires', 'bogota', 'madrid', 'lagos'],
        color: 'yellow'
    }, {
        key: 'lagos',
        name: 'Lagos',
        type: 'cityCard',
        country: 'Nigeria',
        location: [6.524379, 3.379206],
        connections: ['saoPaulo', 'kinshasa', 'khartoum'],
        color: 'yellow'
    }, {
        key: 'kinshasa',
        name: 'Kinshasa',
        type: 'cityCard',
        country: 'Democratic Republic of Congo',
        location: [-4.441931, 15.266293],
        connections: ['lagos', 'johannesburg', 'khartoum'],
        color: 'yellow'
    }, {
        key: 'khartoum',
        name: 'Khartoum',
        type: 'cityCard',
        country: 'Sudan',
        location: [15.500654, 32.559899],
        connections: ['lagos', 'cairo', 'kinshasa', 'johannesburg'],
        color: 'yellow'
    }, {
        key: 'johannesburg',
        name: 'Johannesburg',
        type: 'cityCard',
        country: 'South Africa',
        location: [-26.204103, 28.047305],
        connections: ['kinshasa', 'khartoum'],
        color: 'yellow'
    }, {
        key: 'algiers',
        name: 'Algiers',
        type: 'cityCard',
        country: 'Algeria',
        location: [30.463737, 3.657282],
        connections: ['madrid', 'paris', 'istanbul', 'cairo'],
        color: 'black'
    }, {
        key: 'cairo',
        name: 'Cairo',
        type: 'cityCard',
        country: 'Egypt',
        location: [25.578028, 27.475642],
        connections: ['algiers', 'istanbul', 'baghdad', 'riyadh', 'khartoum'],
        color: 'black'
    }, {

        key: 'istanbul',
        name: 'Istanbul',
        type: 'cityCard',
        country: 'Turkey',
        location: [41.008238, 28.978359],
        connections: ['algiers', 'cairo', 'baghdad', 'moscow', 'stPetersburg', 'milan'],
        color: 'black'
    }, {

        key: 'moscow',
        name: 'Moscow',
        type: 'cityCard',
        country: 'Russia',
        location: [55.038036, 44.614313],
        connections: ['stPetersburg', 'istanbul', 'tehran'],
        color: 'black'
    }, {

        key: 'baghdad',
        name: 'Baghdad',
        type: 'cityCard',
        country: 'Iraq',
        location: [33.312806, 44.361488],
        connections: ['istanbul', 'tehran', 'karachi', 'riyadh', 'cairo'],
        color: 'black'
    }, {

        key: 'riyadh',
        name: 'Riyadh',
        type: 'cityCard',
        country: 'Saudi Arabia',
        location: [17.828092, 44.438532],
        connections: ['cairo', 'baghdad', 'karachi'],
        color: 'black'
    }, {

        key: 'tehran',
        name: 'Tehran',
        type: 'cityCard',
        country: 'Iran',
        location: [42.176354, 57.446344],
        connections: ['moscow', 'baghdad', 'karachi', 'delhi'],
        color: 'black'
    }, {

        key: 'karachi',
        name: 'Karachi',
        type: 'cityCard',
        country: 'Pakistan',
        location: [24.861462, 67.009939],
        connections: ['riyadh', 'baghdad', 'tehran', 'delhi', 'mumbai'],
        color: 'black'
    }, {

        key: 'mumbai',
        name: 'Mumbai',
        type: 'cityCard',
        country: 'India',
        location: [13.342488, 67.202204],
        connections: ['karachi', 'delhi', 'chennai'],
        color: 'black'
    }, {

        key: 'delhi',
        name: 'Delhi',
        type: 'cityCard',
        country: 'India',
        location: [32.547392, 77.382217],
        connections: ['tehran', 'kolkata', 'chennai', 'mumbai', 'karachi'],
        color: 'black'
    }, {

        key: 'kolkata',
        name: 'Kolkata',
        type: 'cityCard',
        country: 'India',
        location: [31.203992, 90.653701],
        connections: ['delhi', 'hongKong', 'bangkok', 'chennai'],
        color: 'black'
    }, {

        key: 'chennai',
        name: 'Chennai',
        type: 'cityCard',
        country: 'India',
        location: [5.616669, 82.567764],
        connections: ['mumbai', 'delhi', 'kolkata', 'bangkok', 'jakarta'],
        color: 'black'
    }, {

        key: 'beijing',
        name: 'Beijing',
        type: 'cityCard',
        country: 'China',
        location: [44.083459, 109.557534],
        connections: ['seoul', 'shanghai'],
        color: 'red'
    }, {

        key: 'seoul',
        name: 'Seoul',
        type: 'cityCard',
        country: 'South Korea',
        location: [45.283126, 127.408184],
        connections: ['beijing', 'tokyo', 'shanghai'],
        color: 'red'
    }, {

        key: 'tokyo',
        name: 'Tokyo',
        type: 'cityCard',
        country: 'Japan',
        location: [41.609692, 141.795275],
        connections: ['sanFrancisco', 'seoul', 'osaka', 'shanghai'],
        color: 'red'
    }, {

        key: 'shanghai',
        name: 'Shanghai',
        type: 'cityCard',
        country: 'China',
        location: [34.924432, 111.244909],
        connections: ['beijing', 'tokyo', 'seoul', 'taipei', 'hongKong'],
        color: 'red'
    }, {

        key: 'hongKong',
        name: 'Hong Kong',
        type: 'cityCard',
        country: 'China',
        location: [22.396428, 114.109497],
        connections: ['kolkata', 'taipei', 'shanghai', 'bangkok', 'hoChiMinhCity', 'manila'],
        color: 'red'
    }, {

        key: 'taipei',
        name: 'Taipei',
        type: 'cityCard',
        country: 'Taiwan',
        location: [22.747271, 127.319375],
        connections: ['osaka', 'hongKong', 'shanghai', 'manila'],
        color: 'red'
    }, {
        key: 'osaka',
        name: 'Osaka',
        type: 'cityCard',
        country: 'Japan',
        location: [27.961229, 141.972893],
        connections: ['taipei', 'tokyo'],
        color: 'red'
    }, {

        key: 'bangkok',
        name: 'Bangkok',
        type: 'cityCard',
        country: 'Thailand',
        location: [13.756331, 100.501765],
        connections: ['kolkata', 'hongKong', 'hoChiMinhCity', 'jakarta', 'chennai'],
        color: 'red'
    }, {

        key: 'jakarta',
        name: 'Jakarta',
        type: 'cityCard',
        country: 'Indonesia',
        location: [-9.271532, 99.966141],
        connections: ['chennai', 'bangkok', 'hoChiMinhCity', 'sydney'],
        color: 'red'
    }, {

        key: 'hoChiMinhCity',
        name: 'Ho Chi Minh City',
        type: 'cityCard',
        country: 'Vietnam',
        location: [0.279132, 110.356818],
        connections: ['bangkok', 'hongKong', 'jakarta', 'manila'],
        color: 'red'
    }, {

        key: 'manila',
        name: 'Manila',
        type: 'cityCard',
        country: 'Philippines',
        location: [0.279132, 132.825546],
        connections: ['hoChiMinhCity', 'hongKong', 'taipei', 'sanFrancisco', 'sydney'],
        color: 'red'
    }, {

        key: 'sydney',
        name: 'Sydney',
        type: 'cityCard',
        country: 'Australia',
        location: [-33.867487, 151.20699],
        connections: ['jakarta', 'manila', 'losAngeles'],
        color: 'red'
    }

]

exports.GeoCities = GeoCities;
