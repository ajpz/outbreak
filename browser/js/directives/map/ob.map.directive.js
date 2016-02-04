app.directive('map', function(GeoLines, Cities, Roles, Diseases){
  return {
    restrict: 'EA',
    scope: {
      // callback: '='
    },
    templateUrl: 'js/directives/map/ob.map.directive.html',
      link: function(scope, element, attributes){
        console.log(GeoLines.lines);
        L.mapbox.accessToken = 'pk.eyJ1Ijoib3BwZXJhdG9yIiwiYSI6ImNpanluaXp1NzIxbm52Ymx6NGx1dWl3MXUifQ.ND7TeWHOVFWg39S7nB-FTQ';
        var map = L.mapbox.map('map', 'opperator.60d841d4')
        .setView([40.416775, -3.703790], 3);

        // L.marker is a low-level marker constructor in Leaflet.
        var geojsonLines = GeoLines.lines[0].features;
        var myStyle = {'strokeColor': 'red'};
        var myLayer = L.mapbox.featureLayer().setGeoJSON(geojsonLines, {style: myStyle}).addTo(map);

        var colors = {blue: '#2F3F73', red: '#A8383B', yellow: '#FF9900', black: '#000'}
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

        var roleIcons = {
          researcher: 'http://i.imgur.com/VJJfVf2.png',
          scientist: 'http://i.imgur.com/WulkLDY.png',
          medic: 'http://i.imgur.com/4Qdsdzd.png',
          operationsExpert: 'http://i.imgur.com/LkRLXAQ.png'
        }

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
          researchCenterLocations: ['atlanta', 'mexicoCity', 'miami'],
          cities: [
            {
              key: 'sanFrancisco',
              red: 0,
              black: 0,
              blue: 1,
              yellow: 2
            }
          ]
        }

        for (var i=0; i<payload.gamers.length; i++){
          L.marker(Cities[payload.gamers[i].currentCity].location, {
            icon: L.icon({
              iconUrl: Roles[payload.gamers[i].role].icon,
              // 'marker-size': 'large',
              // 'markerUrl': Roles[payload.gamers[i].role].icon,
              'iconSize': [30, 30],
              // 'marker-color': '#fa0'
            })
          }).addTo(map);

        }

        var researchCenterIcon = 'http://i.imgur.com/K9xek5X.png';

        payload.researchCenterLocations.forEach(function(cityKey){
          L.marker(Cities[cityKey].location, {
            icon: L.icon({
              iconUrl: 'http://i.imgur.com/K9xek5X.png',
              // 'marker-size': 'large',
              // 'markerUrl': Roles[payload.gamers[i].role].icon,
              'iconSize': [30, 30],
              // 'marker-color': '#fa0'
            })
          }).addTo(map);
        })

        payload.cities.forEach(function(cityObj){
          Object.keys(Diseases).forEach(function(disease){
            if (cityObj[disease] > 0){
              L.marker(Cities[cityObj.key].location, {
                icon: L.icon({
                  iconUrl: Diseases[disease],
                  // 'marker-size': 'large',
                  // 'markerUrl': Roles[payload.gamers[i].role].icon,
                  'iconSize': [30, 30],
                  // 'marker-color': '#fa0'
                })
              }).addTo(map);

            }

          })

        })
















//////////// link ends below
      }
  }
})
