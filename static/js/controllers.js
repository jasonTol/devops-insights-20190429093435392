
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

		var markerArray = [0,0,0,0];
  		var mostRecentInputIndex = 1;
  
  
	  function updateMarker(index, newLat, newLng)
	  {
	  	console.log("lat: " + newLat + typeof newLat + " lon: " + newLng + typeof newLng);
	  	console.log("input index currently: " + mostRecentInputIndex);
	    var myLatLng = new google.maps.LatLng(newLat, newLng);
	    	
		var marker = new google.maps.Marker({
	   		position: myLatLng,
		    map: $scope.map,
		    title: index.toString()
	  	});
	  	
	  	if(markerArray[index-1] !== 0){ //If there is a marker in the array at index clear it
			markerArray[index-1].setMap(null); //Remove the marker for this position if it exists
	  	}
	  	
	  	$scope.map.panTo(myLatLng);
	  	
	  	mostRecentInputIndex = index; //Update the most recent input box that was used so correct marker can be updated in the array
	  	console.log("input index updated to: " + mostRecentInputIndex);
	  	markerArray[index-1] = marker; //Add marker to array at pass in index
	  }
	  
	  function initialiseMap(mapDOM){
	  	if(mapDOM === null){
			mapDOM = new google.maps.Map(document.getElementById('map'), {
		      center: {lat: -39.0363124, lng: 177.4120491},
		      zoom: 6
		    });
		    
		    mapDOM.addListener('click', function(e){
		    	//updateMarker(mostRecentInputIndex, e.latLng.lat(), e.latLng.lng());
		    	getWeather(undefined, e.latLng.lat(), e.latLng.lng());
		    });
		    
		    return mapDOM;
		}
	  }
	  /*
	  function getMarkerWeather(newLat, newLng)
	  {
	  	console.log("In getmarkerWeather method newLat: " + newLat + typeof newLat + " newLng: " + newLng + typeof newLng);
	  	if(newLat !== undefined && newLng !== undefined) { //Sends city from ng-change value and outputs response to user
            $http({
                method: "GET",
                url: '/api/v1/getWeather?lat=' + newLat + '&lng=' + newLng
            }).then( function(response) {
                if(mostRecentInputIndex === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;               
                    //updateMarker(1, response.data.lat, response.data.lon);
                } else if(mostRecentInputIndex === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    //updateMarker(2, response.data.lat, response.data.lon);
                } else if(mostRecentInputIndex === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    //updateMarker(3, response.data.lat, response.data.lon);
                } else if(mostRecentInputIndex === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    //updateMarker(4, response.data.lat, response.data.lon);
                } 
            });
        } else {
            if(mostRecentInputIndex === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(mostRecentInputIndex === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(mostRecentInputIndex === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(mostRecentInputIndex === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
	  }
	  */
	  
	$scope.map = initialiseMap($scope.map); //Initialise the googlemap
    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
    
    
    function getWeather(which, newLat, newLng)
    {
		var newUrl;
		var data = "";
		
		if(which !== undefined){ //If user entered town in input boxes
	        //Checks ng-model value from Byzip.html
	        if(which === 1) {
	            data = $scope.zip1m;
	        } else if(which === 2) {
	            data = $scope.zip2m;
	        } else if(which === 3) {
	            data = $scope.zip3m;
	        } else if(which === 4) {
	            data = $scope.zip4m;
	        }
	        
	        newUrl = 'city=' + data;
		}
		else{ //User clicked on map
			newUrl = 'lat=' + newLat + '&lng=' + newLng;
		}
        

        //if(data.length === 5) { //Sends city from ng-change value and outputs response to user
        if(data.length > 3 || (newLat !== undefined && newLng !== undefined)) { //Sends city from ng-change value and outputs response to user
            $http({
                method: "GET",
                url: '/api/v1/getWeather?' + newUrl
            }).then( function(response) {
                if(which === 1 || mostRecentInputIndex === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;           
                    updateMarker(1, response.data.lat, response.data.lon);
                } else if(which === 2 || mostRecentInputIndex === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    updateMarker(2, response.data.lat, response.data.lon);
                } else if(which === 3 || mostRecentInputIndex === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    updateMarker(3, response.data.lat, response.data.lon);
                } else if(which === 4 || mostRecentInputIndex === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    updateMarker(4, response.data.lat, response.data.lon);
                } 
            });
        } else {
            if(which === 1 || mostRecentInputIndex === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2 || mostRecentInputIndex === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3 || mostRecentInputIndex === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4 || mostRecentInputIndex === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    }
    
	$scope.zip = function(which){ //Call the getWeather method and display weather of city typed into input box
		getWeather(which);
	};
	
	
	
	/*
    $scope.zip = function(which) {

        var data = "";
        //Checks ng-model value from Byzip.html
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        }

        //if(data.length === 5) { //Sends city from ng-change value and outputs response to user
        if(data.length > 3) { //Sends city from ng-change value and outputs response to user
            $http({
                method: "GET",
                url: '/api/v1/getWeather?city=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;           
                    updateMarker(1, response.data.lat, response.data.lon);
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    updateMarker(2, response.data.lat, response.data.lon);
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    updateMarker(3, response.data.lat, response.data.lon);
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    updateMarker(4, response.data.lat, response.data.lon);
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    */
    
}]);


/* --------{ Before changes }---------

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
  
  
  
  
  
  
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute', 'googMap']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['createMap', '$scope', '$http', '$routeParams', '$timeout', '$sce',
    function(createMap, $scope, $http, $routeParams, $timeout, $sce) {

	$scope.map = createMap.initialiseMap($scope.map); //Initialise the googlemap
	
    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";

    $scope.zip = function(which) {

        var data = "";
        //Checks ng-model value from Byzip.html
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        }

        //if(data.length === 5) { //Sends city from ng-change value and outputs response to user
        if(data.length > 3) { //Sends city from ng-change value and outputs response to user
            $http({
                method: "GET",
                url: '/api/v1/getWeather?city=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    $scope.zip1lat = response.data.lat;
                    $scope.zip1lon = response.data.lon;                 
                    createMap.updateMarker(1, $scope.map, response.data.lat, response.data.lon);
                } else if(which === 2) {
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    createMap.updateMarker(2, $scope.map, response.data.lat, response.data.lon);
                } else if(which === 3) {
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    createMap.updateMarker(3, $scope.map, response.data.lat, response.data.lon);
                } else if(which === 4) {
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    createMap.updateMarker(4, $scope.map, response.data.lat, response.data.lon);
                } 
            });
        } else {
            if(which === 1) {
                    $scope.zip1City = "";
                    $scope.zip1Weather = "";
                    $scope.zip1lat = "";
                    $scope.zip1lon = "";
                } else if(which === 2) {
                    $scope.zip2City = "";
                    $scope.zip2Weather = "";
                } else if(which === 3) {
                    $scope.zip3City = "";
                    $scope.zip3Weather = "";
                } else if(which === 4) {
                    $scope.zip4City = "";
                    $scope.zip4Weather = "";
                } 
        }
    };
    
}]);
*/