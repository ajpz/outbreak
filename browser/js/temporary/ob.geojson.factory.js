

//// Generate 1 line between 2 cities once for each connection
// {
//     "type": "FeatureCollection",
//     "features": [
//     ///////////
//         {
//             "type": "Feature",
//             "properties": {
//               "id": 1
//             },
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [
//                         -118.243685,
//                         34.052234
//                     ],
//                     [
//                         -122.419416,
//                         37.774929
//                     ]

//                 ]
//             }
//         }
//     /////////
//     ]
// }

app.factory('GeoJson', function(GeoCities) {
    // make a list of all possible connections between pairs of cities, no dups!
    // function makeListOfConnections(){
    //     var connectedCities = [];
    //     var connectionNames = [];

    //     Cities.forEach(function(city){
    //         city.connections.forEach(function(individualConnection){
    //             // sort two cities alphabetically
    //             var sorted = [city.key, individualConnection].sort();
    //             var concatNames = sorted.join("&&")
    //             // push it to the connections (key is alphabetically before value)
    //             if (connectionNames.indexOf(concatNames) === -1){
    //                 connectionNames.push(concatNames);
    //                 connectedCities.push({sorted[0]:sorted[1]});
    //             }
    //         })
    //         // connectedCities.push(city.name)
    //     })
    // }

    function makeListOfConnections(){
        var connectedCities = [];
        var connectionNames = [];

        GeoCities.forEach(function(city){
            city.connections.forEach(function(individualConnection){
                // sort two cities alphabetically
                var sorted = [city.key, individualConnection].sort();
                var concatNames = sorted.join("&&")
                // push it to the connections (key is alphabetically before value)
                if (connectionNames.indexOf(concatNames) === -1){
                    connectionNames.push(concatNames);
                    connectedCities.push(sorted);
                }
            })
            // connectedCities.push(city.name)
        })

        return connectedCities;
        // this is returning  [['sanFrancisco', 'toyko'], ['manila', 'sanFrancisco']]
    }

    function getCityCoordinates(){
        var connectedCities = makeListOfConnections();
        var connectedCitiesCoords = [];
        var counter = 0;
        connectedCities.forEach(function(cityPair){
            var firstCoords = getCityCoords(cityPair[0]);
            var secondCoords = getCityCoords(cityPair[1])
            connectedCitiesCoords.push([firstCoords, secondCoords]);
        })
        return connectedCitiesCoords;
        // this is returning [[[cityLong, cityLat], [othercityLong, otherCityLat]]]
    }

    // {
//             "type": "Feature",
//             "properties": {
//               "id": 1
//             },
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [
//                         -118.243685,
//                         34.052234
//                     ],
//                     [
//                         -122.419416,
//                         37.774929
//                     ]

//                 ]
//             }
//         }


    function generateLineFeature(){
        var allCoords = getCityCoordinates();
        var formatted = [];
        allCoords.forEach(function(coordsSet, index){
            var newObj = {
                "type": "Feature",
                "properties": {
                  "id": index+1
                },
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [
                            coordsSet[0][0],
                            coordsSet[0][1]
                        ],
                        [
                            coordsSet[1][0],
                            coordsSet[1][1]
                        ]

                    ]
                }
            };
            formatted.push(newObj);
        })
        console.log(formatted[0]);

    }

    function createLinesFeatureCollection(){

    }
////////////
    // make a list of all cities (make 4 lists, one for each color?)
    function getCityAndCoords(){
        // returns array of ['cityKey', [long, lat], ...]
        var cityAndCoordinates = []

        GeoCities.forEach(function(city){
            cityAndCoordinates.push(city.key, city.location.reverse())
        })
        console.log("city and coordinates: ")
        console.log(cityAndCoordinates)
        return cityAndCoordinates;
    }

    // gets all the coordinates for all the cities
    function getListOfPoints(){
        var coordinates = []

        GeoCities.forEach(function(city){
            coordinates.push(city.location.reverse())
        })
        console.log("coordinates: ")
        console.log(coordinates)
        return coordinates;
    }

    // gets the coordinates for any city
    function getCityCoords(somecity){
        var cityAndCoordinates = getCityAndCoords();

        var cityCoordinates = cityAndCoordinates[cityAndCoordinates.indexOf(somecity)+1]
        console.log("some city: ", somecity)
        console.log("it's coordinates: ", cityCoordinates)
        return cityCoordinates;
    }

    function generatePointFeature(){

    }

    function createPointsFeatureCollection(){

    }



});
