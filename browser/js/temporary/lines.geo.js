app.constant('GeoLines',
  { lines :
      [{
        "type": "FeatureCollection",
        "features":[
        // SAN FRANCISCO TO TOKYO
        {
        "type": "Feature",
        "properties": {
            "id": 94
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-122.419416, 41.7558],
                [-233.9, 45.123866]
            ],
        }
    },
    {
        "type": "Feature",
        "properties": {
            "id": 95
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [141.795275, 41.609692],
                [278.486334, 38.896082]
            ]
        }
    },
    // SAN FRANCISCO TO MANILA
        {
        "type": "Feature",
        "properties": {
            "id": 96
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-233.9, 29.578158],
                [-122.419416, 41.7558]
            ]
        }
    },
        {
        "type": "Feature",
        "properties": {
            "id": 97
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [278.008251, 49.271947],
                [132.825546, 0.279132]
            ]
        }
    },
      // LOS ANGELES TO SYDNEY AND BACK
    {
        "type": "Feature",
        "properties": {
            "id": 98
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-118.4859, 23.359891],
                [-233.9, -30.389530]

            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "id": 99
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [151.20699, -33.867487],
                [277.777128, 50.307669]

            ]
        },
        "style": {
              "fill": "red",
              "stroke-width": "3",
              "fill-opacity": 0.6
             }
    },
        {
        "type": "Feature",
        "properties": {
            "id": 3
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-118.4859, 23.359891],
                [-122.419416, 41.7558]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 4
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-93.0936, 44.9942],
                [-122.419416, 41.7558]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 5
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-93.0936, 44.9942],
                [-118.4859, 23.359891]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 6
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-93.0936, 44.9942],
                [-97.649483, 18.205068]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 7
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-84.387982, 33.748995],
                [-93.0936, 44.9942]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 8
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-93.0936, 44.9942],
                [-79.116811, 46.566239]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 9
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-84.387982, 33.748995],
                [-64.012666, 32.407446]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 10
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-84.387982, 33.748995],
                [-77.402244, 25.003754]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 11
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-64.012666, 32.407446],
                [-79.116811, 46.566239]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 12
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-79.116811, 46.566239],
                [-64.012666, 44.367342]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 13
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-64.012666, 32.407446],
                [-64.012666, 44.367342]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 14
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-15.502873, 54.683934],
                [-64.012666, 44.367342]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 15
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-14.33551, 38.820437],
                [-64.012666, 44.367342]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 16
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-64.012666, 32.407446],
                [-77.402244, 25.003754]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 17
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-15.502873, 54.683934],
                [-14.33551, 38.820437]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 18
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-15.502873, 54.683934],
                [2.352222, 48.856614]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 19
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [13.404954, 52.520007],
                [-15.502873, 54.683934]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 20
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-14.33551, 38.820437],
                [-46.633309, -23.55052]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 21
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [3.657282, 30.463737],
                [-14.33551, 38.820437]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 22
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-14.33551, 38.820437],
                [2.352222, 48.856614]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 23
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [14.995174, 40.926716],
                [2.352222, 48.856614]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 24
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [13.404954, 52.520007],
                [2.352222, 48.856614]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 25
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [3.657282, 30.463737],
                [2.352222, 48.856614]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 26
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [13.404954, 52.520007],
                [14.995174, 40.926716]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 27
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [13.404954, 52.520007],
                [30.335099, 59.93428]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 28
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [28.978359, 41.008238],
                [14.995174, 40.926716]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 29
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.614313, 55.038036],
                [30.335099, 59.93428]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 30
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [28.978359, 41.008238],
                [30.335099, 59.93428]
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "id": 32
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-118.4859, 23.359891],
                [-97.649483, 18.205068]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 33
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-97.649483, 18.205068],
                [-77.402244, 25.003754]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 34
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.072092, 4.710989],
                [-97.649483, 18.205068]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 35
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-87.372619, -17.604774],
                [-97.649483, 18.205068]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 36
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.072092, 4.710989],
                [-77.402244, 25.003754]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 37
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.072092, 4.710989],
                [-87.372619, -17.604774]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 38
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.072092, 4.710989],
                [-58.381559, -34.603684]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 39
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-74.072092, 4.710989],
                [-46.633309, -23.55052]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 40
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-87.372619, -17.604774],
                [-81.9234, -37.337422]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 41
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [-58.381559, -34.603684],
                [-46.633309, -23.55052]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 42
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [3.379206, 6.524379],
                [-46.633309, -23.55052]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 43
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [15.266293, -4.441931],
                [3.379206, 6.524379]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 44
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [32.559899, 15.500654],
                [3.379206, 6.524379]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 45
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [28.047305, -26.204103],
                [15.266293, -4.441931]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 46
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [32.559899, 15.500654],
                [15.266293, -4.441931]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 47
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [27.475642, 25.578028],
                [32.559899, 15.500654]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 48
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [28.047305, -26.204103],
                [32.559899, 15.500654]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 49
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [3.657282, 30.463737],
                [28.978359, 41.008238]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 50
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [3.657282, 30.463737],
                [27.475642, 25.578028]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 51
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [27.475642, 25.578028],
                [28.978359, 41.008238]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 52
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.361488, 33.312806],
                [27.475642, 25.578028]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 53
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [27.475642, 25.578028],
                [44.438532, 17.828092]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 54
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.361488, 33.312806],
                [28.978359, 41.008238]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 55
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [28.978359, 41.008238],
                [44.614313, 55.038036]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 56
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.614313, 55.038036],
                [57.446344, 42.176354]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 57
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.361488, 33.312806],
                [57.446344, 42.176354]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 58
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.361488, 33.312806],
                [67.009939, 24.861462]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 59
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [44.361488, 33.312806],
                [44.438532, 17.828092]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 60
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [67.009939, 24.861462],
                [44.438532, 17.828092]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 61
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [67.009939, 24.861462],
                [57.446344, 42.176354]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 62
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [77.382217, 32.547392],
                [57.446344, 42.176354]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 63
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [77.382217, 32.547392],
                [67.009939, 24.861462]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 64
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [67.009939, 24.861462],
                [67.202204, 13.342488]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 65
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [77.382217, 32.547392],
                [67.202204, 13.342488]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 66
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [82.567764, 5.616669],
                [67.202204, 13.342488]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 67
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [77.382217, 32.547392],
                [90.653701, 31.203992]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 68
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [82.567764, 5.616669],
                [77.382217, 32.547392]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 69
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [114.109497, 22.396428],
                [90.653701, 31.203992]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 70
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [100.501765, 13.756331],
                [90.653701, 31.203992]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 71
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [82.567764, 5.616669],
                [90.653701, 31.203992]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 72
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [100.501765, 13.756331],
                [82.567764, 5.616669]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 73
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [82.567764, 5.616669],
                [99.966141, -9.271532]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 74
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [109.557534, 44.083459],
                [127.408184, 45.283126]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 75
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [109.557534, 44.083459],
                [111.244909, 34.924432]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 76
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [127.408184, 45.283126],
                [141.795275, 41.609692]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 77
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [127.408184, 45.283126],
                [111.244909, 34.924432]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 78
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [141.972893, 27.961229],
                [141.795275, 41.609692]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 79
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [111.244909, 34.924432],
                [141.795275, 41.609692]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 80
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [111.244909, 34.924432],
                [127.319375, 22.747271]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 81
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [114.109497, 22.396428],
                [111.244909, 34.924432]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 82
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [114.109497, 22.396428],
                [127.319375, 22.747271]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 83
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [100.501765, 13.756331],
                [114.109497, 22.396428]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 84
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [110.356818, 0.279132],
                [114.109497, 22.396428]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 85
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [114.109497, 22.396428],
                [132.825546, 0.279132]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 86
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [141.972893, 27.961229],
                [127.319375, 22.747271]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 87
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [132.825546, 0.279132],
                [127.319375, 22.747271]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 88
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [100.501765, 13.756331],
                [110.356818, 0.279132]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 89
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [100.501765, 13.756331],
                [99.966141, -9.271532]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 90
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [110.356818, 0.279132],
                [99.966141, -9.271532]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 91
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [99.966141, -9.271532],
                [151.20699, -33.867487]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 92
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [110.356818, 0.279132],
                [132.825546, 0.279132]
            ]
        }
    }, {
        "type": "Feature",
        "properties": {
            "id": 93
        },
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [132.825546, 0.279132],
                [151.20699, -33.867487]
            ]
        }
    }
  ]
}

]

});
