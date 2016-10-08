var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var filesize      = require('filesize');

function printSub(sub) {
  sub.map(function(obj, index) {
    switch(obj.key) {
      case 'maxFileLength':
        obj.value = filesize(obj.value);
        break;
      case 'capacity':
        obj.value = filesize(Number(obj.value)*1048576);
        break;
    }
    return obj;
  }) 

  var options = {
    showHeaders: false,
    truncate: true,
    config: {
      key: {minWidth: 30}
    }
  }

  console.log('\n' + chalk.underline.cyan('Subscription'));
  console.log(columnify(sub, options))

}

module.exports = printSub;