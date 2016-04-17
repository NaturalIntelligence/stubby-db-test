var testrunner = require("./testhelper");
var suit1 = require('./testsuit')
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
			//host: "localhost"
			port: 8000
			//, method: 'GET'
			, ca : fs.readFileSync("../truststore/ca/stubbydb-ca.crt")
		};

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
testrunner.run(suit1.testData,https,options);