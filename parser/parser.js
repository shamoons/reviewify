var Promise = require('bluebird');

var AlchemyAPI = require('alchemy-api');
var alchemy = Promise.promisifyAll(new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49'));

module.exports = function(ASIN, productDescription, reviews) {
  var resultObject = [];

  Promise.map(reviews, function(review) {
    alchemy.relationsAsync(review.text, {sentiment: 1})
  }).then(function(reviewRelations) {
    var verbsWeCareAbout = ['is', 'are', 'has', 'was'];

    // We have an array of keyword arrays
    var featureCounts = {};
    _.each(reviewRelations, function(relations) {

      var filteredRelations = _.filter(relations, function(relation) {
        if(!relation.object) {
          return false;
        }

        if(!relation.object.sentiment) {
          return false;
        }

        if(Math.abs(relation.object.sentiment.score) < 0.5) {
          return false;
        }

        return verbsWeCareAbout.indexOf(relation.action.text) !== -1;
      });

      _.each(filteredRelations, function(relation) {
        if(featureCounts[relation.subject.text]) {
          featureCounts[relation.subject.text].count++;
          featureCounts[relation.subject.text].sentiment += relation.object.sentiment.score;
        } else {
          featureCounts[relation.subject.text].count = 1;
          featureCounts[relation.subject.text].sentiment = relation.object.sentiment.score;
        }
      });
    });

    // Now we have an object that looks like:
    /*
        keywordCounts = {
          'screen resolution': {
            count: 12,
            sentiment: 9
          },
          'weight': {
            count: 1,
            sentiment: 0
          }
        }
    */
    // var topKeywords = _.sortBy(keywordCounts, 'count');
    // topKeywords = _.slice(topKeywords, 0, 10);
  });

}