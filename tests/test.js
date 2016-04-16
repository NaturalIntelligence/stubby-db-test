var exec = require('child_process').exec;
var testrunner = require("./testhelper");
var suit1 = require('./testsuit')
var path = require('path')
var deasync = require('deasync');

var testProjDir = path.resolve( __dirname + "/..");
var spawn = require('child_process').spawn;


//Build own configuration
//Remove logs file
run("stubbydb -d " + testProjDir + " -p 9999 --logs");
//check if logs file presents
//check if the size of exceptions.log is 0

//Build configuration from config.json and check if it runs on diffferent host
//Remove logs folder
run("stubbydb -d " + testProjDir + " -c config.json --host 127.0.0.1 --logs ");
//check if logs folder with logs file is created
//check if the size of exceptions.log is 0

//Build own configuration
run("stubbydb -d .. -p 9999 --logs");
//check if the size of exceptions.log is 0

//Build configuration from config.json
run("stubbydb -d .. -c config.json --logs");
//check if the size of exceptions.log is 0

stopStubbyDB();

function run(cmd){
	console.log('stopping stubbyDB');
	stopStubbyDB();
	deasync.sleep(500);
	console.log(cmd);
	cmd = cmd.split(' ');
	spawn(cmd[0], cmd.splice(1),{
		detached: true,
		stdio: 'ignore'
	});

	deasync.sleep(1000);

	console.log("Starting suit")
	testrunner.run(suit1.testData);
}


function stopStubbyDB(){
	exec('pkill -9 -f stubbydb', function(error, stdout, stderr) {
  		console.log(stdout);
	});
}