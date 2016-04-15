var https = require('https');
var http = require('http');
var chalk = require('chalk');
var deasync = require('deasync');

function validate(actual_res, expected_res, testNumber){
	var result = false;
	if(!expected_res.status){
		result = actual_res.statusCode == 200;
	}else{
		result = actual_res.statusCode == expected_res.status;
	}

	if(expected_res.body){
		result = actual_res.body == expected_res.body;
	}

	if(result){
		console.log(chalk.green('Test ' + testNumber + " PASS"));
	}else{
		console.log(actual_res.body);
		console.log(expected_res.body);
		console.log(chalk.red('Test ' + testNumber + " Fails"));
	}
}

exports.run = function(testData){
	
	for (var i = 0; i<testData.length; i++) {
		var test = testData[i];
		var options = {host: "localhost", port: 9999, method: 'GET'};
		options['path'] = test.request.path;
		if(test.request.headers){
			options['headers'] = test.request.headers;
		}
		if(test.request.method){
			options['method'] = test.request.method;	
		}
		
		var testState = false;
		var req = http.request(options, function(response){
			var str = ''
			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				response['body'] = str;
				validate(response,test.response, i+1);
				testState = true;
			});
		});

		if(test.request.post){
			req.write(test.request.post);	
		}
		req.end();

		deasync.loopWhile(function(){return !testState;});
	}
}