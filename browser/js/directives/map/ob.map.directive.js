app.directive('map', function(GeoLines, Cities, Roles, Diseases, $rootScope){
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'js/directives/map/ob.map.directive.html',
    link: function(scope, element, attributes){

        //initialize mapbox map
        L.mapbox.accessToken = 'pk.eyJ1Ijoib3BwZXJhdG9yIiwiYSI6ImNpanluaXp1NzIxbm52Ymx6NGx1dWl3MXUifQ.ND7TeWHOVFWg39S7nB-FTQ';

        var map = L.mapbox.map('map', 'opperator.60d841d4', {minZoom: 2, maxZoom: 5}).setView([25.578028, 27.475642], 3);

        map.scrollWheelZoom.disable();

        //initialize variables for maintaining map state
        var payload;
        var iconReferences = [];
        var tallyObj = [];
        var researchCenterIcon = 'http://i.imgur.com/OO0vx2n.png';
        var userZoomed = true;
        var lastPhase = 'actions';

        /*****************************************************************
         * One time map configuration
        ******************************************************************/

        //create llama icon and llama layers
        var llama = L.icon({
          iconUrl: 'http://i.imgur.com/FbMNWIK.png',
          iconSize: [68.4, 74]
        })
        var llamaLayer = L.marker([-10.604774, -73.372619], {icon: llama});

        // bounds of the map to define the edges of view
        var southWest = L.latLng(-57.870914, -146.743145),
            northEast = L.latLng(70.818639, 190.933412),
            bounds = L.latLngBounds(southWest, northEast);
        map.setMaxBounds(bounds)

        // L.marker is a low-level marker constructor in Leaflet.
        // add lines from city to city
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
        var colors = {blue: '#0000FF', red: '#FF0000', yellow: '#FF9900', black: '#000'};
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

        /*****************************************************************
         * Register Map event handlers
        ******************************************************************/

        //when user zooms, remove all icons to avoid resizing delays
        map.on('zoomstart', function() {
          // during infect phase, we force the map to re-center
          // and to zoom. Ignore this listener as the zoom was not
          // initiated by the user, i.e. userZoomed is false
          if(userZoomed) {
            removeMarkerLayers();
          }
        })

        // when the user zoom is finished, redraw all map icons
        map.on('zoomend', function(){
          //again, infect phase will handle redraw itself
          if(userZoomed) {
            tallyMarkersByCity(tallyObj);
            addSquaresToMap();
          }
          userZoomed = true;

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

        /*****************************************************************
         * Listen on stateChange
        ******************************************************************/

        // whenever someone or something moves/changes we remove all markers and then place them again.
        $rootScope.$on('stateChange', function(event, fbData){
          //create local, semi-persistent copy of the gameState
          payload = _.cloneDeep(fbData.gameState);

          if(payload.currentPhase === 'infect' && payload.drawnInfections && payload.drawnInfections.length > 0) {
            //if it's infect phase, and drawnInfections array exists, remove all markers,
            //recenter and zoom, then re-render
            var infectArray = payload.drawnInfections;
            removeMarkerLayers();
            userZoomed = false;
            map.setView(Cities[infectArray[infectArray.length - 1].key].location, 4);
            tallyMarkersByCity(tallyObj);
          } else if (payload.currentPhase === 'actions' && lastPhase !== 'actions') {
            //if it's action phase and is so for the first time, move the map to current
            //gamer's location
            removeMarkerLayers();
            userZoomed = false;
            map.setView(Cities[payload.gamers[payload.gamerTurn].currentCity].location, 4);
            tallyMarkersByCity(tallyObj);
          } else {
            removeMarkerLayers();
            tallyMarkersByCity(tallyObj);
          }
          //update lastPhase
          lastPhase = payload.currentPhase;
        })

        /*****************************************************************
         * Helper Functions
        ******************************************************************/

        function removeMarkerLayers() {
          //remove all icons from map
          iconReferences.forEach(icon => map.removeLayer(icon));
          trackGoSquares.forEach(square => map.removeLayer(square));

          //rest tracking objects to empty arrays
          trackGoSquares = [];
          cities = [];
          tallyObj = [];
          iconReferences = [];
        }

        // Cycle through the gameState to tally
        // and store all markers that need to be added to the map.
        // Need this so we can properly space the icons around the city
        function tallyMarkersByCity(tallyObj){

          //helper function: find the tally object for a given city
          //if it doesn't exist, make it e.g. {cityKey: 'taipei', markers: [{type: 'researchCenter', name: null}]}
          //either way, return reference to the tally object
          let findOrCreateTally = function(cityKey) {
            let tally = tallyObj.find(tally => tally.cityKey === cityKey);
            if(!tally) {
              tally = {cityKey: cityKey, markers: []};
              tallyObj.push(tally);
            };
            return tally;
          };

          //find all research centers and add them to the tally object
          payload.researchCenterLocations.forEach(cityKey => {
            findOrCreateTally(cityKey).markers.push({type: 'researchCenter', name: null});
          });

          //find all gamers and add them to the tally object
          payload.gamers.forEach(gamer => {
            findOrCreateTally(gamer.currentCity).markers.push({type: 'role', name: gamer.role});
          });

          //find all cities and add each city's diseases, by color, to the tally object
          payload.cities.forEach(cityObj => {
            let cityMarkers = findOrCreateTally(cityObj.key).markers;
            Object.keys(Diseases).forEach(color => {
              if(cityObj[color] > 0) {
                for(let i = 0; i < cityObj[color]; i++) {
                  cityMarkers.push({type: 'disease', color: color});
                }
              }
            })
          })
          //add all the markers to the map
          addMarkersToMap(tallyObj)
        }


        function addMarkersToMap(tallyObj){
          //for every tally object
          tallyObj.forEach(tally => {
            //calc a radial offset for the markers based on how many
            //markers are to be drawn around a given city
            let offset = calcOffset(tally.markers.length);
            //create count for the city's primary disease
            //so we can proportionally size the disease 'circle'
            let mainDiseaseCountForCity = 0;
            //place each marker on the map, using the calculated offset
            //and the appropriate iconUrl
            tally.markers.forEach((marker, index) => {
              let iconUrl;
              if(marker.type === 'researchCenter') {
                iconUrl = researchCenterIcon;
              } else if (marker.type === 'role') {
                iconUrl = Roles[marker.name].icon;
              } else if (marker.type === 'disease') {
                iconUrl = Diseases[marker.color]
                if(marker.color === Cities[tally.cityKey].color) mainDiseaseCountForCity++;
              }
              placeOnMap(marker, offset[index], Cities[tally.cityKey].location, iconUrl);
            })

            // if there are diseases on a city, create a circle marker
            // to indicate the prevalence (our heat map)
            if(mainDiseaseCountForCity > 0) {
              placeOnMap({type: 'circle'}, 0, Cities[tally.cityKey].location, null, Cities[tally.cityKey].color, mainDiseaseCountForCity);
            }

          })
        }


        function placeOnMap(marker, offset, location, icon, color, count){
          //creates and then adds a single marker on the map
          var oneMapIcon;
          // defines the display size of the markers at each zoom layer
          var zoomSizeIcon = {
            '5' : [40,40],
            '4' : [30,30],
            '3' : [25,25],
            '2' : [15,15],
            '1' : [15,15]
          };
          // defines the relative size of the circle marker (heat map)
          // based on zoom level
          var zoomRadiusCircle = {
            '5' : 80,
            '4' : 50,
            '3' : 30,
            '2' : 20,
            '1' : 10
          }
          if (['researchCenter', 'role', 'disease'].indexOf(marker.type) > -1) {
            oneMapIcon = L.marker([location[0]+offset[0], location[1]+offset[1]], {
              icon: L.icon({
                iconUrl: icon,
                'iconSize': zoomSizeIcon[map.getZoom().toString()] || [25,25] ,
              })
            })
          }
          else {
            //this to add a circle marker (heat map) to the map representing
            //the amount of primary disease on that city
            var mult;

            if(count === 3) mult = 1.6;
            else if (count === 2) mult = 1.0;
            else if (count === 1) mult = 0.8;

            oneMapIcon = new L.circleMarker(location ,{
              radius : zoomRadiusCircle[map.getZoom().toString()] * mult || 30,
              fillColor : colors[color],
              fill : true,
              fillOpacity : 0.6,
              opacity : 6,
              className : 'golocation-circle golocation',
              stroke : false,
              color : colors[color],
              weight : 0
            })

          }

          //Save reference to icon before adding it to the map
          iconReferences.push(oneMapIcon);
          map.addLayer(oneMapIcon);

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

        var trackGoSquares = [];
        var cities = [];
        var localPayload = {};

        function addSquaresToMap(payload) {
          if (payload) localPayload = payload;
          if (Object.keys(localPayload).length === 0) return;

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

          if(payload.zoomCity) {
            userZoomed = false;
            map.setView(Cities[payload.zoomCity].location, 4)
          }

          trackGoSquares.forEach(function(square){
            map.removeLayer(square);
          });
          trackGoSquares = [];
          cities = [];
          localPayload = {};

        });


      }
      //////////// THIS IS THE END OF THE LINK /////////////////////
    }

})

