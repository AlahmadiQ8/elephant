#!/usr/bin/env node

var app = require('commander');
var Configstore = require('configstore');
var conf = new Configstore('elephant');
var wrap = require('wordwrap')(80);
var api = require('./lib/api');

app
  .description('Get all devices')
  .option('-u, --user [user]', 'Specify target user (only if you are an admin)')
  .parse(process.argv);



var conf;
if (app.user !== undefined){
  conf = {headers: {userId: app.user}};
}

api.get('/devices', conf)
  .then(function(res){
    console.log(res)
  })
  .catch(function (err) {
    if (err.response) {
      console.log(`${err.response.status} ${err.response.statusText}`);
      console.log(`${err.response.data.errorMessage}`);
    } else {
      console.log(`${err.message}`);
    }
  });