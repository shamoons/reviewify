# reviewify

A consumer review search and analytics engine to give user an executive summary about any product and assist buy
decision based on reviews and ratings across various eCommerce sites including Amazon, Bestbuy and etc. 

The consumer reviews data mining involves those steps:

1. feature extraction

2. POS analysis

3. sentimental analysis

4. overall rating score

So far the pros and cons array we have in parser is on the right track. However we have few open questions:

what is the best way to do feature extraction and sentimental analysis? In data mining no approach is perfect. So I expect a mixture approach backed by certain manual intervention. The approach may also be tailored to different data sources such as reviews from ebay vs bestbuy.

should we do analysis offline or online? The current analysis can be done offline. We can scan through each sku in bestbuy or asin in amazon, and store result in DB. I feel it could be our ultimate approach.

which data sources should we use? Right now I start with bestbuy.com data, but we can expand to ebay, amazon and etc once we know how to crawl the sites.
