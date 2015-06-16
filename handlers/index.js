'use strict';

var mongojs = require('mongojs');
var helpers = require('../helpers');
var config = require('../config');
var db = mongojs(config.DB);
var seeds = db.collection('seeds');

function addSeed(request, reply) {
  seeds.save(request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getSeed(request, reply) {
  var id = mongojs.ObjectId(request.params.seedId);
  seeds.find({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function updateSeed(request, reply) {
  var id = mongojs.ObjectId(request.params.seedId);
  seeds.update({_id:id}, request.payload, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function deleteSeed(request, reply) {
  var id = mongojs.ObjectId(request.params.seedId);
  seeds.remove({_id: id}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function getSeeds(request, reply) {
  var skipNum = request.query.skip ? parseInt(request.query.skip, 10):0;
  var limitNum = request.query.limit ? parseInt(request.query.limit, 10):20;
  seeds.find({}).skip(skipNum).limit(limitNum, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

function searchSeeds(request, reply) {
  seeds.find({'$text':{'$search':request.params.searchText}}, function(err, data) {
    helpers.handleReply(err, data, request, reply);
  });
}

module.exports.addSeed = addSeed;

module.exports.getSeed = getSeed;

module.exports.updateSeed = updateSeed;

module.exports.deleteSeed = deleteSeed;

module.exports.getSeeds = getSeeds;

module.exports.searchSeeds = searchSeeds;