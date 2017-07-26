var path = require('path');
var fs = require("fs");

var DataObject    = require('./DataObject');

/**
 * Returns current time in ISO format
 * 
 * @return {string} current time in iso string
 */
 function getTimeIso(){
  const date = new Date();
  var now_utc = new Date(date.getUTCFullYear(), 
                         date.getUTCMonth(), 
                         date.getUTCDate(),  
                         date.getUTCHours(), 
                         date.getUTCMinutes(), 
                         date.getUTCSeconds());
  return date.toISOString();
}


/**
 * Filters keys in an array of objects
 * 
 * @param {array} has to be an array of objects
 * @param {array} keys to include in the array of objects
 * @return {array} array of obj where obj contains keys in info array
 */
function filterKeysInArrayOfObjects(list, info){

  return list.map(function(dev){
    if (info === undefined) {
      return new DataObject(dev);
    }
    return new DataObject(dev).filterKeysFromObject(info);
  });
}

/**
 * Returns the json store as a javascript object
 * @return {object} 
 */
function getStoreJson(){
  var cachePath = path.join(require.main.filename, '..', 'cache.json');
  console.log(cachePath);
  var data = fs.readFileSync(cachePath); 
  return JSON.parse(data);
}

/**
 * Stores javascript object in a json file
 * @param {object} data 
 */
function storeJson(data){
  var cachePath = path.join(require.main.filename, '..', 'cache.json');
  console.log(cachePath);
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf8");
}



module.exports = {
  getTimeIso: getTimeIso,
  filterKeysInArrayOfObjects: filterKeysInArrayOfObjects,
  getStoreJson: getStoreJson,
  storeJson: storeJson
};

