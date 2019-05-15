/*
angular.module('googMap',[])
.factory('createMap', function() {
  var markerArray = [0,0,0,0];
  var mostRecentInputIndex = 1;
  
  var initialiseMap = function(mapDOM){
  	if(mapDOM == null){
		mapDOM = new google.maps.Map(document.getElementById('map'), {
	      center: {lat: -39.0363124, lng: 177.4120491},
	      zoom: 6
	    });
	    
	    mapDOM.addListener('click', function(e){
	    	updateMarker(mostRecentInputIndex, mapDOM, e.latLng.lat(), e.latLng.lng());
	    	
	    });
	    
	    return mapDOM;
	}
  };
  
  var updateMarker = function(index, gooMap, newLat, newLng)
  {
  	console.log("lat: " + newLat + typeof newLat + " lon: " + newLng + typeof newLng);
  	console.log("input index currently: " + mostRecentInputIndex);
    var myLatLng = new google.maps.LatLng(newLat, newLng);
    	
	var marker = new google.maps.Marker({
   		position: myLatLng,
	    map: gooMap,
	    title: index
  	});
  	
  	if(markerArray[index-1] !== 0){ //If there is a marker in the array at index clear it
		markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
  	}
  	
  	gooMap.panTo(myLatLng);
  	
  	mostRecentInputIndex = index; //Update the most recent input box that was used so correct marker can be updated in the array
  	console.log("input index updated to: " + mostRecentInputIndex);
  	markerArray[index-1] = marker; //Add marker to array at pass in index
  	//return marker;
  };


  return {
  	initialiseMap: initialiseMap,
  	updateMarker: updateMarker
  };
});
*/