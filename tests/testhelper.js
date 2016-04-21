var chalk = require('chalk');
var deasync = require('deasync');
var zlib = require('zlib');

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
		console.log(expected_res);
		console.log(chalk.red('Test ' + testNumber + " Fails"));
	}
}

exports.run = function(testData,protocol,options){
	
	for (var i = 0; i<testData.length; i++) {
		var test = testData[i];
		//var options = {host: "localhost", port: 9999, method: 'GET'};
		options['path'] = test.request.path;
		if(test.request.headers){
			if(!options['headers']){
				options['headers'] = {}
			}
			for(header in test.request.headers){
				options['headers'][header] = test.request.headers[header];
			}
		}

		if(test.request.method){
			options['method'] = test.request.method;	
		}else{
			options['method'] = 'GET';
		}

		if(!options['host']){
			options['host'] = 'localhost';	
		}
		
		var testState = false;
		var req = protocol.request(options, function(response){
			var str = ''

			if(response.headers['content-encoding']){
				var uncompressor;
				if(response.headers['content-encoding'].indexOf('gzip') > -1){
					uncompressor = zlib.createGunzip();
				}else if(response.headers['content-encoding'].indexOf('deflate') > -1){
					uncompressor = zlib.createInflate();
				}
				var payload = "";

			    uncompressor.on('data', function(data){
			        payload += data.toString();
			    });

			    uncompressor.on('end', function(){
			    	response['body'] = payload;
			        validate(response,test.response, i+1);
					testState = true;
			    });

			    response.pipe(uncompressor);
			}else{
				response.on('data', function (chunk) {
					str += chunk;
				});

				response.on('end', function () {
					response['body'] = str;
					validate(response,test.response, i+1);
					testState = true;
				});	
			}

		});

		if(test.request.post){
			req.write(test.request.post);	
		}
		req.end();

		deasync.loopWhile(function(){return !testState;});
	}
}