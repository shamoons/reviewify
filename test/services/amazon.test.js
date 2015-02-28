var amazon = require('../../services/amazon');
var chai = require('chai');
var expect = chai.expect;

describe('Amazon service', function() {
	
  describe('get item review iframe ', function() { 
	    
	  it('itemLookup call successfully', function () {
		  amazon.itemLookup('B00008OE6I', function(err, result){
			  expect(result).to.not.be.empty;
			  expect(result[0]).to.contains('www.amazon.com/reviews/iframe');
			  //console.log(result);
		  });
		
	   });
	  
  });
  
});