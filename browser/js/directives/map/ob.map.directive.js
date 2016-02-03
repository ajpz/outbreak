app.directive('map', function(GeoLines, Cities){
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
        var myLayer = L.mapbox.featureLayer().setGeoJSON(geojsonLines).addTo(map);

        var colors = {blue: '#2F3F73', red: '#A8383B', yellow: '#FF9900', black: '#000'}
        for (var key in Cities){
          if (Cities.hasOwnProperty(key)) {
            L.circleMarker(Cities[key].location, {
              'marker-color' : colors[Cities[key].color],
              'color' : colors[Cities[key].color],
              'fill' : true,
              'fillOpacity' : 1,
              'fillColor' : colors[Cities[key].color],
              'opacity' : 1,
              'radius' : 6
              // icon: L.mapbox.marker.icon({
              //   'marker-size': 'large',
              //   'marker-color': colors[Cities[key].color]
              // })
            }).addTo(map)
          }
        }

        // scope.callback(map)

      }
  }
})
