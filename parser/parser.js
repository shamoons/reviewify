var Promise = require('bluebird');

var AlchemyAPI = require('alchemy-api');
var alchemy = Promise.promisifyAll(new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49'));

module.exports = function(ASIN, productDescription, reviews) {
  var resultObject = [];

  Promise.map(reviews, function(review) {
    alchemy.keywords(review.text, {sentiment: 1})
  }).then(function(reviewKeywords) {
    // We have an array of keyword arrays
    var keywordCounts = {};
    _.each(reviewKeywords, function(keywords) {
      _.each(keywords, function(keyword) {
        if(keywordCounts[keyword.text]) {
          keywordCounts[keyword.text].count++;
          keywordCounts[keyword.text].relevance += keyword.relevance;
          keywordCounts[keyword.text].sentiment += keyword.sentiment.score;
        } else {
          keywordCounts[keyword.text].count = 1;
          keywordCounts[keyword.text].relevance = keyword.relevance;
          keywordCounts[keyword.text].sentiment = keyword.sentiment.score;
        }
      });
    });

    // Now we have an object that looks like:
    /*
        keywordCounts = {
          'screen resolution': {
            count: 12,
            relevance: 3.1323,
            sentiment: 9
          },
          'weight': {
            count: 1,
            relevance: 0.001,
            sentiment: 0
          }
        }
    */

    
  });

}