/**
 * Extends object a by mutably adding to it the properties of object b.
 * Source: https://github.com/mzabriskie/axios/blob/master/lib/utils.js
 * 
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}


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
  if (info === undefined) {
    return list;
  }
  return list.map(function(dev, index){
    Object.keys(dev).filter(function (v) {
        return info.indexOf(v)==-1;
    }).forEach(function (v) {
        delete dev[v];
    });
    return dev; 
  });
}


/**
 * Transform object into a list of {key: property, value: value of property}
 * 
 * @param {object} must be shallow. no nested objects
 * @return {array} of {key: property, value: value of property}
 */
function transformObjectToKeyValueArray(obj){
  var transformed = [];
  for (var info in obj) {
    if (obj.hasOwnProperty(info)) {
      transformed.push({key: info, value: obj[info]});
    }
  };
  return transformed;
}



module.exports = {
  extend: extend,
  getTimeIso: getTimeIso,
  filterKeysInArrayOfObjects: filterKeysInArrayOfObjects,
  transformObjectToKeyValueArray: transformObjectToKeyValueArray
};

