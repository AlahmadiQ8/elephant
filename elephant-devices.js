#!/usr/bin/env node

var path          = require('path');

var app           = require('commander');
var Configstore   = require('configstore');
var conf          = new Configstore('elephant');
var wrap          = require('wordwrap')(80);
var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var api           = require('./lib/api');
var utils         = require('./lib/utils');
var printDevice   = require('./lib/printDevice');

var cache         = utils.getStoreJson();

app
  .description('Get all devices')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .option('-a, --all', 'Print all device properties')
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
      return api.get('/devices', conf);
    } else {
      return api.get('/devices');
    }
  })
  .then(function(res){
    var devices = res.data;
    var keys; 
    if (!app.all){
      keys = ['deviceName', 'operatingSystem', 'lastConnected', 'version', 'shares'];
    }
    console.log('\n' + chalk.yellow('=========================='));
    utils.filterKeysInArrayOfObjects(devices, keys)
    .map(function (obj) { 
      return obj.transformObjectToKeyValueArray()
    })
    .forEach(printDevice);
  })
  .catch(function (err) {
    if (err.response) {
      console.log(`${err.response.status} ${err.response.statusText}`);
      console.log(`${err.response.data.errorMessage}`);
    } else {
      console.log(`${err.message}`);
    }
  });