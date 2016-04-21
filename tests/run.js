var testrunner = require("./testhelper");
var suit1 = require('./testsuit')
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
			//host: "localhost"
			port: 9999,
			headers : { 'accept-encoding': 'deflate'}
			//, method: 'GET'
		};

testrunner.run(suit1.testData,http,options);