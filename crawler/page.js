var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');

function Page (opts) {
	this.options = {};
	this.init(opts);
} 

Page.prototype.init = function (opts){
	var defaultOptions = {
		    'headers' : {
		      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		      'Accept-Language': 'en-US,en;q=0.8',
		      'Cache-Control': 'no-cache',
		      'Connection': 'keep-alive',
		      //'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
		    }	  
	};
		    	
	this.options = _.extend(defaultOptions, opts);
}


Page.prototype.crawl = function (url, cb){
	request(url, function (error, response, html) {
		if(error || (response && response.statusCode !=200)){
			if(cb)
				return cb(error||new error(response.statusCode));
			return;
		}
		
		var $ = cheerio.load(html);
		
		if(cb)
			return cb(null, $);
		return $;
	});
	
}

Page.prototype.crawlAmazonReviewInframe = function (url, cb){
	this.crawl(url, function (error, $) {
		if(error){
			if(cb)
				return cb(error||new error(response.statusCode));
			return;
		}
		var pageLinkTags = $('.paging a');
		
		var nextTag = pageLinkTags[pageLinkTags.length - 1];
	    var nextText = pageLinkTags[pageLinkTags.length - 1].children[0].data;
	    var nextUrl = null;
	    if(nextText == 'Next &rsaquo;')
	      nextUrl = nextTag.attribs.href;
	    
	    var reviewIds = [];
	    $('#productReviews a').each(function(index, element){	
	    	if(element.attribs && element.attribs.name && element.attribs.name.indexOf('R', 0)==0 && element.attribs.name.indexOf('Reviews', 0)==-1){
	    		
	    		reviewIds.push(element.attribs.name);
	    	}
	    });
		
		if(cb)
			return cb(null, $, reviewIds, nextUrl);	
		 
	});
}

Page.prototype.crawlAmazonReviewById = function(rId, cb){
	var url = "http://www.amazon.com/review/" + rId;
	this.crawl(url, function (error, $) {	
		if(error){
			if(cb)
				return cb(error||new error(response.statusCode));
			return;
		}
			
		var reviewText = $('.reviewText').text();
		
		var authorInf = $('.crAuthorInfo')['0'].children;		
		var rating = $('div span img')['0'].attribs.title;
		var date = $('nobr')['0'].children[0].data;
				
		if(cb)
			return cb(reviewText, rating, authorInf, date);
		return [reviewText, rating, authorInf, date];
		
	});
	
}

module.exports = Page;
