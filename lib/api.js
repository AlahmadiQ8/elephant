var axios = require('axios');
var utils = require('./utils');
var Configstore = require('configstore');
var conf = new Configstore('elephant');
var auth = require('./auth');

var api = axios.create({
  baseURL: conf.get('baseUrl'),
  responseType: 'json'
});

api.defaults.headers.common['Authorization'] = conf.get('sessionId');
api.defaults.headers.common['Date-iso'] = utils.getTimeIso();
api.defaults.headers.post['Content-Type'] = 'application/json';


/**
 * Interceptor function to refresh sessionId if it expires
 * when 401 or 400 is returned from the service
 */
function retry400FailedReq(err) {
  if (err.response) {
    if ((err.response.status != 401 && err.response.status != 400) || err.response.data.errorMessage == 'AUTH_CODE_USER_NOT_FOUND'){
      return Promise.reject(err); 
    } 
  }
  // console.log(err.response.data.errorMessage)
  // console.log(err.response.status);
  
  return auth.getSessionId(conf.get('apiKey'), conf.get('email'), conf.get('passwordHash'))
    .then(function(res){
      conf.set('sessionId', res.data.sessionId);
      return Promise.resolve(conf.get('sessionId'));
    })
    .then(function(sessionId){
      // now retry the original request
      if (err.config && !err.config.__isRetryRequest) {
        console.log('Session expired. Renewing sessionId...');
        err.config.headers['Authorization'] = sessionId;
        err.config.__isRetryRequest = true;
        return api(err.config);
      }
      return Promise.reject(err); 
    })
    .catch(function (error) {
      if (error.response) {
        console.log(`${error.response.status} ${error.response.statusText}`);
        console.log(`${error.response.data.errorMessage}`);
      } else {
        console.log(`${error.message}`);
      }
    });

  console.log('Unhandled error!');
}

api.interceptors.response.use(undefined, retry400FailedReq);


module.exports = api;