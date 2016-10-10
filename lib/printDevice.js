var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var DataObject    = require('./DataObject');


function printDevice(dev){
  deviceName = dev[0].value;
  
  // if lastConnected is present, then transforme it into moment "since" formate
  var deviceNameIndex;
  var sharesIndex;
  var sharesObject;
  dev.map(function(obj, index, arr){
    switch(obj.key) {
      case 'deviceName':     
        deviceNameIndex = index;
        break;
      case 'lastConnected':
        obj.value = moment(obj.value).fromNow();
        break;
      case 'shares': 
        sharesIndex = index;
        if (Object.keys(obj.value).length === 0) {
          break;
        }
        var shares = new DataObject(obj.value)
          .transformObjectToKeyValueArray()
          .map(function(v,i){
            return {'key':   chalk.gray('- '+v.key), 
                    'value': chalk.gray(v.value)
              };
          });
        obj.value = columnify(shares, {showHeaders: false}); 
        obj.value = null;
        // obj.key = chalk.gray(obj.key);
        sharesObject = shares;
        break;
    }
    return obj; 
  })

  if (sharesObject===undefined){
    dev.splice(sharesIndex, 1);  
  } else {
    var args = [sharesIndex+1, 0].concat(sharesObject);
    Array.prototype.splice.apply(dev, args);
  }
  dev.splice(deviceNameIndex, 1);

  var options = {
    showHeaders: false,
    // truncate: true,
    preserveNewLines: true,
    config: {
      key: {minWidth: 30}
    }
  }
  
  console.log('\n' + chalk.underline.cyan(deviceName));
  console.log(columnify(dev, options))
}

module.exports = printDevice;