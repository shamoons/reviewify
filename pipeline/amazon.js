var amazon = require('../services/amazon'),
	crawler = require('../crawler/page'),
	alchemy = require('../services/alchemy');

/*
 * review analystics pipeline demonstrated by using amazon review text mining
 * input is asin
 * output is feature extraction result
 */
module.exports = {
		'features' : function (asin, resultArray, cb){
			
			//step 1: get review iframe page by asin
			amazon.itemLookup(asin, function(err, result){
				 //console.log(result[0]);
				 result[0] = 'http://www.amazon.com/Canon-PowerShot-Digital-Camera-Optical/product-reviews/B00008OE6I/';
				  var p = new crawler();	
				  //step 2: crawler review iframe page to get review ids
				  p.crawlAmazonReviewInframe(result[0], function(err, $, reviewIds, nextUrl){	
					  
					  //step3: get review text by id
					  reviewIds.forEach(function(id){
						  var reviews = p.crawlAmazonReviewById(id, function(reviewText, rating, authorInf, date){
							  //console.log(reviewText);
							  
							  //step4: alchemy keywords api call to extract features
							  alchemy.keywords([reviewText]).then(function(res){
								  resultArray.push(res);	  				  
								  //console.log(res);
								  cb(res);
							  });	
							  
						  });
						  
						  
					  })
					  
				  });
				  
				
				  
			  });
			
		

		}
		
		
}