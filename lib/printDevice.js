var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');


function printDevice(dev){
  deviceName = dev[0].value;
  
  // if lastConnected is present, then transforme it into moment "since" formate
  var deviceNameIndex;
  dev.map(function(obj, index){
    switch(obj.key) {
      case 'deviceName':     
        deviceNameIndex = index;
        break;
      case 'lastConnected':
        obj.value = moment(obj.value).fromNow();
        break;
    }
    return obj; 
  })
  dev.splice(deviceNameIndex, 1);

  options = {
    showHeaders: false,
    truncate: true,
    config: {
      key: {minWidth: 20}
    }
  }
  
  console.log('\n' + chalk.underline.cyan(deviceName));
  console.log(columnify(dev, options))
}

module.exports = printDevice;