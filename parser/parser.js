var Promise = require('bluebird');

var AlchemyAPI = require('alchemy-api');
var alchemy = Promise.promisifyAll(new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49'));

module.exports = function(ASIN, productDescription, reviews) {
  Promise.map(reviews, function(review) {
    alchemy.keywords(review.text, {sentiment: 1})
  }).then(function(keywords) {
    // We have an array of keyword arrays
  });

}