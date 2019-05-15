//Check
(function () { //This essentially acts as the routes/apiv1.js where the fetch request goes to

    'use strict';

    var apiv1 = require('../../routes/apiv1');
    var assert = require('chai').assert;
    var REQUEST = require('request');

    var request = REQUEST.defaults( {
        strictSSL: false
    });

    var appUrl = process.env.APP_URL;
    
    describe('Get Weather', function() { //Get Weather

    	it('with valid city', function(done) { //Test1
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?city=wairoa'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert((pbody.city === 'Wairoa') || (pbody.city === 'wairoa'), "City name does not match");
              done();
            }
        });
    	}); //End test1

      it('without city', function(done) { //Test2
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather'
          }, /* @callback */ function(err, resp, body) { 
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 400);
              done();
            }
        });
    	}); //End test2
    	
    	it('with another valid city', function(done) { //Test3
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?city=Hamilton'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              assert((pbody.city === 'hamilton') || (pbody.city === 'Hamilton'), "City name does not match");
              done();
            }
        });
    	}); //End test3
    	
    	/*
    	it('with valid geocode', function(done) { //Test4
        if(!appUrl) {
            assert.fail("Environment variable APP_URL is not defined");
            return done();
        }
        request({
      		method: 'GET',
              url: appUrl + '/api/v1/getWeather?lat=39.223&lng=177.4125'
          }, function(err, resp, body) {
          	if(err) {
          		assert.fail('Failed to get the response');
          	} else {
              assert.equal(resp.statusCode, 200);
              var pbody = JSON.parse(body);
              //assert((pbody.lat === 39.223) && (pbody.lng === 177.4125), "Geocode does not match");
              assert((pbody.city === 'Wellington') || (pbody.city === 'wellington'), "Geocode does not match");
              done();
            }
        });
    	}); //End test4
    	*/
	}); //End Get Weather
})();
