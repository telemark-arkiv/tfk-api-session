'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var seeds = db.collection('seeds');
var seedsDocument = require('./test/data/seed.json');
var textIndexFields = {
  'name': 'text',
  'address': 'text',
  'city': 'text'
};

seedsDocument._id = mongojs.ObjectId(seedsDocument._id);

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

function addDocument(options, callback) {
  var collection = db.collection(options.collection);

  collection.insert(options.document, function(err, data){
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
}

db.createCollection('seeds', handleCallback);

seeds.ensureIndex(textIndexFields, {"default_language": "nb"}, function(err, data){
  if (err) {
    console.error(err);
  } else {
    console.log(data)
  }
});

addDocument({collection:'seeds', document:seedsDocument}, handleCallback);