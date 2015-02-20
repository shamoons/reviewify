var request = require('request');
var async = require('async');


request('http://api.remix.bestbuy.com/v1/reviews(sku=1780275)?format=json&apiKey=jcmxhmys3hkqg4mgwh9y884c&show=id,comment', function(error, response, body){
  var pageCount = JSON.parse(body).totalPages;
  var pageSize = [];
  for(var i=0; i < pageCount; i++ ){
    pageSize.push(i);
  };
});
