//Check
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
	  
	  function initialiseMap(){
	  	
			$scope.map = new google.maps.Map(document.getElementById('map'), {
		      center: {lat: -39.0363124, lng: 177.4120491},
		      zoom: 6
		    });
		    
		    $scope.map.addListener('click', function(e){
		    	updateMarker(mostRecentInputIndex, e.latLng.lat(), e.latLng.lng());
		    	getMarkerWeather(e.latLng.lat(), e.latLng.lng());
		    });
		    
		    //console.log("Made it to initialiseMap method mapDOM2: " + mapDOM + " type: " + typeof mapDOM);
		    
		    //return mapDOM;
	  }
	  
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
                    $scope.zip1lat = "";
                    $scope.zip1lon = "";
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
	  
	initialiseMap(); //Initialise the googlemap
	getDbData();
	
	function getDbData(){
		var ibmdb = require('ibm_db');
 
		ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=ljr29093;PWD=r4m^f5gl6kntq4b7;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
		  if (err) return console.log(err);
		  
		  conn.query('select 1 from sysibm.sysdummy1', function (err, data) {
		    if (err) console.log(err);
		    else console.log(data);
		 
		    conn.close(function () {
		      console.log('done');
		    });
		  });
		});
		
		
		/*
		 * {
  "hostname": "dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "password": "r4m^f5gl6kntq4b7",
  "https_url": "https://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "port": 50000,
  "ssldsn": "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=ljr29093;PWD=r4m^f5gl6kntq4b7;Security=SSL;",
  "host": "dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net",
  "jdbcurl": "jdbc:db2://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50000/BLUDB",
  "uri": "db2://ljr29093:r4m%5Ef5gl6kntq4b7@dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50000/BLUDB",
  "db": "BLUDB",
  "dsn": "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=ljr29093;PWD=r4m^f5gl6kntq4b7;",
  "username": "ljr29093",
  "ssljdbcurl": "jdbc:db2://dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net:50001/BLUDB:sslConnection=true;"
}
		
		
		var url = "../Php/sendReceiveData.php?city=Wairoa123";
        fetch(url, {
            method: 'GET'
        })
            .then(response = response.text)
            .then(handleResponse, handleError);
            */
	}
	
	function handleResponse(response){
		alert(response);
	}
	
	function handleError(){
		alert("error from php file");
	}
	
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







/*
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
	  
	  
	  
	  function initialiseMap(){
			$scope.map = new google.maps.Map(document.getElementById('map'), {
		      center: {lat: -39.0363124, lng: 177.4120491},
		      zoom: 6
		    });
		    
		    $scope.map.addListener('click', function(e){
		    	getWeather(undefined, e.latLng.lat(), e.latLng.lng());
		    });
	  }
	  
	initialiseMap(); //Initialise the googlemap
    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
    
    
    function getWeather(which, newLat, newLng)
    {
		var newUrl;
		var data ="null";
		
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
	        
	        //newUrl = 'city=' + data;
		}
		
		newUrl = 'city=' + data + '&lat=' + newLat + '&lng=' + newLng;
        

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
    
}]);
*/




