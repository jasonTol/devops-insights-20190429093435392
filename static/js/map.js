
angular.module('googMap', [])
.factory('createMap', function($scope) {
  var markerArray = [0,0,0,0];
  
  if($scope.map == null){
		$scope.map = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -39.0363124, lng: 177.4120491},
	      zoom: 5
	    });
	}
 
  var updateMarker = function(index, map, city, lat, lon)
  {
    var myLatLng = new google.maps.LatLng(lat, lon);
    
	console.log("Inside the updateMarker() of createMap service --{lat = " + newLat + " lon = " + newLon + "}--");
    	
	var marker = new google.maps.Marker({
   		position: myLatLng,
	    map: map,
	    title: city
  	});
  	
  	markerArray[index-1] = marker;
  	return marker;
  };
  
  var displaySomething = "If it is nobler in mind to suffer the slings and arrows of outragious fortune, or take arms against a sea of troubles";



  return {
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