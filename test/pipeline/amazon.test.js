var amazon = require('../../pipeline/amazon');
var chai = require('chai');
var expect = chai.expect;

describe('amazon pipeline', function() {
	
  describe('get item review pros and cons by asin ', function() { 
	    
	  it('features are extracted successfully', function () {
		  var resultArray = [];
		  var features = [];
		  amazon.features('B00008OE6I', resultArray, function(result){
			  //expect(result).to.not.be.empty;
			  //expect(result[0]).to.contains('www.amazon.com/reviews/iframe');
			  //console.log(result);
			  features.push(result);
		  });
		
	   });
	  
  });
  
});