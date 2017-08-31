/**
 * Created by lenny on 8/31/2017.
 */

// npm install supertest --save-dev         // adds it to the devDependencies

var request = require('supertest');
var app = require('./app');

describe('Requests to the root path', function () {

    it('Returns a 200 status code', function (done) {

        request(app)
            .get('/')
            .expect(200)
            .end(function(error) {
                if(error) throw error;
                console.log('Done');
                done();                 // have to let mocha know test is done
            });
    })

});