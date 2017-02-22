var express = require('express');
var app = express();

var Pusher = require('pusher');

//pusher-Konto auf Leonardo Schneider: (https://pusher.com/)
var pusher = new Pusher({
  appId: '304930',
  key: '2414aa74ed13a613c3c9',
  secret: '0a67d574288c45b4c3ed',
  cluster: 'eu',
  encrypted: true
});

app.get('/trammove', function(request, response) {
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
	var tima=timeGPS[count];
	var timestr=tima.toString();
		console.log(count,' inderFunktion',longstr,' ',latstr);
		pusher.trigger('my-channel', 'my-event', {

			"latitude": latstr,
			"longitude": longstr,
			"timestamp": timestr,
			"meas_id": '8',
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

app.get('/personmove', function(request, response) {
	
	var timeGPS=[2343243,2343265,2343287,2343308,2343330,2343351,2343373,2343394,2343416,2343437,2343459,2343480,2343502,2343523,2343545,2343566,2343588,2343609,2343631,2343652,2343674,2343695,2343717,2343738,2343760,2343781,2343803,2343824,2343846,2343867,2343889,2343910,2343932,2343953,2343975,2343996,2344018,2344039,2344061,2344082];
	var latGPS=[47.375596396293538,47.375873768676485,47.376145907456156,47.376357059482210,47.376559966823692,47.376647154203965,47.376746151780431,47.376872092591952,47.376954576714859,47.376880799974039,47.376858728935460,47.376826936701626,47.376826936701626,47.377172879213504,47.377380927764975,47.377753550641714,47.378172914985882,47.378610319558263,47.378863229495920,47.378888022403103,47.378891303679801,47.378874658574162,47.378904456192956,47.378966850315898,47.379034511379004,47.379100450474063,47.379181896218356,47.379265562312646,47.379443183057695,47.379647191927234,47.379793571815078,47.379913149789985,47.380022919298874,47.380124207624256,47.380208692160735,47.380285886698722,47.380253227948685,47.380210617783838,47.380349859349074,47.380491568826066];
	var longGPS=[8.543399488161594,8.543498990666215,8.543594178532889,8.543644959466207,8.543700225669664,8.543765009744792,8.543822994026066,8.543837758885269,8.543894333032696,8.544075103698344,8.544165993617757,8.544015841669548,8.543727160524007,8.543935644028437,8.543900648523682,8.543782420327835,8.543674812912256,8.543592889459122,8.543663548811551,8.543896090656975,8.544062997652070,8.544155463523380,8.544237465080371,8.544305053145147,8.544470785334925,8.544684949764426,8.544897550505157,8.545094854737140,8.545573543256765,8.546134654228137,8.546628553917028,8.547071900834460,8.547361841535562,8.547599296460836,8.547785126711398,8.547952471658199,8.547952660003507,8.547935199242861,8.548181978842148,8.548430222535881];
	
	var count=0;
	var intervalObject= setInterval(function(){	

		console.log(count,' als Zahl',latGPS[count], ' ',longGPS[count]);
	var longa=longGPS[count];
	var longstr=longa.toString();
	var lata=latGPS[count];
	var latstr=lata.toString();
	var tima=timeGPS[count];
	var timestr=tima.toString();
		console.log(count,' inderFunktion',longstr,' ',latstr);
		pusher.trigger('my-channel', 'my-event', {
			"latitude": latstr,
			"longitude": longstr,
			"timestamp": timestr,
			"meas_id": '8',
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

var path = require('path')

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  //response.render('pages/indexTram4');
  response.render('pages/ZRH_Tram');
});

app.get('/buttons', function(request, response) {
  response.render('pages/ZRH_Tram1');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});









