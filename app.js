var map
var markers = []

function initMap() {

  fetch('data.json').then(function(response) {
    return response.json()
  }).then(function(data) {
    return data
  }).then(getCoordinates);
}

function formatData(data) {
  var dataSamples = data.samples
  return dataSamples.filter((item) => {
    if (item.values.positionLat !== undefined || item.values.positionLong !== undefined) {
      return item
    }
  })
}

function getCoordinates(data) {
  var gpsFilter = formatData(data)

  var positionCoords = gpsFilter.map((item) => {
    return {lat: item.values.positionLat, lng: item.values.positionLong}
  })

  var startingPoint = positionCoords[positionCoords.length / 2]

  map = new google.maps.Map(document.getElementById('map'), {
    center: startingPoint,
    mapTypeId: 'terrain',
    zoom: 12
  });

  var workoutMap = new google.maps.Polyline({path: positionCoords, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2});

  workoutMap.setMap(map);

}

function findLatLng(data, index) {

  var getDataFiltered = formatData(data)

  var markerPosition = {
    lat: getDataFiltered[index].values.positionLat,
    lng: getDataFiltered[index].values.positionLong
  }

  addMarker(markerPosition)
}

function addMarker(position) {

  clearMarkers()

  var marker = new google.maps.Marker({position: position, map: map, title: 'stamp'});
  markers.push(marker)

  if (markers.length >= 2) {
    markers[0].setMap(null);
  }
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
