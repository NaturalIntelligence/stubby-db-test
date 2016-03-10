# stubby-db-test
This is the test repository to test stubby-db features

# Steps
1. Install stubby-db from git URL (use http url instead of ssh url)

```bash
npm install https://github.com/NaturalIntelligence/StubbyDB.git --save
```

It'll automatically install the latest version of stubby-db with all required dependencies. However you can also install particular version using following command;

```bash
npm install https://github.com/NaturalIntelligence/StubbyDB.git#1.0.0 --save
```

git maintains the npm package history.

Check index.js and config.json for how to use stubby-db.

2. Start the server

node index.js

3. Open the same repository in another shell window and use following command to test it.

node tests/test.js
