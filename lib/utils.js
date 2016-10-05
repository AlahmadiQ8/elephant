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

module.exports = {
  extend: extend,
  getTimeIso: getTimeIso
};

