/**
 * Created by lenny on 8/31/2017.
 */

var express = require('express');
var app = express();

app.get('/', function (request, response) {
    response.send("Hello world");
    // throw 'Error';
});

// for test this is necessary


// # MOVED TO bin/www
// app.listen(3000, function () {
//     console.log("Server running");
// });


// we need a separate file that binds our code to the network
module.exports = app;               // now our app is encapsulated inside a node module