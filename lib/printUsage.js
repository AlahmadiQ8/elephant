var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var filesize      = require('filesize');

function printUsage(usage) {
  usage.map(function(obj, index) {
    switch(obj.key) {
      case 'activeSize':
        obj.value = filesize(Number(obj.value));
        break;
      case 'versionSize':
        obj.value = filesize(Number(obj.value));
        break;
      case 'archivedSize':
        obj.value = filesize(Number(obj.value));
        break;
      case 'trashSize':
        obj.value = filesize(Number(obj.value));
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

  console.log('\n' + chalk.underline.cyan('Usage'));
  console.log(columnify(usage, options))

}

module.exports = printUsage;