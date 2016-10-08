var chalk = require('chalk');
var columnify = require('columnify');
var moment = require('moment');
var utils = require('./lib/utils');


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

function DataObject(content) {
  utils.extend(this, content);
}
DataObject.prototype.filterKeysFromObject = filterKeysFromObject;
DataObject.prototype.transformObjectToKeyValueArray = transformObjectToKeyValueArray;

function filterKeysFromObject(info){
  Object.keys(this).filter( v => {
    return info.indexOf(v)==-1;
  }).forEach( v => {
    delete this[v];
  });
  return this
}

function transformObjectToKeyValueArray(){
  var transformed = [];
  for (var info in this) {
    if (this.hasOwnProperty(info)) {
      transformed.push({key: info, value: this[info]});
    }
  };
  return transformed;
}


var data = new DataObject(account)
  .filterKeysFromObject(filt)
  .transformObjectToKeyValueArray();

// utils.filterKeysFromObject.call(account, filt)


// .map(transformObjectToKeyValueArray)
// .map(printDevice)

console.log(data);


