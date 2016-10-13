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

module.exports = {
  extend: extend
}