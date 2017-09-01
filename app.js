/**
 * Created by lenny on 8/31/2017.
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');    // body-parser needed to be able to do request.body
var urlencoded = bodyParser.urlencoded({ extended: false });


app.use(express.static('public'));

var foods = {
    'banana': 'yellow and long',
    'fries': 'Greasy and crispy',
    'bbq': 'Grilled and spicy'
};

app.get('/', function (request, response) {
    response.send("Hello world");
    // throw 'Error';
});

app.get('/foods', function (request, response) {
    // response.json(foods);            // only if foods is a plain list ['banana', 'fries', 'bbq']
    response.json(Object.keys(foods));
});

app.post('/foods', urlencoded, function (request, response) {      // post needs bodyParser.urlencoded

    var newFood = request.body;
    foods[newFood] = newFood.description;

    response.status(201)
        .json(newFood.name);
});



// for test this is necessary

// # MOVED TO bin/www
// app.listen(3000, function () {
//     console.log("Server running");
// });


// we need a separate file that binds our code to the network
module.exports = app;               // now our app is encapsulated inside a node module