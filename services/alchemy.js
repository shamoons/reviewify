//alchemy API call goes here, e.g. analytics api calls
var _ = require('lodash');
var util = require('util');
var Promise = require('bluebird');
var AlchemyAPI = require('alchemy-api');
var alchemy = Promise.promisifyAll(new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49'));
var fs = Promise.promisifyAll(require('fs'));

module.exports = {

		'relations' :	function(reviews) {
			var resultObject = [];

			Promise.map(reviews, function(review) {
				alchemy.relationsAsync(review.text, {sentiment: 1})
			}).then(function(reviewRelations) {
				var verbsWeCareAbout = ['is', 'are', 'has', 'was'];
				////.....
			});
		},
		
		'keywords' :	function(reviews) {
			var transformed = []
			return Promise.map(reviews, function(review) {
			    return alchemy.keywordsAsync(review, {sentiment: 1});
			})
			.each(function(result) {
			    // This is repeating access for each result
				result.keywords.forEach(function(keyword){
					if(keyword.relevance > 0.6 && keyword.sentiment.type != 'neutral' && Math.abs(keyword.sentiment.score)>0.5)
						transformed.push(keyword);
				})			    
			})
			.then(function(results) {
			    // here 'results' is unmodified results from the api
			    // array doesn't get updated by 'each' function
			    // here 'transformed' will contain what you did to each above
				//console.log(results);
			    return transformed;
			});			
		}
}
