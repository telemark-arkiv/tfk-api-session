'use strict';

var handlers = require('../handlers');
var routes = [
  {
    method: 'POST',
    path: '/session',
    handler: handlers.addSession
  },
  {
    method: 'GET',
    path: '/session/{sessionId}',
    handler: handlers.getSession
  },
  {
    method: 'DELETE',
    path: '/session/{sessionId}',
    handler: handlers.deleteSession
  }
];

module.exports = routes;