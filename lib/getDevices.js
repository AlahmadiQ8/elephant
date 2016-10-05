var Configstore = require('configstore')
var api = require('./api');

/**
 * Gets devices for a particular user
 * 
 * @param {string} optional, if set, then userId is set in the header
 * @return {promise} axios promise
 */
function getDevices(userId){
  var conf;
  if (userId !== 'undefined'){
    conf = {headers: {userId: userId}};
  }
  api.get('/devices', conf)
}