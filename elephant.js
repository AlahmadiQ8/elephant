#!/usr/bin/env node

var app = require('commander');
var pkg = require('./package.json');


app.version(pkg.version)
  .command('auth', 'Authenticate Account')
  .command('devices', 'Get all devices');

app.parse(process.argv);








