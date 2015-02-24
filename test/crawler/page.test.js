
var page = require('../../crawler/page');
var chai = require('chai');
var expect = chai.expect;

describe('Crawler', function() {
	
  describe('page ', function() { 
	    
	  it('crawl successfully', function () {
		  
		  var url = 'http://www.amazon.com/Pampers-Swaddlers-Diapers-Economy-Count/product-reviews/B00DFFT76U';
		  var p = new page();
		  p.crawlAmazonReviewInframe(url, function(err, $, reviewIds, nextUrl){		  
			  expect(err).to.be.null;
			  expect($).to.not.be.empty;
			  expect(reviewIds).to.not.be.empty;
			  expect(reviewIds.length).to.be.equals(10);
			  expect(nextUrl).to.contains('Pampers-Swaddlers-Diapers-Economy-Count');
			  
			  reviewIds.forEach(function(id){
				  p.crawlAmazonReviewById(id);
			  })
		  });
	   });
	  
	  it('crawl unsuccessfully', function () {		  
		  var url = 'http://not-exist';
		  var p = new page();
		  p.crawlAmazonReviewInframe(url, function(err, $, reviewIds, nextUrl){
			  expect(err).to.not.be.empty;
			  expect($).to.be.empty;
			  expect(nextUrl).to.be.empty;
		  });
	   });
	  
	  it('crawl review by id successfully', function () {		  
		  var id = 'RDQO5C2XEPVPC';
		  var p = new page();
		  p.crawlAmazonReviewById(id);
	   });
  
  });
  
});
