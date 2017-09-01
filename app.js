/**
 * Created by lenny on 8/31/2017.
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');    // body-parser needed to be able to do request.body
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// ### REDIS connection ###
var redis = require('redis');
var client;

if (process.env.REDISTOGO_URL) {        // heroku redis, https://devcenter.heroku.com/articles/redistogo
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);

    // no select for prod

} else {
    client = redis.createClient();
    client.select((process.env.NODE_ENV || 'development').length);      // set NODE_DEV in package.json test
}
console.log("PROD NODE_ENV: ", process.env.NODE_ENV);

// run only once, because this is saved on Redis db
// client.hset('foods', 'banana', 'yellow and long' );     // hashset: key, value1, value2, ...
// client.hset('foods', 'fries', 'greasy and crispy' );
// client.hset('foods', 'bbq', 'Grilled and spicy' );

// end Redis connection

// var foods = {
//     'banana': 'yellow and long',
//     'fries': 'Greasy and crispy',
//     'bbq': 'Grilled and spicy'
// };

app.get('/', function (request, response) {
    response.send("Hello world");
    // throw 'Error';
});

app.get('/foods', function (request, response) {
    // response.json(foods);                    // if foods is a plain list ['banana', 'fries', 'bbq']
    // response.json(Object.keys(foods));       // if foods is JSON object foods = { 'banana': 'yellow and long', ... }
    client.hkeys('foods', function (error, names) {
        response.json(names);
    });
});

app.post('/foods', parseUrlEncoded, function (request, response) {      // post needs bodyParser.urlencoded
    var newFood = request.body;

    if (!newFood.name || !newFood.description) {
        response.sendStatus(400);
        return false;
    }

    // console.log(newFood);

    client.hset('foods', newFood.name, newFood.description, function (error) {
        if(error) throw error;

        response.status(201)
            .json(newFood.name);
    });

    // foods[newFood] = newFood.description;        // if foods is JSON object
});


// for test this is necessary

// # MOVED TO bin/www
// app.listen(3000, function () {
//     console.log("Server running");
// });

// we need a separate file that binds our code to the network
module.exports = app;               // now our app is encapsulated inside a node module