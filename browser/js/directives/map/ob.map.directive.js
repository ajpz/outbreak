app.directive('map', function(GeoLines, Cities, Roles, Diseases, $rootScope){
  return {
    restrict: 'EA',
    scope: {
      // callback: '='
    },
    templateUrl: 'js/directives/map/ob.map.directive.html',
    link: function(scope, element, attributes){
        L.mapbox.accessToken = 'pk.eyJ1Ijoib3BwZXJhdG9yIiwiYSI6ImNpanluaXp1NzIxbm52Ymx6NGx1dWl3MXUifQ.ND7TeWHOVFWg39S7nB-FTQ';
        var map = L.mapbox.map('map', 'opperator.60d841d4').setView([25.578028, 27.475642], 3);

        // addMarkerToMarkerObj();
        var payload;
        var rolesLayerGroup = [];
        var researchLayerGroup = [];
        var diseaseLayerGroup = [];
        var researchCenterIcon = 'http://i.imgur.com/OO0vx2n.png';
        var markers = [];



        map.on('zoomend', function(){
          console.log('zoomend was heard ', map.getZoom())
          if (map.getZoom() < 3) {
            // myLayer.setFilter(function(){ return true; })
          }
          else {
            // myLayer.setFilter(function(){ return false; })
          }
        })
        var southWest = L.latLng(-57.870914, -146.743145),
            northEast = L.latLng(70.818639, 190.933412),
            bounds = L.latLngBounds(southWest, northEast);

        map.setMaxBounds(bounds)

        // L.marker is a low-level marker constructor in Leaflet.
        var geojsonLines = GeoLines.lines[0].features;
        var myStyle = {'strokeColor': 'red'};
        var myLayer = L.mapbox.featureLayer().setGeoJSON(geojsonLines, {style: myStyle}).addTo(map);

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


        var colors = {blue: '#0000FF', red: '#A8383B', yellow: '#FF9900', black: '#000'};
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
        /////////// static ends above

        // var payload = {
        //   gamers: [
        //     {
        //       role: 'medic',
        //       currentCity: 'newYork'
        //     },
        //     {
        //       role: 'scientist',
        //       currentCity: 'montreal'
        //     },
        //     {
        //       role: 'researcher',
        //       currentCity: 'madrid'
        //     },
        //     {
        //       role: 'operationsExpert',
        //       currentCity: 'mumbai'
        //     }
        //   ],
        //   researchCenterLocations: ['atlanta', 'mexicoCity', 'newYork'],
        //   cities: [
        //     {
        //       key: 'newYork',
        //       red: 0,
        //       black: 0,
        //       blue: 3,
        //       yellow: 1
        //     }
        //   ],

        // }






      $rootScope.$on('stateChange', function(event, fbData){
        payload = _.cloneDeep(fbData.gameState);
        addMarkerToMarkerObj();
      })

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
            city.markers.forEach(function(marker, index){
              if(marker.type === 'researchCenter'){
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, researchCenterIcon)
              }
              else if (marker.type === 'role'){
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Roles[marker.name].icon)
              }
              else {
                placeOnMap(marker, offsetForCity[index], Cities[city.key].location, Diseases[marker.color])
              }

            })
          })
          console.log(rolesLayerGroup, researchLayerGroup, diseaseLayerGroup, "here are the groups")
        }


        function placeOnMap(marker, offset, location, icon){
          var oneMapIcon = L.marker([location[0]+offset[0], location[1]+offset[1]], {
                icon: L.icon({
                    iconUrl: icon,
                    'iconSize': [30, 30],
                  })
                })
          if (marker.type === 'researchCenter'){
            researchLayerGroup.push(oneMapIcon);
          }
          else if (marker.type === 'role'){
            rolesLayerGroup.push(oneMapIcon);
          }
          else {
            diseaseLayerGroup.push(oneMapIcon)
          }
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



      }
    }

})


