#!/usr/bin/env node

var app           = require('commander');
var Configstore   = require('configstore');
var conf          = new Configstore('elephant');
var chalk         = require('chalk');
var api           = require('./lib/api');
var printSub      = require('./lib/printSub');
var DataObject    = require('./lib/DataObject');
var utils         = require('./lib/utils');

var cache         = utils.getStoreJson();



app
  .description('Get account subscription information')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .option('-a, --all', 'Print all subscription object properties')
  .parse(process.argv);

var promise;
if (typeof app.user === 'undefined'){
  promise = Promise.resolve({});
} else {
  if (typeof cache[app.user] === 'undefined') {
    promise = api.get(`/account/information?email=${app.user}`)
      .then(function(res){
        cache[app.user] = res.data.iUserID;
        utils.storeJson(cache);
        return Promise.resolve({headers: {userId: res.data.iUserID}})
      });
  } else {
    promise = Promise.resolve({headers: {userId: cache[app.user]}});
  }
}

promise
  .then(function(conf){
    if (conf){
      return api.get('/account/subscription', conf);
    } else {
      return api.get('/account/subscription');
    }
  })
  .then(function(res) {
    var sub = res.data;
    var keys; 
    if (!app.all){
      keys = ['subscriptionName', 'subscriptionDescriptor', 'maxFileLength', 'capacity', 'subscriptionState'];
    }
    console.log('\n' + chalk.yellow('=========================='));
    var sub = new DataObject(sub)
      .filterKeysFromObject(keys)
      .transformObjectToKeyValueArray();
    printSub(sub);
  })
  .catch(function (err) {
    if (err.response) {
      console.log(`${err.response.status} ${err.response.statusText}`);
      console.log(`${err.response.data.errorMessage}`);
    } else {
      console.log(`${err.message}`);
    }
  });