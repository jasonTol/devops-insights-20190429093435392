
angular.module('googMap', [])
.factory('createMap', function() {
  /*var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  }; */
  var displaySomething = function() {
    return "If it is nobler in mind to suffer the slings and arrows of outragious fortune, or take arms against a sea of troubles";
  };

  return {
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