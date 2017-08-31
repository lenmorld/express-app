/**
 * Created by lenny on 8/31/2017.
 */

var express = require('express');
var app = express();

app.get('/', function (request, response) {
    response.send("Hello world");
});

app.listen(3000, function () {
    console.log("Server running");
});