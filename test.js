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
    });

    // test for the HTML page
    it('Returns a HTML format', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Returns an index file with Foods', function (done) {
        request(app)
            .get('/')
            .expect(/foods/i, done);            // just match text that contains "foods"
    });

});


describe('Listing cities on /foods', function () {

    it('Returns 200 status code', function (done) {
        request(app)
            .get('/foods')
            .expect(200, done);         // instead of attaching .end(), just put callback to done()
    });

    it('Returns JSON format', function (done) {
        request(app)
            .get('/foods')
            .expect('Content-Type', /json/, done);
    });

    it('Returns initial foods', function (done) {
       request(app)
           .get('/foods')
           .expect(JSON.stringify(['Burger', 'Fries', 'Pizza']), done);
    });
});

// describe('')