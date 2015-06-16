'use strict';

var mongojs = require('mongojs');
var config = require('./config');
var db = mongojs(config.DB);
var session = db.collection('session');
var sessionDocument = require('./test/data/session.json');
var jobsDone = 0;
var jobsToDo = 2;

sessionDocument.timestamp = new Date().getTime();

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

session.ensureIndex({'timestamp': 1}, function(error, data){
  if (error) {
    console.error(error);
  } else {
    console.log('Index OK for timestamp');
    console.log(data);
    areWeDoneYet();
  }
});

addDocument({collection:'session', document:sessionDocument}, handleCallback);