
function DataObject(content) {
  extend(this, content);
}

DataObject.prototype.filterKeysFromObject = filterKeysFromObject;
DataObject.prototype.transformObjectToKeyValueArray = transformObjectToKeyValueArray;

/**
 * Filters keys in an object. Will only work on shallow object
 * 
 * @param {array} keys to include in the array of objects. other keys will be filtered
 * @return {object} where obj contains ONLY keys in info array
 */
function filterKeysFromObject(info){
  if (info===undefined){
    return this;
  }
  Object.keys(this).filter( v => {
    return info.indexOf(v)==-1;
  }).forEach( v => {
    delete this[v];
  });
  return this
}

/**
 * Transform object into a list of {key: property, value: value of property}
 * 
 * @return {array} of {key: property, value: value of property}
 */
function transformObjectToKeyValueArray(){
  var transformed = [];
  for (var info in this) {
    if (this.hasOwnProperty(info)) {
      transformed.push({key: info, value: this[info]});
    }
  };
  return transformed;
}

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
  Object.keys(b).forEach(function assignValue(key) {
    if (thisArg && typeof b[key] === 'function') {
      a[key] = bind(b[key], thisArg);
    } else {
      a[key] = b[key];
    }
  });
  return a;
}


module.exports = DataObject;