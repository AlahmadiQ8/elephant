#!/usr/bin/env node

var app           = require('commander');
var Configstore   = require('configstore');
var conf          = new Configstore('elephant');
var chalk         = require('chalk');
var api           = require('./lib/api');
var printUsage    = require('./lib/printUsage');
var DataObject    = require('./lib/DataObject');
var utils         = require('./lib/utils');

var cache         = utils.getStoreJson();

app
  .description('Get account storage usage')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .option('-a, --all', 'Print all usage object properties')
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
      return api.get('/account/usage', conf);
    } else {
      return api.get('/account/usage');
    }
  })
  .then(function(res) {
    var usage = res.data;
    var keys; 
    if (!app.all){
      keys = ['activeSize', 'versionSize', 'archivedSize', 'trashSize'];
    }
    console.log('\n' + chalk.yellow('=========================='));
    var usage = new DataObject(usage)
      .filterKeysFromObject(keys)
      .transformObjectToKeyValueArray();
    printUsage(usage);
  })
  .catch(function (err) {
    if (err.response) {
      console.log(`${err.response.status} ${err.response.statusText}`);
      console.log(`${err.response.data.errorMessage}`);
    } else {
      console.log(`${err.message}`);
    }
  });