'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var session = db.collection('session');
var sessionDocument = require('./test/data/session.json');

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

db.createCollection('session', handleCallback);

addDocument({collection:'session', document:sessionDocument}, handleCallback);