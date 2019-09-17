window.onload = init;

//initialize variables
var latitude, longitude;
var counter = 0; //counter starts at zero
var lastMarker = null;
var path = []; //create an empty array to store the path in
var map = null;

function init(){
	var startButton = document.getElementById("startButton"); //grab by id in html
	startButton.disabled = false; //begin enabled

	startButton.onclick = function(){
		this.disabled = true; //on click become disabled
		getLocation(); //call get location function
	}
}

//get the location
function getLocation(){

	var options = {
		enableHighAccuracy: true,
		timeout : 50000,
		maximumAge : 0
	};

	navigator.geolocation.getCurrentPosition(displayLocation, errorHandler, options);
}

//display the location
function displayLocation(position){
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	var timestamp = position.timestamp;

	document.getElementById("startLatitude").innerHTML = latitude.toFixed(7); //grab by id in html
	document.getElementById("startLongitude").innerHTML = longitude.toFixed(7); //grab by id in html
	document.getElementById("timestamp").innerHTML = timestamp; //gran by id in html

	setInterval(updateMyLocation, 5000);

	showOnMap(position.coords);
}

//create a switch case for errors
function errorHandler(error){
	switch(error.code){
		case 1:
			updateStatus("Uhoh user denied position!)");
			break;
		case 2:
			updateStatus("Hmmm, I dont know where you are.");
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

	counter++; //increment the counter

	document.getElementById("counter").innerHTML = counter;
	newPath();

	document.getElementById("currentLatitude").innerHTML = latitude.toFixed(7);
	document.getElementById("currentLongitude").innerHTML = longitude.toFixed(7);


}

//show pisition on maps
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

//create a new path
function newPath()
{
   path = [];

  // find the first point
    var latlong = new google.maps.LatLng(latitude, longitude);
path.push(latlong);

    latitude += Math.random() / 100;
    longitude -= Math.random() / 100;

  // find the next point
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

//draw line of path
    var line = new google.maps.Polyline({
        path : path,
        strokeColor : '#F47D31',
        strokeOpacity : 1.0,
        strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
        lastMarker.setMap(null);
    // add the new marker
    lastMarker = addMarker(map, latlong);
}
