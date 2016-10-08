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



module.exports = {
  getTimeIso: getTimeIso,
  filterKeysInArrayOfObjects: filterKeysInArrayOfObjects,
};

