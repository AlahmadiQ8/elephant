var app = require('commander')
var inquirer = require('inquirer')
var request = require('request')
var Configstore = require('configstore')
var conf = new Configstore('elephant')
var wrap = require('wordwrap')(80)


app
  .description('Authenticate User Account')
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
  },
  {
    name: 'apiKey',
    message: 'API Key'
  }
];

console.log('Contact Support to get an API Key');

inquirer.prompt(questions).then(function (answers) {
  console.log('successfully reached here');
  console.log(answers.email);
  console.log(answers.password);
  console.log(answers.apiKey);
})