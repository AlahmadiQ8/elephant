#!/usr/bin/env node

var app = require('commander');
var pkg = require('./package.json');


app.version(pkg.version)
  .command('auth', 'Authenticate Account')
  .command('devices', 'Get all devices')
  .command('sub', 'Get account subscription information');

app.parse(process.argv);








