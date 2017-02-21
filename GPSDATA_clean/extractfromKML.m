%% Tram6_gps_time
%%extract GPS track from kml file of map.geo.admin.ch
% open .kml File in editor, search the first longitude number and insert a linebreak, then using importdata tool
%with commas and spaces as delimiters import the data

% Tram6_gps=reshape(Tram6,2,length(Tram6)/2)
% Person1_gps=reshape(Person1,2,length(Person1)/2)
% save('Trams6gps.mat','Tram6_gps');
% save('Personsgps.mat','Person1_gps');
clear all
close all

load('Trams6gps.mat');%load original data
load('Personsgps.mat');%Lade alle unterschiedlichen Personen
dauer=14*60;
starttime=2343242;
t1=starttime+ceil(linspace(1,dauer,length(Tram6_gps)));%Timestamp in sekunden
Tram6_gps_time=[Tram6_gps;t1];

t2=starttime+linspace(1,dauer,length(Person1_gps));%Timestamp in sekunden
Person_gps_time=[Person1_gps;t2];

data1=Tram6_gps_time;
save('Tram6_gps_time_final.mat','data1');


figure(1)%changed
title('GPS Tracking');
ylabel('Longitude [�]');
xlabel('Latitude [�]');
grid on
hold on
plot(Tram6_gps(1,:),Tram6_gps(2,:),'bo')
hold on
plot(Person1_gps(1,:),Person1_gps(2,:),'ro')
hold on


interplong_Person_gps_time=interp1(t2,Person_gps_time(1,:),t1);
interplat_Person_gps_time=interp1(t2,Person_gps_time(2,:),t1);
interp_Person_gps_time=[interplong_Person_gps_time; interplat_Person_gps_time;t1];

data2=interp_Person_gps_time;
save('Person1_GPS_final.mat','data2');

hold on
plot(interp_Person_gps_time(1,:),interp_Person_gps_time(2,:),'-rx');
legend('Tram','Passant 1 raw data','Passant 1 interpoliert')


%% print to file to check if coordinates are correct
% outputfile='gps.txt';
% fid=fopen(outputfile,'w');
% % fprintf(fid,'%7.0f,%2.15f,%2.15f \n',[t1; Tram_gps.data(1,:); Tram_gps.data(2,:)]);
% % fprintf(fid,'%2.15f,',[data1(1,:)]); % for latitude and longitude
% fprintf(fid,'%7.0f,',[data1(3,:)]);%for the time






