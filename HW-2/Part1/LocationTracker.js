window.onload = init;

var latitude, longitude;
var counter = 0;
var lastMarker = null;
var path = [];
var map = null;

function init(){
	var startButton = document.getElementById("startButton");
	startButton.disabled = false;

	startButton.onclick = function(){
		this.disabled = true;
		getLocation();
	}
}

function getLocation(){

	var options = {
		enableHighAccuracy: true,
		timeout : 50000,
		maximumAge : 0
	};

	navigator.geolocation.getCurrentPosition(displayLocation, errorHandler, options);
}

function displayLocation(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	var timestamp = position.timestamp;

	document.getElementById("startLat").innerHTML = latitude.toFixed(7);
	document.getElementById("startLon").innerHTML = longitude.toFixed(7);
	document.getElementById("timestamp").innerHTML = timestamp;

	setInterval(updateMyLocation, 5000);

	showOnMap(position.coords);
}

function errorHandler(error){
	switch(error.code){
		case 1:
			updateStatus("The user denied permission. (You're probably using Chome. Try switching to Mozilla and trying again!)");
			break;
		case 2:
			updateStatus("Position not found.");
			break;
		case 3:
			updateStatus("Timed out.");
			break;
	}
}

function updateStatus(message){
	document.getElementById("status").innerHTML = "<strong>Error</strong>: " + message;
}

function updateMyLocation(){

	counter++;

	document.getElementById("counter").innerHTML = counter;
	newPath();

	document.getElementById("currentLat").innerHTML = latitude.toFixed(7);
	document.getElementById("currentLon").innerHTML = longitude.toFixed(7);


}

function showOnMap(pos) {

	var googlePosition = new google.maps.LatLng(pos.latitude, pos.longitude);

	var mapOptions = {
		zoom: 15,
		center: googlePosition,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var mapElement = document.getElementById("map");
	map = new google.maps.Map(mapElement, mapOptions);

	var title = "Location Details";
	var content = "Lat: " + pos.latitude + ", Long: " + pos.longitude;

	addMarker(map, googlePosition, title, content);
}

function addMarker(map, latlongPosition, title, content) {
	var options = {
		position: latlongPosition,
		map: map,
		title: title,
		clickable: true
	};

	var marker = new google.maps.Marker(options);

	var popupWindowOptions = {
		content: content,
		position: latlongPosition
	};

	var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

	google.maps.event.addListener(marker, 'click', function(){
		popupWindow.open(map);
	});

	return marker;
}

function newPath()
{
   path = [];

  // first point
    var latlong = new google.maps.LatLng(latitude, longitude);
path.push(latlong);

    latitude += Math.random() / 100;
    longitude -= Math.random() / 100;

  // next point
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);


    var line = new google.maps.Polyline({
        path : path,
        strokeColor : '#0000ff',
        strokeOpacity : 1.0,
        strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
        lastMarker.setMap(null);
    // add the new marker
    lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
}
