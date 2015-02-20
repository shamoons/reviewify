var fs = require('fs');

var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('8c11bb2b0bdaaf679cf25b34104914bc8a092c49');

fs.readFile('./data/macbookreview.txt', 'utf-8', function(err, body) {
  if(err) throw err;

  alchemy.category(body, {}, function(err, response) {
    if (err) throw err;

    // See http://www.alchemyapi.com/api/ for format of returned object
    // var sentiment = response.docSentiment;
    console.log(response);

    // Do something with data
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