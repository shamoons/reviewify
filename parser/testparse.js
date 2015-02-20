var _ = require('lodash');

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var AlchemyAPI = require('alchemy-api');
var alchemy = Promise.promisifyAll(new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49'));

var util = require('util');

var functions = ['sentiment', 'relations', 'concepts', 'keywords'];

var fileData = {}
fs.readFileAsync('./data/corpus.txt', 'utf-8').then(function(body) {
  fileData = body;
  return alchemy.relationsAsync(fileData, {sentiment: 1});
})
.then(function(response) {
  console.log('RELATIONS!');
  console.log(util.inspect(response.relations, {depth: null}));

  var groupedVerbs = _.groupBy(response.relations, function(relation) {
    return relation.action.text;
  });
  console.log('');
  console.log(util.inspect(groupedVerbs, {depth: null}));
  return alchemy.sentimentAsync(fileData, {});
}).then(function(response) {
  console.log('\nSENTIMENT!');
  console.log(util.inspect(response.docSentiment, {depth: null}));
  return alchemy.keywordsAsync(fileData, {});
}).then(function(response) {
  console.log('\nKEYWORDS!');
  console.log(util.inspect(response.keywords, {depth: null}));
  return true;
}).catch(function(err) {
  throw err;
});

var endResult = [{
  feature: 'power button',
  description: 'hard to press',
  strength: 100
}, {
  feature: 'screen resolution',
  description: 'extremely sharp',
  strength: 21
}];

var pros = [{
  keyword: 'screen resolution',
  score: 100
}, {
  keyword: 'battery life',
  score: 2
}];