app.directive('map', function(GeoLines, Cities, Roles, Diseases){
  return {
    restrict: 'EA',
    scope: {
      // callback: '='
    },
    templateUrl: 'js/directives/map/ob.map.directive.html',
    link: function(scope, element, attributes){
        L.mapbox.accessToken = 'pk.eyJ1Ijoib3BwZXJhdG9yIiwiYSI6ImNpanluaXp1NzIxbm52Ymx6NGx1dWl3MXUifQ.ND7TeWHOVFWg39S7nB-FTQ';
        var map = L.mapbox.map('map', 'opperator.60d841d4').setView([40.416775, -3.703790], 3);

        // L.marker is a low-level marker constructor in Leaflet.
        var geojsonLines = GeoLines.lines[0].features;
        var myStyle = {'strokeColor': 'red'};
        var myLayer = L.mapbox.featureLayer().setGeoJSON(geojsonLines, {style: myStyle}).addTo(map);

        var colors = {blue: '#2F3F73', red: '#A8383B', yellow: '#FF9900', black: '#000'};
        for (var key in Cities){
          if (Cities.hasOwnProperty(key)) {
            L.circleMarker(Cities[key].location, {
              'className' : 'testING',
              'marker-color' : colors[Cities[key].color],
              'color' : colors[Cities[key].color],
              'fill' : true,
              'fillOpacity' : 1,
              'fillColor' : colors[Cities[key].color],
              'opacity' : 1,
              'radius' : 6
            }).addTo(map);
          }
        }
        /////////// static ends above

        var payload = {
          gamers: [
            {
              role: 'medic',
              currentCity: 'newYork'
            },
            {
              role: 'scientist',
              currentCity: 'montreal'
            },
            {
              role: 'researcher',
              currentCity: 'madrid'
            },
            {
              role: 'operationsExpert',
              currentCity: 'mumbai'
            }
          ],
          researchCenterLocations: ['atlanta', 'mexicoCity', 'newYork'],
          cities: [
            {
              key: 'newYork',
              red: 0,
              black: 0,
              blue: 1,
              yellow: 2
            }
          ],

        }


        var researchCenterIcon = 'http://i.imgur.com/K9xek5X.png';


      // this is for counting markers to be added to cities
        var markers = [];
        addMarkerToMarkerObj();
        function addMarkerToMarkerObj(){
          console.log("wooot1", markers)
          payload.researchCenterLocations.forEach(function(cityKey){
            var cityMarkers = markers.filter(function(aMarker){
              return aMarker.cityName === cityKey;
            })
            if (cityMarkers.length > 0){
              cityMarkers[0].markers.push({type: 'researchCenter', name: null});
            }
            else {
              markers.push({key: cityKey, markers: [{type: 'researchCenter', name: null}]});
            }
          })
          console.log("wooot2", markers)
          payload.gamers.forEach(function(gamer){
            var cityMarkers = markers.filter(function(aMarker){
              return aMarker.cityName === gamer.currentCity;
            })
            if (cityMarkers.length > 0){
              cityMarkers[0].markers.push({type: 'role', name: gamer.role});
            }
            else {
              markers.push({key: gamer.currentCity, markers: [{type: 'role', name: gamer.role}]});
            }

          })
          console.log("wooot3", markers)
          var cityMarkers;
          payload.cities.forEach(function(cityObj){
            console.log(cityObj, "FOOD")
            cityMarkers = markers.filter(function(aMarker){
              return aMarker.cityName === cityObj.key;
            })
            if (cityMarkers.length === 0){
              markers.push({cityName: cityObj.key, markers: []})
            }
            cityMarkers = markers.filter(function(aMarker){
              return aMarker.cityName === cityObj.key;
            })
            console.log(cityMarkers, "AVOCADO")
            Object.keys(Diseases).forEach(function(disease){
              if (cityObj[disease] > 0){
                for (var i=0; i<cityObj[disease]; i++){
                  console.log(cityMarkers, "WHAT IS CITY MARKERS")
                  cityMarkers[0].markers.push({type: 'disease', color: disease})
                }
              }
            })
          })
          console.log("wooot4", markers, cityMarkers)
          addMarkersToMap(markers)
        }

        function addMarkersToMap(markersArray){
          markersArray.forEach(function(city){
            var offsetForCity = calcOffset(city.markers.length)
            city.markers.forEach(function(marker, index){
              if(marker.type === 'researchCenter'){
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, researchCenterIcon)
              }
              else if (marker.type === 'role'){
                console.log(city, city.key, marker, "more pizza")
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Roles[marker.name].icon)
              }
              // THIS IS WHERE THE PROBLEM MIGHT BE... it's something with .location is not a property of undefined
              else {
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Diseases[marker.color].icon)
              }

            })
          })
        }

        function placeOnMap(marker, offset, location, icon){
          console.log(marker, "not pizza")
          console.log(location[0], location[1], offset[0], offset[1], "pizza")
          L.marker([location[0]+offset[0], location[1]+offset[1]], {
                icon: L.icon({
                    iconUrl: icon,
                    'iconSize': [30, 30],
                  })
                }).addTo(map);
        }

        function calcOffset(num, zoom){
          var result=[];
          var radius=5;
          for (var i=0; i<num; i++){
            var lat=radius * Math.sin(Math.PI/num * i)
            var lon=radius * Math.cos(Math.PI/num * i)
            result.push([lat, lon])
          }
          return result;
        }



      }
    }

})

        // })

//////////// link ends below
      // }
//   }
// })









// var roleIcons = {
        //   researcher: 'http://i.imgur.com/VJJfVf2.png',
        //   scientist: 'http://i.imgur.com/WulkLDY.png',
        //   medic: 'http://i.imgur.com/4Qdsdzd.png',
        //   operationsExpert: 'http://i.imgur.com/LkRLXAQ.png'
        // }




 // payload.researchCenterLocations.forEach(function(cityKey){
        //   L.marker(Cities[cityKey].location, {
        //     icon: L.icon({
        //       iconUrl: 'http://i.imgur.com/K9xek5X.png',
        //       'iconSize': [30, 30],
        //     })
        //   }).addTo(map);
        // })

// for (var i=0; i<payload.gamers.length; i++){
        //   L.marker(Cities[payload.gamers[i].currentCity].location, {
        //     icon: L.icon({
        //       iconUrl: Roles[payload.gamers[i].role].icon,
        //       'iconSize': [30, 30],
        //     })
        //   }).addTo(map);

        // }

        // payload.cities.forEach(function(cityObj){
        //   Object.keys(Diseases).forEach(function(disease){
        //     if (cityObj[disease] > 0){

        //       // for (var i=0; i<cityObj[disease]; i++){
        //         L.marker(Cities[cityObj.key].location, {
        //           icon: L.icon({
        //               iconUrl: Diseases[disease],
        //               // 'marker-size': 'large',
        //               // 'markerUrl': Roles[payload.gamers[i].role].icon,
        //               'iconSize': [30, 30],
        //               // 'marker-color': '#fa0'
        //             })
        //           }).addTo(map);


              // }
