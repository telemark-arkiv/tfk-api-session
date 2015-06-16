'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var session = db.collection('session');
var sessionDocument = require('./test/data/session.json');
var jobsDone = 0;
var jobsToDo = 2;

sessionDocument.createdAt = new Date();

function areWeDoneYet() {
  jobsDone++;
  if (jobsDone === jobsToDo) {
    console.log('Everything\'s shiny, Cap\'n. Not to fret.');
    process.exit(0);
  }
}

function handleCallback(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
  areWeDoneYet();
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

session.createIndex({'createdAt': 1}, {'expireAfterSeconds': config.EXPIRE_AFTER_SECONDS}, function(error, data) {
  if (error) {
    console.error(error);
  } else {
    console.log('Index OK for createdAt');
    console.log('ttl: ' + config.EXPIRE_AFTER_SECONDS);
    console.log(data);
    areWeDoneYet();
  }
});

addDocument({collection:'session', document:sessionDocument}, handleCallback);