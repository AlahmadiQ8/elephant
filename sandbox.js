var chalk = require('chalk');
var columnify = require('columnify');
var moment = require('moment');
var printDevice = require('./lib/printDevice');


var devs = [
  {
    "deviceName": "mohammad's iPad",
    "operatingSystem": "iOS",
    "productName": "Mobile",
    "productType": "Mobile",
    "shares": {},
    "settings": {},
    "deviceId": 1986233022,
    "deviceGuid": "00000000-0000-0000-0000-0000766382BE",
    "lastUpdated": "2016-06-07T21:17:14Z",
    "lastConnected": "2016-06-07T21:17:14Z",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": false,
    "restoreEnabled": false,
    "syncEnabled": false
  },
  {
    "deviceName": "mohammads-Mac.local",
    "shares": {},
    "settings": {},
    "deviceId": 1993503002,
    "deviceGuid": "00000000-0000-0000-0000-000076D2711A",
    "lastUpdated": "2016-09-15T17:38:33Z",
    "lastConnected": "2016-09-15T17:38:33Z",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": false,
    "syncEnabled": false
  },
  {
    "deviceName": "mhd-meerkat",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.6",
    "shares": {},
    "settings": {},
    "deviceId": 2004417318,
    "deviceGuid": "00000000-0000-0000-0000-00007778FB26",
    "lastUpdated": "2016-06-07T21:17:14Z",
    "lastConnected": "2016-06-07T21:17:14Z",
    "ipAddress": "127.0.1.1",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "AlahmadiQ8-ipad-pro",
    "operatingSystem": "iOS",
    "productName": "Mobile",
    "productType": "Mobile",
    "shares": {},
    "settings": {},
    "deviceId": 2015439601,
    "deviceGuid": "00000000-0000-0000-0000-000078212AF1",
    "lastUpdated": "2016-06-07T21:17:15Z",
    "lastConnected": "2016-06-07T21:17:15Z",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": false,
    "restoreEnabled": false,
    "syncEnabled": false
  },
  {
    "deviceName": "DS416",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.18",
    "shares": {
      "music": "/volume1/music",
      "web": "/volume1/web",
      "homes": "/volume1/homes",
      "photo": "/volume1/photo",
      "video": "/volume1/video"
    },
    "settings": {},
    "deviceId": 2066700679,
    "deviceGuid": "00000000-0000-0000-0000-00007B2F5987",
    "lastUpdated": "2016-06-07T21:17:15Z",
    "lastConnected": "2016-06-07T21:17:15Z",
    "ipAddress": "10.0.1.229",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "DS412",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.24",
    "shares": {
      "web": "/volume1/web"
    },
    "settings": {},
    "deviceId": 2220556035,
    "deviceGuid": "00000000-0000-0000-0000-0000845AFF03",
    "lastUpdated": "2016-08-25T05:28:00Z",
    "lastConnected": "2016-10-05T01:32:28Z",
    "ipAddress": "10.0.1.231",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "Drobo5N",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "shares": {},
    "settings": {},
    "deviceId": 2231381228,
    "deviceGuid": "00000000-0000-0000-0000-000085002CEC",
    "lastUpdated": "2016-09-02T17:52:22Z",
    "lastConnected": "2016-10-05T02:31:00Z",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": false
  },
  {
    "deviceName": "customplugin_1",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.24",
    "shares": {},
    "settings": {},
    "deviceId": 2247671208,
    "deviceGuid": "00000000-0000-0000-0000-000085F8BDA8",
    "lastUpdated": "2016-09-15T19:56:55Z",
    "lastConnected": "2016-09-13T11:41:01Z",
    "ipAddress": "10.0.1.9",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "DLINK-320L",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.24",
    "shares": {
      "D-Link Vault": "/mnt/HD/HD_a2/D-Link Vault",
      "HD_a2": "/mnt/HD/HD_a2"
    },
    "settings": {},
    "deviceId": 2282784032,
    "deviceGuid": "00000000-0000-0000-0000-000088108520",
    "lastUpdated": "2016-10-01T00:19:20Z",
    "lastConnected": "2016-10-05T02:34:33Z",
    "ipAddress": "10.0.1.249",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "WDMyCloudEX4",
    "operatingSystem": "Linux",
    "productName": "elephantdrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "2.9.22",
    "shares": {
      "SmartWare": "/mnt/HD/HD_a2/SmartWare",
      "Test": "/mnt/HD/HD_a2/Test",
      "restore": "/mnt/HD/HD_a2/restore",
      "var": "/mnt/HD/HD_a2/var",
      "TimeMachineBackup": "/mnt/HD/HD_a2/TimeMachineBackup",
      "tmp": "/mnt/HD/HD_a2/tmp",
      "testdata1": "/mnt/HD/HD_a2/testdata1",
      "testdata": "/mnt/HD/HD_a2/testdata",
      "Public": "/mnt/HD/HD_a2/Public"
    },
    "settings": {},
    "deviceId": 2282786593,
    "deviceGuid": "00000000-0000-0000-0000-000088108F21",
    "lastUpdated": "2016-10-01T00:19:20Z",
    "lastConnected": "2016-10-05T02:31:30Z",
    "ipAddress": "127.0.1.1",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": false
  },
  {
    "deviceName": "DLee",
    "operatingSystem": "Windows",
    "productId": "7E3F5754-AE49-48DC-96AC-C720E75C52F1",
    "version": "5.8.6",
    "shares": {},
    "settings": {},
    "deviceId": 2287931972,
    "deviceGuid": "00000000-0000-0000-0000-0000885F1244",
    "lastUpdated": "2016-10-01T00:19:20Z",
    "lastConnected": "2016-10-01T00:19:20Z",
    "ipAddress": "10.0.1.193",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "debian",
    "operatingSystem": "Linux",
    "productName": "godrive",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.25",
    "shares": {
      ".gnupg": "/home/mohammad/.gnupg",
      ".dbus": "/home/mohammad/.dbus",
      "Templates": "/home/mohammad/Templates",
      "my_restore": "/home/mohammad/my_restore",
      ".mozilla": "/home/mohammad/.mozilla",
      "Pictures": "/home/mohammad/Pictures",
      ".gconf": "/home/mohammad/.gconf",
      "Downloads": "/home/mohammad/Downloads",
      ".gnome2": "/home/mohammad/.gnome2",
      ".gnome2_private": "/home/mohammad/.gnome2_private",
      "Videos": "/home/mohammad/Videos",
      ".cache": "/home/mohammad/.cache",
      "Music": "/home/mohammad/Music",
      "Documents": "/home/mohammad/Documents",
      ".ssh": "/home/mohammad/.ssh",
      ".local": "/home/mohammad/.local",
      ".config": "/home/mohammad/.config",
      "Desktop": "/home/mohammad/Desktop",
      "Public": "/home/mohammad/Public"
    },
    "settings": {},
    "deviceId": 2292344103,
    "deviceGuid": "00000000-0000-0000-0000-000088A26527",
    "lastUpdated": "2016-10-01T00:19:20Z",
    "lastConnected": "2016-10-04T23:42:17Z",
    "ipAddress": "10.0.2.15",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  },
  {
    "deviceName": "RN314",
    "operatingSystem": "Linux",
    "deviceModel": "ReadyNAS 314",
    "productName": "readyNASVault",
    "productId": "F222B217-9428-446F-9989-AB941764F269",
    "version": "3.0.24",
    "shares": {
      "New_Share": "/data/New_Share",
      "Videos": "/data/Videos",
      "Music": "/data/Music",
      "Documents": "/data/Documents",
      "Pictures": "/data/Pictures"
    },
    "settings": {},
    "deviceId": 2298442852,
    "deviceGuid": "00000000-0000-0000-0000-000088FF7464",
    "lastConnected": "2016-10-05T02:13:02Z",
    "ipAddress": "10.0.1.134",
    "country": "US",
    "language": "en",
    "timeZone": "UTC",
    "active": true,
    "backupEnabled": true,
    "restoreEnabled": true,
    "syncEnabled": true
  }
]

function filterKeysInArrayOfObjects(list, info){
  return list.map(function(dev, index){
    Object.keys(dev).filter(function (v) {
        return info.indexOf(v)==-1;
    }).forEach(function (v) {
        delete dev[v];
    });
    return dev; 
  });
}

function transformObjectToKeyValueArray(obj){
  var transformed = [];
  for (var info in obj) {
    if (obj.hasOwnProperty(info)) {
      transformed.push({key: info, value: obj[info]});
    }
  };
  return transformed;
}


// filterKeysInArrayOfObjects(devs, ['syncEnabled', 'deviceName', 'lastConnected', 'version'])
// .map(transformObjectToKeyValueArray)
// .map(printDevice)

console.log(moment('2016-09-15T17:38:33Z').fromNow())


