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
var printDevice   = require('./lib/printDevice');
var inquirer      = require('inquirer');
var _             = require('lodash');
var deviceConfig  = require('./lib/deviceConfig');

app
  .description('Get specific device configs')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .parse(process.argv);



var conf;
if (app.user !== undefined){
  conf = {headers: {userId: app.user}};
}

var options = {
  showHeaders: false,
  // truncate: true,
  preserveNewLines: true,
  config: {
    key: {minWidth: 30}
  }
}

var devices = [];

api.get('/devices', conf)
  .then(function(res){
    devices = res.data;
    var choices = devices.map(function(val){
      return val.deviceName;
    });
    var question = [
      {
        type: 'list',
        name: 'device',
        device: 'email',
        message: 'Select a device',
        choices: choices
      },
    ];
    return inquirer.prompt(question)
  }).then(function(answer){
    device = _.find(devices, {deviceName: answer.device});
    return api.get(`/devices/backupconfiguration/${device.deviceId}`, conf);
  }).then(function(res){
    data = deviceConfig.processBackupConfiguration(res.data);
    console.log('\n' + chalk.yellow('=========================='));
    console.log('\n' + chalk.underline.yellow('Device Settings'));
    console.log(columnify(data.deviceConfig, options));
    data.backupConfigs.map(function (obj) { 
      return obj.transformObjectToKeyValueArray();
    }).forEach(function(obj){
      options = {
        showHeaders: false,
        truncate: true,
        preserveNewLines: true,
        config: {
          key: {minWidth: 30}
        }
      }
      console.log('\n' + chalk.underline.cyan(obj[0].value));
      delete obj[0];
      console.log(columnify(obj, options))
    })
  })
  .catch(function (err) {
    if (err.response) {
      console.log(`${err.response.status} ${err.response.statusText}`);
      console.log(`${err.response.data.errorMessage}`);
    } else {
      console.log(`${err.message}`);
      console.error(err.stack);
    }
  });