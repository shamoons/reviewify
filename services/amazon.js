var util = require('util'),
	OperationHelper = require('apac').OperationHelper;

module.exports = {
		itemLookup : function (asin, cb){
			
		var opHelper = new OperationHelper({
		    awsId:     'AKIAJENNMTG7RBK2HAKQ',
		    awsSecret: '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',
		    assocId:   'AKIAJENNMTG7RBK2HAKQ'
		    // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
		});

		opHelper.execute('ItemLookup', {
		  'ItemId': asin,
		  'IdType': 'ASIN',
		  'ResponseGroup':'Reviews'
		}, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
		    cb(err, results.ItemLookupResponse.Items[0].Item[0].CustomerReviews[0].IFrameURL);
		    
		});

		}
		
		
}