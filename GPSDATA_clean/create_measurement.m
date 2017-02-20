% create_measurement_file für die Wetterstation

outputfile='gps.txt'
tage=28;
close all
t=0:0.5:24*tage;
t=t(1:end-1);
monat_array=3*ones(size(t));
tage_array=([1:tage]'*[ones(1,48)])';
tage_array=tage_array(:)';
zeit_array=rem(t,24*ones(size(t)));

temp_array= 18+6*sin(t./24*2*pi+4)+3*t/(24*tage);
plot (t,temp_array)
hold on
humid_array=40+4*sin(t./24*2*pi+4)+3*t/(24*tage)+2.*rand(size(t));
plot(t,humid_array)

% % Measured=importdata(inputfile);
% % temp=Measured.data;
fid=fopen(outputfile,'w');
% fprintf(fid,'Monat März, Messdaten Schlafzimmer, Temperatur und Luftfeuchtigkeit\n');

fprintf(fid,'%2.0f,2,2015, %2.1f Uhr, Temp=, %2.2f, °C, humid=, %2.2f ,prozent \n',[tage_array; zeit_array; temp_array;...
    humid_array]);
% fprintf(fid,'%2.0f/03/2015 \n' ,[tage_array]);
fclose(fid);

x=0:0.01:2*pi;
plot(x,cos(pi/2-x))
hold on
plot(x,sin(x))