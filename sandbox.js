var axios = require('axios');

axios.defaults.headers.common['Authorization'] = 'TESTING';

console.log(axios.defaults.headers)

axios.get('https://rest.elephantdrive.com/service/ping', {
  headers: {'love': 'testing'}
}).then(function(res){
  console.log(res);
}).catch(function(err){
  console.log(err.config);
})