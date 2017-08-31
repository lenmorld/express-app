TDD using mocha



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


to have test running in background watch file changes to run
./node_modules/mocha/bin/mocha -w app.js test.js



curl -i http://localhost:3000/foods


Etags explained

lenmor@linux-HP:~/Desktop/MEAN/express-app$ curl -i http://localhost:3000/foods

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 26
ETag: W/"1a-g3148ujT6sWf/YwMJWEsY2lcuFg"                <------ ETag is the Entity Tag response header
Date: Thu, 31 Aug 2017 19:33:26 GMT
Connection: keep-alive

["Burger","Fries","Pizza"]


ETag is a hash of the representation of the response body
smart clients like jQuery will read this value from responses
and the next time it requests to same endpoint
it will send the value of Etag along with request in the
If-None-Match request header

Server compares Etag from client and Etag it generates
if it matches, it sends back 304 status code,
response body is empty
response is then sent back faster
hey cleint: "last time you sent request, content is still the same.
            look at your own cache and show that to the user"




