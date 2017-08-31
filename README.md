In UBuntu/Debian, symlink nodejs -> node to avoid errors
/usr/share/doc/nodejs/README.Debian
sudo ln -s /usr/bin/nodejs /usr/bin/node

during dev
- instead of node app.js
-> ./bin/www


to run test
node test.js

// npm install supertest --save-dev         // testing HTTP
// npm install mocha --save-dev             // JS test framework

with mocha
./node_modules/mocha/bin/mocha test.js




to simplify, add this to package.json

  "scripts": {
    "test": "mocha test.js"
  },

$ npm test

