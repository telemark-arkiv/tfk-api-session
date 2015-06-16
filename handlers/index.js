'use strict';

var mongojs = require('mongojs');
var helpers = require('../helpers');
var config = require('../config');
var db = mongojs(config.DB);
var session = db.collection('session');

function addSession(request, reply) {
  var payload = request.payload;
  payload.createdAt = new Date();
  session.save(request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getSession(request, reply) {
  var id = request.params.sessionId;
  session.find({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function deleteSession(request, reply) {
  var id = request.params.sessionId;
  session.remove({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

module.exports.addSession = addSession;

module.exports.getSession = getSession;

module.exports.deleteSession = deleteSession;