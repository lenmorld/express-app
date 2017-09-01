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
-w app.js is to have test running in background while watching file changes to app.js

  "scripts": {
    "test": "mocha -w app.js test.js"
  },

$ npm test

# alternative way of doing this
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



### shrinkwrap ###
everytime installing deps that will go into prod (not test/dev)

npm install --save body-parser
npm shrinkwrap


# install Redis for machine
sudo apt-get install redis-server

# run redis server
redis-server

# install node client
npm install hiredis redis --save
npm shrinkwrap


# some doc on Redis
https://www.npmjs.com/package/redis

# here, we use
client.hset(key, values)
client.hkeys(key, callback (error, names) { });


# conflict with tes, dev, and prod database
# must use different by select(dbNumber) , 0 is default, each dbNumber is different
# add this to package.json
"test": "NODE_ENV=test mocha -w app.js test.js"
# app.js  : prod db || dev db
client.select((process.env.NODE_DEV || 'development').length);

# flush DB of test, add this
var redis = request('redis');
var client= redis.createClient();
client.select('test'.length);               // specify test DB
client.flushdb();                           // flush this DB


# for prod
# -> need to test NODE_ENV
heroku config:add NODE_ENV=production
# install Redis on Heroku (google heroku install redistogo)
# -> have to add credit card on account to add addons Heroku
heroku addons:add redistogo


# troubleshooting #
heroku logs --tail


# to try heroku on local #
npm install
heroku local web


# EJS #
npm isntall ejs --save
npm shrinkwrap