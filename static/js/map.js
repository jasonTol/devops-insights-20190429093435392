
angular.module('googMap', [])
.factory('createMap', function() {
  var markerArray = [0,0,0,0];
  var mostRecentInputIndex = 1;
  var geocoder = new google.maps.Geocoder;
  
  var initialiseMap = function(mapDOM){
  	if(mapDOM == null){
		mapDOM = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -39.0363124, lng: 177.4120491},
	      zoom: 6
	    });
	    
	    mapDOM.addListener('click', function(e){
	    	//ar geoArray = [];
	    	//geoArray.push(e.latLng.lat(), e.latLng.lng());
	    	
	    	updateMarker(mostRecentInputIndex, mapDOM, e.latLng.lat(), e.latLng.lng());
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
  
  var updateMarker = function(index, gooMap, newLat, newLng)
  {
  	console.log("lat: " + newLat + typeof newLat + " lon: " + newLng + typeof newLng);
  	console.log("input index updated to: " + mostRecentInputIndex);
    var myLatLng = new google.maps.LatLng(newLat, newLng);
    
    geocoder.geocode({'location': myLatLng}, function(results, status){ //Get address for marker just placed
    	if(status === 'OK'){
    		if(results[0])
    		console.log(results[0].formatted_address);
    	}
    });
    	
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