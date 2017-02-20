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

app.get('/tramsandpersonsmove4', function(request, response) {
	var timeGPS=[2343243,2343265,2343287,2343308,2343330,2343351,2343373,2343394,2343416,2343437,2343459,2343480,2343502,2343523,2343545,2343566,2343588,2343609,2343631,2343652,2343674,2343695,2343717,2343738,2343760,2343781,2343803,2343824,2343846,2343867,2343889,2343910,2343932,2343953,2343975,2343996,2344018,2344039,2344061,2344082];
	var latGPS=[47.370567767223150,47.372084454795122,47.373615093404482,47.374667339778178,47.375240393472424,47.375956961824954,47.376430455908675,47.376931686365644,47.377045317793069,47.377057816003038,47.377009956352602,47.376855371380564,47.376826936701626,47.376922189881761,47.377001672901265,47.377433100511396,47.377996116445964,47.378510743327446,47.378915190680999,47.379279801535120,47.379435263004311,47.379005792527096,47.378462068919774,47.377652532147621,47.377167579324862,47.377026912567672,47.377058885112035,47.377175920850298,47.377300540108614,47.377397495741413,47.377614162773320,47.377876368708165,47.378162027173389,47.378881265743054,47.379415988192811,47.380230076379782,47.380603554333611,47.381272770932853,47.382954996083981,47.383025772341711];
	var longGPS=[8.538945631983465,8.538367842416800,8.538214039636292,8.538705833800998,8.538982501559431,8.539301865424916,8.539642701486793,8.539904662051759,8.540251314408545,8.541597897849309,8.541974828613853,8.543090614663582,8.543712419843578,8.544098426089519,8.544252363146377,8.544287797813297,8.544312720189740,8.544270424945562,8.544305301049695,8.544273135995196,8.544477214512179,8.545176802918240,8.545595906774160,8.546062449862736,8.546449649375758,8.546579150526881,8.546996953895640,8.547498419798304,8.548103549059052,8.548310827411306,8.548229261292896,8.548089050329004,8.548094996666892,8.548116508666986,8.548167369393175,8.548164452587102,8.548145741121802,8.548153051469530,8.548166857690632,8.548169183991693];
	
	var count=0;
	var intervalObject= setInterval(function(){	

		console.log(count,' als Zahl',latGPS[count], ' ',longGPS[count]);
	var longa=longGPS[count];
	var longstr=longa.toString();
	var lata=latGPS[count];
	var latstr=lata.toString();
		console.log(count,' inderFunktion',longstr,' ',latstr);
		pusher.trigger('my-channel', 'my-event', {
			"pm10": '34',
			"pm25": '30',
			"latitude": latstr,
			"longitude": longstr,
			"timestamp": '2343243',
			"meas_id": '4342',
			"isValid": 'true'
		});
			
		count++;		
		if (count ==40){
			console.log(count, 'exiting');
			clearInterval(intervalObject);
		}
    }, 1000);     
		
			
    response.render('pages/personsandobjectsmoving');
});

app.get('/tramsandpersonsmove3', function(request, response) {
	var timeGPS=[2343243,2343266,2343288];
	var latGPS=[47.370567767223150,47.372084454795122,47.373615093404482];
	var longGPS=[8.538367842416800,8.538214039636292,8.538705833800998];
	
	var count=0;
	var intervalObject= setInterval(function(){	

		console.log(count,' als Zahl',latGPS[count], ' ',longGPS[count]);
	var longa=longGPS[count];
	var longstr=longa.toString();
	var lata=latGPS[count];
	var latstr=lata.toString();
		console.log(count,' inderFunktion',longstr,' ',latstr);
		pusher.trigger('my-channel', 'my-event', {
			"pm10": '34',
			"pm25": '30',
			"latitude": latstr,
			"longitude": longstr,
			"timestamp": '2343243',
			"meas_id": '4342',
			"isValid": 'true'
		});
			
		count++;		
		if (count ==3){
			console.log(count, 'exiting');
			clearInterval(intervalObject);
		}
    }, 1000);     
		
			
    response.render('pages/personsandobjectsmoving');
});

app.get('/tramsandpersonsmove2', function(request, response) {
	var timeGPS=[2343243,2343266,2343288];
	var longGPS=[47.370567,47.372084,47.373615];
	var latGPS=[8.538367,8.538214,8.538705];
	for (var i=0; i<3; i++) {

	var count=0;
	var intervalObject= setInterval(function(){
		var longa=longGPS[count];
		var longstr=longa.toString();
	
		console.log(i,' hi',longstr);
    pusher.trigger('my-channel', 'my-event', {
        "pm10": '34',
        "pm25": '30',
        "latitude": longstr,
        "longitude": '8.538367',
        "timestamp": '2343243',
        "meas_id": '4342',
        "isValid": 'true'
    });
    }, i*1000);  
	
	}
			
    response.render('pages/personsandobjectsmoving');
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









