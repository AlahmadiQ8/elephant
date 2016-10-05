var crypto = require('crypto');
var Configstore = require('configstore')
var conf = new Configstore('elephant')
var axios = require('axios');

var api = axios.create({
  baseURL: conf.get('baseUrl'),
  responseType: 'json'
});


/**
 * Converts string to Bytes
 * http://stackoverflow.com/a/14603254/5431968
 * @param {string} str 
 */
function convertToBytes(str){
    var result = '';
    byteLength = 2;
    while (str.length >= byteLength) { 
        result += parseInt(str.substring(0, byteLength), 16);
        str = str.substring(byteLength, str.length);
    }
    return result;
}


/**
 * Creates a password hash in bytes
 * @param {string} password 
 */
function createPasswordHashBytes(password) {
    var pwdmd5 = crypto.createHash('md5').update(password).digest('hex');
    return convertToBytes(pwdmd5);
}


/**
 * Gets Sesstion ID
 * @return {object} request promise using axios library
 */
function getSessionId(apiKey, email, pwdhash) {
  if (pwdhash === null || email === null){
    throw new Error("No password hash or email found in configstore. Please authenticate")
  }
  if (apiKey === null){
    throw new Error("No api key found in configstore. Please authenticate")
  }

  const endpoint = '/account/session';
  const date = new Date();
  var now_utc = new Date(date.getUTCFullYear(), 
                         date.getUTCMonth(), 
                         date.getUTCDate(),  
                         date.getUTCHours(), 
                         date.getUTCMinutes(), 
                         date.getUTCSeconds());
  var dateIso = date.toISOString();
  hash_key = apiKey + "|" + 'GET' + "|" + endpoint + '|' + dateIso;
  var hashed = crypto.createHmac('sha1', pwdhash).update(hash_key).digest('base64')
  var hashMac = apiKey + ":" + email + ":" + hashed;

  return api.get(endpoint, {
    headers: { 
      'Authorization' : "hmac " + hashMac,
      'date-iso' : dateIso,
    },
  });
}


module.exports = {
  createPasswordHashBytes: createPasswordHashBytes,
  getSessionId: getSessionId,
}