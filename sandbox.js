var chalk = require('chalk');
var columnify = require('columnify');
var moment = require('moment');
// var utils = require('./lib/utils');
var DataObject    = require('./lib/DataObject');
var printSubscription    = require('./lib/printSubscription');


var account = {
  "subscriptionStateID": 100,
  "subsciptionID": 1134,
  "subscriptionName": "Business Pro - 50 GB",
  "subscriptionDescriptor": "NTGR - Pre-Paid",
  "maxFileLength": 5368709120,
  "capacity": 51200,
  "seatlicenses": 0,
  "maximumumDevices": 1,
  "subscriptionState": "Active",
  "onDemand": false,
  "unlimitedStorage": false
}

var filt = ['subscriptionName', 'subscriptionDescriptor', 'maxFileLength', 'capacity', 'subscriptionState'];


var data = new DataObject(account)
  .filterKeysFromObject(filt)
  .transformObjectToKeyValueArray();



// .map(transformObjectToKeyValueArray)
// .map(printDevice)
console.log('\n' + chalk.yellow('=========================='));
printSubscription(data);


