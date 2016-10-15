var chalk         = require('chalk');
var columnify     = require('columnify');
var moment        = require('moment');
var DataObject    = require('./DataObject');
var extend        = require('./misc').extend;


/**
 * An object for the scheduled code number mapping
 * i.e, if the returned scheduleType from the service is 3, 
 * then, the it will be scheduledType[3] = 'Monthly'
 *
 */
var scheduledType = [
         'Continuous',
         'Daily',
         'Weekly',
         'Monthly',
         'DailyContinuous',
         'WeeklyContinuous',
         'MonthlyContinuous',
         'OneTime',
         'Invalid'
];


/**
 * returns a list of path directories given a brs array
 * visit https://qa-rest.elephantdrive.com/documentation/json_BackupConfiguration.html
 * for more information
 * 
 * @param {array} brs array returned from the REST services
 * @param {string} Specify which paths you want to get: [included | excluded]
 * @return {object} Object where each key is a formated path and the value is undefined
 */
function getPaths(rs, path){
  var which;
  if (path=='included'){
    which = {predicate: 5, verb: 1};
  } else {
    which = {predicate: 5, verb: 0};
  }
  paths = {}
  rs.filter(function(value){
    return value['predicate']==which.predicate 
           && value['verb']==which.verb;;
    }).forEach(function(value){
      paths[chalk.gray('- '+value.path)] = undefined; 
    });
  return paths; 
}


/**
 * returns a string of comma separated file extensions given a brs array
 * visit https://qa-rest.elephantdrive.com/documentation/json_BackupConfiguration.html
 * for more information
 * 
 * @param {array} brs array returned from the REST services
 * @param {string} Specify which exts you want to get: [included | excluded]
 * @return {string} a string of comma separated file extensions
 */
function getExts(rs, ext){
  var which;
  if (ext=='included'){
    which = {predicate: 0, verb: 1};
  } else {
    which = {predicate: 0, verb: 0};
  }
  exts = [];
  rs.filter(function(value){
    return value['predicate']==which.predicate 
           && value['verb']==which.verb;;
    }).forEach(function(value){

      exts = exts.concat(value.exts);
    });
  return exts.join(', '); 
}


/**
 * returns the length property given a brs array
 * visit https://qa-rest.elephantdrive.com/documentation/json_BackupConfiguration.html
 * for more information
 * 
 * @param {array} brs array returned from the REST services
 * @param {string} Specify which length you want to get: 
 *   [archives | versions | versionNumber]
 * @return {number} 
 */
function getVaLength(rs, va){
  var which;
  if (va=='archives'){
    which = {predicate: 0, verb: 4};
  } else if (va=='versions') {
    which = {predicate: 0, verb: 3};
  } else {
    which = {predicate: 0, verb: 2};
  }
  var t = rs.filter(function(value){
    // console.log(String(value['predicate'])+ ' ' + String(value['verb'])) 
    return value['predicate']==which.predicate 
           && value['verb']==which.verb;;
    });
  if (t.length != 0) {
    return t[0]['length'];
  }
  return undefined; 
}


/**
 * This proccesses the json object returned by GET /devices/backupconfiguration/{deviceId}
 * visit https://qa-rest.elephantdrive.com/documentation/resource_Rest.html#resource_Rest_getBackupConfiguration_GET
 * for more information
 * 
 * @param {object} json object returned from the REST call
 * @return {object} formated object that is human friendly
 * 
 * example of returned object: 
 * {
 *  deviceConfig: 
 *   { 'Encryption Key': 'System',
 *     CPUUsage: '10',
 *     NetworkUsage: '100',
 *     ContinousFrequency: '60',
 *     Version: '5.8.6',
 *     throttleNetwork: false,
 *     networkMaxUsage: 0 },
 *  backupConfigs: [
 *     DataObject {
 *       name: 'test',
 *       enabled: '\u001b[32mtrue\u001b[39m',
 *       scheduledType: 'Continuous',
 *       LastCompleted: '2 days ago',
 *       includePaths: undefined,
 *       '\u001b[90m- /Users/mohammadm/Dev\u001b[39m': undefined },
 *      ...
 *      ...
 *  ]
 * }
 */
function processBackupConfiguration(json){
  var deviceName = json.settingsMap.Host; 

  var deviceConfig = {
    'Encryption Key': json.settingsMap['Encryption Key'] || undefined,
    'CPUUsage': json.settingsMap['CPUUsage'] || undefined,
    'NetworkUsage': json.settingsMap['NetworkUsage'] || undefined,
    'ContinousFrequency': json.settingsMap['ContinousFrequency'] || undefined,
    'Version': json.settingsMap['Version'] || undefined,
    'throttleNetwork': json['throttleNetwork'],
    'networkMaxUsage': json['networkMaxUsage'],
  }

  var backupConfigs = [];

  json.backupRuleSets
    .sort(function(a, b){
      if (a.enabled) return -1
      if (b.enabled) return 1
      return 0
    })
    .forEach(function(val){
      var obj = {
        'name': val.name,
        'enabled': val.enabled ? 
                   chalk.green(val.enabled)
                   : chalk.red(val.enabled),
        'scheduledType': scheduledType[val['scheduleType']],
        'LastCompleted': moment(val['dtLastCompleted']).fromNow(),
      };

      var includedExts = getExts(val['brs'], 'included');
      if (includedExts.length!=0){
        obj.includedExts = includedExts;
      }
      var excludedExts = getExts(val['brs'], 'excluded');
      if (excludedExts.length!=0){
        obj.excludedExts = excludedExts;
      }
      var archLength = getVaLength(val['brs'], 'archives');
      if (archLength != undefined) {
        obj.keepArchives = String(archLength) + ' days';  
      }
      var versionLength = getVaLength(val['brs'], 'versions');
      if (versionLength != undefined) {
        obj.keepVersions = String(versionLength) + ' days';  
      }
      var versionNumber = getVaLength(val['brs'], 'versionNumber');
      if (versionNumber != undefined) {
        obj.versionNumber = String(versionNumber);  
      }
      var includePaths = getPaths(val['brs'], 'included');
      if (Object.keys(includePaths)!=0){
        obj.includePaths = undefined;
        extend(obj, includePaths);
      }
      var excludePaths = getPaths(val['brs'], 'excluded');
      if (Object.keys(excludePaths)!=0){
        obj.excludePaths = undefined;
        extend(obj, excludePaths);
      }

      backupConfigs.push(new DataObject(obj));
    })


  return {deviceConfig: deviceConfig, backupConfigs: backupConfigs};
}


module.exports = {
  getPaths: getPaths,
  getExts: getExts,
  getVaLength: getVaLength,
  processBackupConfiguration: processBackupConfiguration,
}