# stubby-db-test
This is the demo repository to test stubby-db features

### Steps
1. Install stubby-db from git URL (use http url instead of ssh url)

		npm install https://github.com/NaturalIntelligence/StubbyDB.git -g

	It'll automatically install the latest version of stubby-db with all required dependencies. However you can also install particular version using following command;
	
		npm install https://github.com/NaturalIntelligence/StubbyDB.git#1.0.0 -g
	
	git maintains the npm package history.

	To install it from NPM package manager

		npm install stubby-db -g
	
	**Note**: You may have to run above commands with sudo access.

2. Clone this repository to some folder (stubby-db-test) and mention the path in below command

		stubbydb -d stubby-db-test -p 9999

	or just open this repository in shell window and run following command.

		stubbydb
	
	For any help

		stubbydb --help

3. Now since everything is setup and stubbydb is started, open this repository in another shell window and use following command to test it.

		node tests/test.js
