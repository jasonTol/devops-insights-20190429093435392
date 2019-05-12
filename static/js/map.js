
angular.module('googMap', [])
.factory('createMap', function() {
	var map;
  var markerArray = [];
  
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
  	
  	console.log("type of variable in the array = " + typeof markerArray[index-1]);
  	if(markerArray[index-1] !== null){
  		console.log("first array item " + markerArray[index-1].getTitle());
		markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
  	}
  	
  	markerArray[index-1].push(marker); //Add marker to array at this position
  	console.log("first array item " + markerArray[index-1].getTitle());
  	return marker;
  };


  return {
  	initialiseMap: initialiseMap,
  	updateMarker: updateMarker
  };
});