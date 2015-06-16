'use strict';

var xmlify = require('xmlify');

function handleReply(err, data, request, reply) {
  if (err) {
    if (request.query.format === 'xml') {
      reply(xmlify(err)).type('application/xml');
    } else {
      reply(err);
    }
  } else {
    if (request.query.format === 'xml') {
      reply(xmlify(data)).type('application/xml');
    } else {
      reply(data);
    }
  }
}

module.exports.handleReply = handleReply;