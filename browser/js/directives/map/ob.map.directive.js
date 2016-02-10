app.directive('map', function(GeoLines, Cities, Roles, Diseases, $rootScope){
  return {
    restrict: 'EA',
    scope: {
      // callback: '='
    },
    templateUrl: 'js/directives/map/ob.map.directive.html',
    link: function(scope, element, attributes){
        L.mapbox.accessToken = 'pk.eyJ1Ijoib3BwZXJhdG9yIiwiYSI6ImNpanluaXp1NzIxbm52Ymx6NGx1dWl3MXUifQ.ND7TeWHOVFWg39S7nB-FTQ';
        var map = L.mapbox.map('map', 'opperator.60d841d4', {minZoom: 2, maxZoom: 5}).setView([25.578028, 27.475642], 3);
        map.scrollWheelZoom.disable();

        // addMarkerToMarkerObj();
        var payload;
        var rolesLayerGroup = [];
        var researchLayerGroup = [];
        var diseaseLayerGroup = [];
        var circleDiseaseLayerGroup = [];
        var researchCenterIcon = 'http://i.imgur.com/OO0vx2n.png';
        var markers = [];
        var llama = L.icon({
          iconUrl: 'http://i.imgur.com/FbMNWIK.png',
          iconSize: [68.4, 74]
        })
        var llamaLayer = L.marker([-10.604774, -73.372619], {icon: llama});



        map.on('zoomstart', function() {
          removeMarkerLayers();
        })

        map.on('zoomend', function(){
          addMarkerToMarkerObj();
          addSquaresToMap();

          // this is for showing and hiding the llama
          if (map.getZoom() > 4){
            map.addLayer(llamaLayer);
          }
          else {
           map.removeLayer(llamaLayer);
          }
        })

        // center the map on any point that you click on
        map.on('click', function(e) {
          map.panTo(e.latlng);
        });

        // bounds of the map to define the edges of view
        var southWest = L.latLng(-57.870914, -146.743145),
            northEast = L.latLng(70.818639, 190.933412),
            bounds = L.latLngBounds(southWest, northEast);
        map.setMaxBounds(bounds)

        // L.marker is a low-level marker constructor in Leaflet.
        var geojsonLines = GeoLines.lines[0].features;
        var myStyle = {'strokeColor': 'red'};
        var myLayer = L.mapbox.featureLayer().setGeoJSON(geojsonLines, {style: myStyle}).addTo(map);

        // Labels for the connection lines that point outside of the map
        L.marker([36.7558, -144.019416], {
              icon: L.divIcon({
                className: 'label',
                html: '<-- Toyko',
                iconSize: [100, 40]
            })
            }).addTo(map);

        L.marker([30.7558, -144.019416], {
              icon: L.divIcon({
                className: 'label',
                html: '<-- Manila',
                iconSize: [100, 40]
            })
            }).addTo(map);

        L.marker([15.7558, -144.019416], {
              icon: L.divIcon({
                className: 'label',
                html: '<-- Sydney',
                iconSize: [100, 40]
            })
            }).addTo(map);

        L.marker([37.609692, 143.795275], {
              icon: L.divIcon({
                className: 'label',
                html: 'San Francisco -->',
                iconSize: [100, 40]
            })
            }).addTo(map);

        L.marker([-4.409692, 134.825546], {
              icon: L.divIcon({
                className: 'label',
                'color': 'red',
                html: 'San Francisco -->',
                iconSize: [100, 40]
            })
            }).addTo(map);

        L.marker([-37.867487, 153.20699], {
              icon: L.divIcon({
                className: 'label',
                html: 'Los Angeles -->',
                iconSize: [100, 40]
            })
            }).addTo(map);

        // these are the city markers
        var colors = {blue: '#0000FF', red: '#A8383B', yellow: '#FF9900', black: '#000'};
        for (var key in Cities){
          if (Cities.hasOwnProperty(key)) {
            var cityMarker = L.circleMarker(Cities[key].location, {
              'className' : 'testING',
              'marker-color' : colors[Cities[key].color],
              'color' : colors[Cities[key].color],
              'fill' : true,
              'fillOpacity' : 1,
              'fillColor' : colors[Cities[key].color],
              'opacity' : 1,
              'radius' : 6
            })
          cityMarker.addTo(map);
          }
        }
        // these are the text labels for the cities
        for (var key in Cities){
          if (Cities.hasOwnProperty(key)) {
            L.marker(Cities[key].location, {
              icon: L.divIcon({
                className: 'label',
                html: Cities[key].name,
                iconSize: [100, 40]
            })
            }).addTo(map);
          }
        }

        // whenever someone or something moves/changes we remove all markers and then place them again.
        $rootScope.$on('stateChange', function(event, fbData){
          payload = _.cloneDeep(fbData.gameState);
          removeMarkerLayers();
          addMarkerToMarkerObj();
          // debugger;
        })

        function removeMarkerLayers() {
          rolesLayerGroup.forEach(function(role) {
            map.removeLayer(role);
          });

          researchLayerGroup.forEach(function(researchCenter) {
            map.removeLayer(researchCenter);
          });

          diseaseLayerGroup.forEach(function(disease) {
            map.removeLayer(disease);
          });

          circleDiseaseLayerGroup.forEach(function(circle) {
            map.removeLayer(circle);
          });

          trackGoSquares.forEach(function(square) {
            map.removeLayer(square);
          });

          rolesLayerGroup = [];
          researchLayerGroup = [];
          diseaseLayerGroup = [];
          circleDiseaseLayerGroup = [];
          trackGoSquares = [];
          markers = [];
        }

        // this is for counting markers to be added to cities
        function addMarkerToMarkerObj(){

          payload.researchCenterLocations.forEach(function(cityKey){
            var cityMarkers = markers.filter(function(aMarker){
              return aMarker.key === cityKey;
            })
            if (cityMarkers.length > 0){
              cityMarkers[0].markers.push({type: 'researchCenter', name: null});
            }
            else {
              markers.push({key: cityKey, markers: [{type: 'researchCenter', name: null}]});
            }
          })

          payload.gamers.forEach(function(gamer){
            var cityMarkers = markers.filter(function(aMarker){
              return aMarker.key === gamer.currentCity;
            })
            if (cityMarkers.length > 0){
              cityMarkers[0].markers.push({type: 'role', name: gamer.role});
            }
            else {
              markers.push({key: gamer.currentCity, markers: [{type: 'role', name: gamer.role}]});
            }
          })

          var cityMarkers;
          payload.cities.forEach(function(cityObj){
            cityMarkers = markers.filter(function(aMarker){
              return aMarker.key === cityObj.key;
            })
            if (cityMarkers.length === 0){
              markers.push({key: cityObj.key, markers: []})
            }
            cityMarkers = markers.filter(function(aMarker){
              return aMarker.key === cityObj.key;
            })

            Object.keys(Diseases).forEach(function(disease){
              if (cityObj[disease] > 0){
                for (var i=0; i<cityObj[disease]; i++){
                  cityMarkers[0].markers.push({type: 'disease', color: disease})
                }
              }
            })
          })

          addMarkersToMap(markers)
        }


        function addMarkersToMap(markersArray){
          markersArray.forEach(function(city){
            var offsetForCity = calcOffset(city.markers.length)
            var mainDiseaseCountForCity = 0;
            city.markers.forEach(function(marker, index){
              if(marker.type === 'researchCenter'){
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, researchCenterIcon)
              }
              else if (marker.type === 'role'){
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Roles[marker.name].icon)
              }
              else {
                if (marker.color === Cities[city.key].color){
                  mainDiseaseCountForCity ++;
                }
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Diseases[marker.color])
              }

            })

            // figure out city's color, count that disease color for that city, make marker and place on map
            if (mainDiseaseCountForCity > 0){
              placeOnMap({type: 'circle'}, 0, Cities[city.key].location, null, Cities[city.key].color, mainDiseaseCountForCity)
            }


          })
        }


        function placeOnMap(marker, offset, location, icon, color, count){
          // defines the display size of the markers at each zoom layer
          var zoomSizeIcon = {
            '5' : [40,40],
            '4' : [30,30],
            '3' : [25,25],
            '2' : [15,15],
            '1' : [15,15]
          };

          var zoomRadiusCircle = {
            '5' : 80,
            '4' : 50,
            '3' : 30,
            '2' : 20,
            '1' : 10
          }
          if (['researchCenter', 'role', 'disease'].indexOf(marker.type) > -1) {
             var oneMapIcon = L.marker([location[0]+offset[0], location[1]+offset[1]], {
                icon: L.icon({
                    iconUrl: icon,
                    'iconSize': zoomSizeIcon[map.getZoom().toString()] || [25,25] ,
                  })
                })
          }
          else {
            var circle = new L.circleMarker(location ,{
              radius : zoomRadiusCircle[map.getZoom().toString()] || 30,
              fillColor : colors[color],
              fill : true,
              fillOpacity : 0.5,
              opacity : 6,
              className : 'golocation-circle golocation',
              stroke : false,
              color : colors[color],
              weight : 0
            })

          }

          if (marker.type === 'researchCenter'){
            researchLayerGroup.push(oneMapIcon);
            map.addLayer(oneMapIcon);
          }
          else if (marker.type === 'role'){
            rolesLayerGroup.push(oneMapIcon);
            map.addLayer(oneMapIcon);
          }
          else if (marker.type === 'disease'){
            diseaseLayerGroup.push(oneMapIcon);
            map.addLayer(oneMapIcon);
          }
          else {
            circleDiseaseLayerGroup.push(circle);
             map.addLayer(circle);
          }

          // map.addLayer(oneMapIcon);
// var colors = {blue: '#0000FF', red: '#A8383B', yellow: '#FF9900', black: '#000'};
          // this is adding the circles for infected cities to the map


        }


        function calcOffset(num, zoom){
          var result=[];
          var radius=2;
          for (var i=0; i<num; i++){
            var lat=radius * Math.sin(2 * Math.PI/num * i)
            var lon=radius * Math.cos(2 * Math.PI/num * i)
            result.push([lat, lon])
          }
          return result;
        }

        let trackGoSquares = [];
        let cities = [];
        let localPayload;

        function addSquaresToMap(payload) {
          if (payload) localPayload = payload;
          cities = [];
          var zoomSizeSquare = {
            '5' : [160,160],
            '4' : [100,100],
            '3' : [60,60],
            '2' : [40,40],
            '1' : [20,20]
          };
          cities = localPayload.nouns;  // an array of all the keys
          cities.forEach(function(city){
            var goToHereIcon = L.icon({
              iconUrl: 'http://i.imgur.com/PER3qLD.png',
              iconSize: zoomSizeSquare[map.getZoom().toString()]
            })

            var square= new L.marker(Cities[city]["location"] ,{
              icon: goToHereIcon
              // radius : 30,
              // fillColor : '#A7383D',
              // fill : false,
              // fillOpacity : 6,
              // opacity : 6,
              // stroke : false,
              // color : '#A7383D',
              // className : 'golocation-circle golocation',
              // weight : 0
            }).addTo(map)

            trackGoSquares.push(square);
            /////////////


            //setInterval(function(){
            //  // the set interval is causing the toggle class;
            //  // if I just remove the circle, then the set interval
            //  // should not be a problem
            //  $(".golocation-circle").toggleClass('golocation');
            //}, 700);
          });
        };

        $rootScope.$on("SquareMarkersOnMap", function(event, payload){
          addSquaresToMap(payload);
        });

        $rootScope.$on("RemoveSquareMarkers", function(event, payload){
          map.setView(Cities[payload.zoomCity].location, 4)

          trackGoSquares.forEach(function(square){
            map.removeLayer(square);

            console.log(trackGoSquares);
          });
          trackGoSquares = [];

        });


      }
      //////////// THIS IS THE END OF THE LINK /////////////////////
    }

})

// $rootScope.$on("CircleMarkersOnMap", function(event, payload){
//           cities = payload.nouns;  // an array of all the keys
//           cities.forEach(function(city){
// // var llamaLayer = L.marker([-10.604774, -73.372619], {icon: llama});

//             var circle = new L.marker(Cities[city]["location"] ,{
//               radius : 30,
//               fillColor : '#A7383D',
//               fill : false,
//               fillOpacity : 6,
//               opacity : 6,
//               stroke : false,
//               color : '#A7383D',
//               className : 'golocation-circle golocation',
//               weight : 0
//             }).addTo(map)

//             trackGoCircles.push(circle);
//             /////////////


//             //setInterval(function(){
//             //  // the set interval is causing the toggle class;
//             //  // if I just remove the circle, then the set interval
//             //  // should not be a problem
//             //  $(".golocation-circle").toggleClass('golocation');
//             //}, 700);
//           });
//         });

