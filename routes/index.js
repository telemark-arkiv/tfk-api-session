'use strict';

var handlers = require('../handlers');
var routes = [
  {
    method: 'GET',
    path: '/seeds',
    handler: handlers.getSeeds
  },
  {
    method: 'POST',
    path: '/seeds',
    handler: handlers.addSeed
  },
  {
    method: 'GET',
    path: '/seeds/search/{searchText}',
    handler: handlers.searchSeeds
  },
  {
    method: 'GET',
    path: '/seed/{seedId}',
    handler: handlers.getSeed
  },
  {
    method: 'PUT',
    path: '/seed/{seedId}',
    handler: handlers.updateSeed
  },
  {
    method: 'DELETE',
    path: '/seed/{seedId}',
    handler: handlers.deleteSeed
  }
];

module.exports = routes;