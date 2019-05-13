
angular.module('googMap', [])
.factory('createMap', function() {
  var markerArray = [0,0,0,0];
  var mostRecentInputIndex = 1;
  
  var initialiseMap = function(mapDOM){
  	if(mapDOM == null){
		mapDOM = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -39.0363124, lng: 177.4120491},
	      zoom: 6
	    });
	    
	    var geoArray = [];
	    geoArray.push(e.latLng.lat, e.latLng.lng);
	    
	    mapDOM.addListener('click', function(e){
	    	var geoArray = [];
	    	geoArray.push(e.latLng.lat, e.latLng.lng);
	    	updateMarker(mostRecentInputIndex, mapDOM, geoArray);
	    });
	    
	    return mapDOM;
	}
  };
  
  /*function placeMarkerAndPanTo(latLng, map){ //Place marker on map and pan to that location
  	var marker = new google.maps.Marker({
  		position: latLng,
  		map: map
  	});
  	map.panTo(latLng);
  }*/
  
  var updateMarker = function(index, gooMap, latLng)
  {
  	console.log("lat: " + latLng[0] + typeof latLng[0] + " lon: " + latLng[1] + typeof latLng[1]);
  	console.log("input index updated to: " + mostRecentInputIndex);
    var myLatLng = new google.maps.LatLng(latLng[0], latLng[1]);
    
	//console.log("Inside the updateMarker() of createMap service --{lat = " + lat + " lon = " + lon + " index = " + index + "}--");
    	
	var marker = new google.maps.Marker({
   		position: myLatLng,
	    map: gooMap,
	    //title: city
  	});
  	
  	if(markerArray[index-1] !== 0){ //If there is a marker in the array at index clear it
  		//console.log("first array item " + markerArray[index-1].getTitle());
		markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
  	}
  	
  	gooMap.panTo(latLng);
  	
  	mostRecentInputIndex = index-1; //Update the most recent input box that was used so correct marker can be updated in the array
  	console.log("input index updated to: " + mostRecentInputIndex);
  	markerArray[index-1] = marker; //Add marker to array at pass in index
  	return marker;
  };
  
  
 /*
  var updateMarker = function(index, gooMap, city, lat, lon)
  {
    var myLatLng = new google.maps.LatLng(lat, lon);
    
	//console.log("Inside the updateMarker() of createMap service --{lat = " + lat + " lon = " + lon + " index = " + index + "}--");
    	
	var marker = new google.maps.Marker({
   		position: myLatLng,
	    map: gooMap,
	    title: city
  	});
  	
  	if(markerArray[index-1] !== 0){ //If there is a marker in the array at index clear it
  		//console.log("first array item " + markerArray[index-1].getTitle());
		markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
  	}
  	
  	mostRecentInputIndex = index-1; //Update the most recent input box that was used so correct marker can be updated in the array
  	markerArray[index-1] = marker; //Add marker to array at pass in index
  	return marker;
  };
  */


  return {
  	initialiseMap: initialiseMap,
  	updateMarker: updateMarker
  };
});