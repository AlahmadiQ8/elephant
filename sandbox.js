var chalk = require('chalk');
var columnify = require('columnify');
var moment = require('moment');
// var utils = require('./lib/utils');
var DataObject    = require('./lib/DataObject');
var extend = require('./lib/misc').extend;

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



var backup = {
  "backupRuleSets": [
    {
      "name": "Desktop",
      "jobId": "00000000-0000-0000-0000-000076D2711A",
      "enabled": true,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 0,
          "predicate": 5,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 0,
          "prefixes": [],
          "path": "/Users/mohammadm/My ElephantDrive"
        },
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 0,
          "prefixes": [],
          "path": "/Users/mohammadm/Desktop"
        },
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 0,
          "prefixes": [],
          "path": "/TESTING"
        },
        {
          "verb": 3,
          "predicate": 1,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 30,
          "prefixes": [],
          "path": ""
        },
        {
          "verb": 2,
          "predicate": 1,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 20,
          "prefixes": [],
          "path": ""
        },
        {
          "verb": 4,
          "predicate": 1,
          "cutoff": "2016-09-19T12:30:38",
          "exts": [],
          "length": 30,
          "prefixes": [],
          "path": ""
        }
      ],
      "dtStart": "2016-04-29T01:46:38",
      "dtLastStarted": "2016-10-11T21:50:24",
      "dtLastCompleted": "2016-10-11T21:50:30"
    },
    {
      "name": "Music",
      "jobId": "00000000-0000-0000-0000-000076D2711B",
      "enabled": false,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 0,
          "predicate": 5,
          "cutoff": "0001-01-05T00:00:00",
          "length": 0,
          "path": "/Users/mohammadm/My ElephantDrive"
        },
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "0001-01-05T00:00:00",
          "length": 0,
          "path": "/Users/mohammadm/Music"
        },
        {
          "verb": 4,
          "predicate": 0,
          "cutoff": "0001-01-05T00:00:00",
          "length": 30
        },
        {
          "verb": 2,
          "predicate": 0,
          "cutoff": "0001-01-05T00:00:00",
          "length": 20
        },
        {
          "verb": 3,
          "predicate": 0,
          "cutoff": "0001-01-05T00:00:00",
          "length": 30
        }
      ],
      "dtStart": "2016-04-27T04:46:00",
      "dtLastStarted": "2016-09-02T17:46:15",
      "dtLastCompleted": "2016-09-02T17:56:07"
    },
    {
      "name": "My ElephantDrive",
      "jobId": "00000000-0000-0000-0000-000076D2711C",
      "enabled": true,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 0,
          "predicate": 5,
          "cutoff": "0001-01-01T00:00:00",
          "length": 0,
          "path": "/Users/mohammadm/My ElephantDrive/Everywhere"
        },
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "0001-01-01T00:00:00",
          "length": 0,
          "path": "/Users/mohammadm/My ElephantDrive"
        },
        {
          "verb": 4,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 30
        },
        {
          "verb": 2,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 2
        },
        {
          "verb": 3,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 30
        }
      ],
      "dtStart": "2016-04-27T04:46:00",
      "dtLastStarted": "2016-10-11T21:50:24",
      "dtLastCompleted": "2016-10-11T21:50:26"
    },
    {
      "name": "Pictures",
      "jobId": "00000000-0000-0000-0000-000076D2711D",
      "enabled": false,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 0,
          "predicate": 5,
          "cutoff": "2016-05-03T21:46:59",
          "exts": [],
          "length": 0,
          "prefixes": [],
          "path": "/Users/mohammadm/My ElephantDrive"
        },
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "2016-05-03T21:46:59",
          "exts": [],
          "length": 0,
          "prefixes": [],
          "path": "/Users/mohammadm/Pictures"
        },
        {
          "verb": 4,
          "predicate": 1,
          "cutoff": "2016-05-03T21:46:59",
          "exts": [],
          "length": 30,
          "prefixes": [],
          "path": ""
        },
        {
          "verb": 2,
          "predicate": 1,
          "cutoff": "2016-05-03T21:46:59",
          "exts": [],
          "length": 20,
          "prefixes": [],
          "path": ""
        },
        {
          "verb": 3,
          "predicate": 1,
          "cutoff": "2016-05-03T21:46:59",
          "exts": [],
          "length": 30,
          "prefixes": [],
          "path": ""
        }
      ],
      "dtStart": "2016-04-27T04:46:59",
      "dtLastStarted": "2016-09-02T17:46:15",
      "dtLastCompleted": "2016-09-02T17:56:09"
    },
    {
      "name": "test",
      "jobId": "00000000-0000-0000-0000-000076D2711E",
      "enabled": true,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "0001-01-04T08:00:00",
          "length": 0,
          "path": "/Users/mohammadm/Dev"
        },
        {
          "verb": 4,
          "predicate": 1,
          "cutoff": "2016-08-28T09:15:04",
          "exts": [],
          "length": 30,
          "prefixes": [],
          "path": ""
        },
        {
          "verb": 2,
          "predicate": 1,
          "cutoff": "2016-08-28T09:15:04",
          "exts": [],
          "length": 20,
          "prefixes": [],
          "path": ""
        }
      ],
      "dtStart": "2016-08-26T01:00:00",
      "dtLastStarted": "2016-10-11T21:50:24",
      "dtLastCompleted": "2016-10-11T21:50:24"
    },
    {
      "name": "Documents",
      "jobId": "00000000-0000-0000-0000-000076D2711F",
      "enabled": true,
      "scheduleType": 0,
      "brs": [
        {
          "verb": 1,
          "predicate": 5,
          "cutoff": "0001-01-01T00:00:00",
          "length": 0,
          "path": "/Users/mohammadm/Documents"
        },
        {
          "verb": 4,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 30
        },
        {
          "verb": 2,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 20
        },
        {
          "verb": 3,
          "predicate": 0,
          "cutoff": "0001-01-01T00:00:00",
          "length": 30
        }
      ],
      "dtStart": "2016-09-10T04:38:00",
      "dtLastStarted": "2016-10-11T21:50:24",
      "dtLastCompleted": "2016-10-11T21:50:32"
    }
  ],
  "settings": [
    [
      "gHostID",
      "00000000-0000-0000-0000-000076d2711a"
    ],
    [
      "LastUpdated",
      "9/19/2016 10:38:02 PM"
    ],
    [
      "Host",
      "mohammads-Mac.local"
    ],
    [
      "Encryption Key",
      "System"
    ],
    [
      "CPUUsage",
      "10"
    ],
    [
      "NetworkUsage",
      "100"
    ],
    [
      "ElephantDriveRoot",
      "/Users/mohammadm/My ElephantDrive"
    ],
    [
      "Version",
      "5.8.6"
    ],
    [
      "ContinousFrequency",
      "60"
    ]
  ],
  "settingsMap": {
    "ElephantDriveRoot": "/Users/mohammadm/My ElephantDrive",
    "gHostID": "00000000-0000-0000-0000-000076d2711a",
    "LastUpdated": "9/19/2016 10:38:02 PM",
    "Host": "mohammads-Mac.local",
    "ContinousFrequency": "60",
    "Encryption Key": "System",
    "CPUUsage": "10",
    "Version": "5.8.6",
    "NetworkUsage": "100"
  },
  "lastUpdated": "0016-01-06T10:38:02Z",
  "generation": 0,
  "nativeImplementation": false,
  "pauseBackups": false,
  "throttleNetwork": false,
  "networkMaxUsage": 0
}

function getIncludePaths(rs){
  paths = {}
  rs.filter(function(value){
    return value['predicate']==5 && value['verb']==1;
    }).forEach(function(value){
      paths[chalk.gray(value.path)] = undefined; 
    });
  return paths; 
}

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

  json.backupRuleSets.forEach(function(val){
    var obj = {
      'name': val.name,
      'enabled': val.enabled ? 
                 chalk.green(val.enabled)
                 : chalk.red(val.enabled),
      'scheduledType': scheduledType[val['scheduleType']],
      'LastCompleted': moment(val['dtLastCompleted']).fromNow(),
    };

    var includePaths = getIncludePaths(val['brs']);
    if (Object.keys(includePaths)!=0){
      obj.includePaths = undefined;
      extend(obj, includePaths);
    }
    

    backupConfigs.push(obj);
  })



  console.log(backupConfigs);
}


var filt = ['subscriptionName', 'subscriptionDescriptor', 'maxFileLength', 'capacity', 'subscriptionState'];




// .map(transformObjectToKeyValueArray)
// .map(printDevice)
console.log('\n' + chalk.yellow('=========================='));
processBackupConfiguration(backup)


