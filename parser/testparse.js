var fs = require('fs');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49');

fs.readFile('./data/dell1.txt', 'utf-8', function(err, body) {
  if(err) throw err;

  alchemy.relations(body, {sentiment: 1}, function(err, response) {
    if (err) throw err;

    console.log(response.relations[0]);
  });
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