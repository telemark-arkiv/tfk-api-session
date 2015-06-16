'use strict';

var mongojs = require('mongojs');
var wreck = require('supertest');
var server = require('../server');
var config = require('../config');
var seed = require('./data/seed.json');

seed._id = mongojs.ObjectId(seed._id);

wreck = wreck('http://localhost:' + config.SERVER_PORT);

describe('seeds', function() {

  before(function() {
    server.start();
  });

  after(function() {
    server.stop();
  });

  describe('GET /seeds', function() {
    it('responds with json', function(done) {
      wreck
        .get('/seeds')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /seeds/search/Langesund', function() {
    it('responds with json', function(done) {
      wreck
        .get('/seeds/search/Langesund')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /seed/5513ebbd532ca528dec30c76', function() {
    it('responds with json', function(done) {
      wreck
        .get('/seed/5513ebbd532ca528dec30c76')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('DELETE /seed/5513ebbd532ca528dec30c76', function() {
    it('responds with json', function(done) {
      wreck
        .delete('/seed/5513ebbd532ca528dec30c76')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /seeds', function() {
    it('responds with json', function(done) {
      wreck
        .post('/seeds', seed)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('PUT /seed/5513ebbd532ca528dec30c76', function() {
    it('responds with json', function(done) {
      wreck
        .put('/seed/5513ebbd532ca528dec30c76', seed)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});