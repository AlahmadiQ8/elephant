#!/usr/bin/env node

var app           = require('commander');
var Configstore   = require('configstore');
var conf          = new Configstore('elephant');
var wrap          = require('wordwrap')(80);
var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var api           = require('./lib/api');
var utils         = require('./lib/utils');
var printSub      = require('./lib/printSub');
var DataObject    = require('./lib/DataObject');

app
  .description('Get account subscription information')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .option('-a, --all', 'Print all device properties')
  .parse(process.argv);

var conf;
if (app.user !== undefined){
  conf = {headers: {userId: app.user}};
}

api.get('/account/subscription', conf)
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