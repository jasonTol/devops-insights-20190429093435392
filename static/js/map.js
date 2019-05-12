
angular.module('googMap', [])
.factory('createMap', function() {
	var map;
  var markerArray = [0,0,0,0];
  
  var initialiseMap = function(mapDOM){
  	if(mapDOM == null){
		mapDOM = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -39.0363124, lng: 177.4120491},
	      zoom: 5
	    });
	    
	    return mapDOM;
	}
  };
  
 
  var updateMarker = function(index, gooMap, city, lat, lon)
  {
    var myLatLng = new google.maps.LatLng(lat, lon);
    
	console.log("Inside the updateMarker() of createMap service --{lat = " + lat + " lon = " + lon + " index = " + index + "}--");
    	
	var marker = new google.maps.Marker({
   		position: myLatLng,
	    map: gooMap,
	    title: city
  	});
  	
	markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
  	markerArray[index-1].push(marker); //Replace old marker at this position
  	return marker;
  };
  
  var displaySomething = "If it is nobler in mind to suffer the slings and arrows of outragious fortune, or take arms against a sea of troubles";



  return {
  	initialiseMap: initialiseMap,
  	updateMarker: updateMarker,
    somteen: displaySomething
  };
});

/*
var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  */
 
 /*
  * Create another service which initiializes the google map on startup?
  * - check if googlemap needs to be initialised
  * - method that takes lat and lon
  * 	- updates array of google markers based on which input box was updated
  */