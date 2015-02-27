var alchemy = require('../../services/alchemy');
var chai = require('chai');
var expect = chai.expect;
var util = require('util');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

describe('alchemy service', function() {
	
  describe('api calls ', function() { 
	    
	  it('keywords api call successfully', function () {
		  
		  fs.readFileAsync('./data/corpus.txt', 'utf-8').then(function(body) {
			  alchemy.keywords([body]).then(function(res){console.log(res);});	  
			  
		  });
			
	   });
	  
  });
  
});