'use strict';

var mongojs = require('mongojs');
var wreck = require('supertest');
var server = require('../server');
var config = require('../config');
var session = require('./data/session.json');

wreck = wreck('http://localhost:' + config.SERVER_PORT);

describe('session', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('GET /session/s282ae81036927d699e70af106ef95c4c1e04a8401', function() {
    it('responds with json', function(done) {
      wreck
        .get('/session/s282ae81036927d699e70af106ef95c4c1e04a8401')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('DELETE /session/s282ae81036927d699e70af106ef95c4c1e04a8401', function() {
    it('responds with json', function(done) {
      wreck
        .delete('/session/s282ae81036927d699e70af106ef95c4c1e04a8401')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /session', function() {
    it('responds with json', function(done) {
      wreck
        .post('/session', session)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});