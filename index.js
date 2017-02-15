var express = require('express');
var app = express();

var ttn = require('ttn');

var appId = 'sauerklaud';
var accessKey = 'ttn-account-v2.AAQToobiTgVh3BGgVUaaY437KaBL8J9HkuM5qEnbcMA';
var client = new ttn.Client('eu', appId, accessKey);

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://back:1234@ds035059.mlab.com:35059/heroku_mqq5pbhp');


var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '298067',
  key: '256b563cc59616398c15',
  secret: 'ad03aff71ebb5af9bacc',
  cluster: 'eu',
  encrypted: true
});

client.on('message', function(deviceId, message) {
  console.log(message.payload_raw);

  var collection = db.get('airquality');
  collection.insert({
    "raw" : message.payload_raw.toString(),
  }, function (err, doc) {
  if (err) {
    console.log('Insert DB Error!');
  } 
  });

  console.log(message.payload_raw.toString())

  var rawstr = message.payload_raw.toString()
  var data = rawstr.split(";")

  pusher.trigger('my-channel', 'my-event', {
        "pm10": data[1],
        "pm25": data[0],
        "latitude": data[2],
        "longitude": data[3],
        "timestamp": data[4],
        "meas_id": '4342',
        "isValid": 'true'
    });
});

app.get('/sendfakedata', function(request, response) {
  setTimeout(function(){ 

    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '30',
        "latitude": '47.377031',
        "longitude": '8.544245',
        "timestamp": '2343242',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 1000);  
  setTimeout(function(){ 

    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '35',
        "latitude": '47.377540',
        "longitude": '8.544307',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 2000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '33',
        "latitude": '47.378114',
        "longitude": '8.544290',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 3000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '40',
        "latitude": '47.378761',
        "longitude": '8.544311',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 4000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '35',
        "latitude": '47.379284',
        "longitude": '8.544279',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 5000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '50',
        "latitude": '47.379284',
        "longitude": '8.544665',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 6000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '70',
        "latitude": '47.379081',
        "longitude": '8.545030',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 7000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '80',
        "latitude": '47.378705',
        "longitude": '8.545425',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 8000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '95',
        "latitude": '47.377906',
        "longitude": '8.545940',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 9000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '90',
        "latitude": '47.377114',
        "longitude": '8.546444',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 10000);  

  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '90',
        "latitude": '47.377049',
        "longitude": '8.546809',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 11000);
  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '90',
        "latitude": '47.377181',
        "longitude": '8.547656',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 12000);
	
  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '90',
        "latitude": '47.377405',
        "longitude": '8.548279',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 13000);
  setTimeout(function(){ 
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '90',
        "latitude": '47.378328',
        "longitude": '8.548118',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, 14000);
		
    response.render('pages/fakedatasent');
});

var path = require('path')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/indexTram2');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









