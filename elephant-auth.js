var app = require('commander');
var inquirer = require('inquirer');
var request = require('request');
var Configstore = require('configstore');
var conf = new Configstore('elephant');
var wrap = require('wordwrap')(80);
var auth = require('./lib/auth');


app
  .description('Authenticate User Account')
  .option('-e, --env [env]', 'Select environment: QA, STG, LIVE [QA]', /^(QA|STG|LIVE)$/i, 'QA')
  .parse(process.argv);


var questions = [
  {
    name: 'email',
    message: 'Email',
    validate: function(input) {
      var re = /\S+@\S+\.\S+/;
      return re.test(input) || 'Enter a valid email address';
    },
    filter: function(input) {
      return input.trim();
    }
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password',
    validate: function(input) {
      return input.length > 0;
    }
  },
  {
    name: 'apiKey',
    message: 'API Key',
    validate: function(input) {
      return input.length > 0;
    }
  }
];

console.log('Contact Support to get an API Key');

switch (app.env.toLowerCase()) {
  case 'qa':
    conf.set('baseUrl', 'https://qa-rest.elephantdrive.com');
    break;
  case 'stg':
    conf.set('baseUrl', 'https://stg-rest.elephantdrive.com');
    break;
  case 'live':
    conf.set('baseUrl', 'https://rest.elephantdrive.com');
}

var loginAttemp = {};

inquirer.prompt(questions).then(function (answers) {
  loginAttemp = answers;
  return auth.getSessionId(answers.apiKey, answers.email, auth.createPasswordHashBytes(String(answers.password)));
})
.then(function(res){
  conf.set('email', loginAttemp.email);
  conf.set('passwordHash', auth.createPasswordHashBytes(String(loginAttemp.password)));
  conf.set('apiKey', loginAttemp.apiKey);
  conf.set('sessionId', res.data.sessionId);
  console.log(`The account ${loginAttemp.email} has been successfully authenticated`);
})
.catch(function (err) {
  if (err.response) {
    console.log(`${err.response.status} ${err.response.statusText}`);
  } else {
    console.log(`${err.message}`);
  }
});