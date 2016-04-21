var exec = require('child_process').exec;
var testrunner = require("./testhelper");
var suit1 = require('./testsuit')
var path = require('path')
var deasync = require('deasync');
var fs = require('fs');
var https = require('https');
var http = require('http');
var chalk = require('chalk');

var testProjDir = path.resolve( __dirname + "/..");
var spawn = require('child_process').spawn;

console.log(chalk.yellow("Build own configuration with absolute path of project directory"));
//Remove logs file
run("stubbydb -d " + testProjDir + " -p 9999 --logs",http,{port : 9999});
//check if logs file presents
//check if the size of exceptions.log is 0

console.log(chalk.yellow("Build configuration from config.json with absolute path of project directory"));
console.log(chalk.yellow("And setting the host to 127.0.0.1"));
console.log(chalk.yellow("And expecting gzip response"));

//Remove logs folder
run("stubbydb -d " + testProjDir + " -c config.json --host 127.0.0.1 --logs ",http,{port : 9999, headers : { 'accept-encoding': 'gzip, deflate'}});
//check if logs folder with logs file is created
//check if the size of exceptions.log is 0

console.log(chalk.yellow("Build configuration from wrongconfig.json but override with cmd arguments"));
//Remove logs folder
//fs.rmdirSync(testProjDir + "/logs");
run("stubbydb -d " + testProjDir + " -c wrongconfig.json -p 9999 -s ../stubs -P 8000 --logs ",http,{port : 9999});
//--mutualSSL true
//fs.existsSync(testProjDir + '/debug.log');
//check if logs file are created on root of the folder
//check if the size of exceptions.log is 0

console.log(chalk.yellow("Build own configuration with relative path of project directory"));
run("stubbydb -d .. -p 9999 --logs",http,{port : 9999});
//check if the size of exceptions.log is 0

console.log(chalk.yellow("Build configuration from config.json with relative path of project directory"));
run("stubbydb -d .. -c config.json --logs",http,{port : 9999});
//check if the size of exceptions.log is 0

//run("stubbydb -d .. -c config.json --mutualSSL false --logs",https,{ port:8000});

//Mutual handshaking
/*run("stubbydb -d .. -c config.json --logs",https,{ 
		port:8000
		, key : fs.readFileSync("../truststore/client/user.key")
		, cert : fs.readFileSync("../truststore/client/user.crt")
		, ca : fs.readFileSync("../truststore/ca/stubbydb-ca.crt")
	});*/
//check if the size of exceptions.log is 0


stopStubbyDB();

function run(cmd,protocol,options){
	
	stopStubbyDB();
	deasync.sleep(500);
	console.log(cmd);
	cmd = cmd.split(' ');
	console.log('starting stubbyDB');
	spawn(cmd[0], cmd.splice(1),{
		detached: true,
		stdio: 'ignore'
	});

	deasync.sleep(1000);

	console.log("Starting suit")
	testrunner.run(suit1.testData,protocol,options);
}


function stopStubbyDB(){
	console.log('stopping stubbyDB');
	exec('pkill -9 -f stubbydb', function(error, stdout, stderr) {
  		console.log(stdout);
	});
}