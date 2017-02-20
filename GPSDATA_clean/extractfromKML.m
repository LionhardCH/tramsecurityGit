%% Tram6_gps_time
%%extract GPS track from kml file of map.geo.admin.ch
% open .kml File in editor, search the first longitude number and insert a linebreak, then using importdata tool
%with commas and spaces as delimiters import the data

% Tram6_gps=reshape(Tram6,2,length(Tram6)/2)
% Person1_gps=reshape(Person1,2,length(Person1)/2)
% save('Trams6gps.mat','Tram6_gps');
% save('Personsgps.mat','Person1_gps');

load('Trams6gps.mat');%load original data
load('Personsgps.mat');%Lade alle unterschiedlichen Personen
dauer=14*60;
starttime=2343242;
t1=starttime+ceil(linspace(1,dauer,length(Tram6_gps)));%Timestamp in sekunden
Tram6_gps_time=[Tram6_gps;t1];

t2=starttime+linspace(1,dauer,length(Person1_gps));%Timestamp in sekunden
Person_gps_time=[Person1_gps;t2];

data1=Tram6_gps_time
save('Tram6_gps_time_final.mat','data1');


figure(1)%changed
title('GPS Tracking');
ylabel('Longitude [°]');
xlabel('Latitude [°]');
grid on
hold on
plot(Tram6_gps(1,:),Tram6_gps(2,:),'bo')
hold on
plot(Person1_gps(1,:),Person1_gps(2,:),'ro')
hold on
animatedline(Person1_gps(1,:),Person1_gps(2,:));
legend('Tram','Passant')



interplong_Person_gps_time=interp1(t2,Person_gps_time(1,:),t1);
interplat_Person_gps_time=interp1(t2,Person_gps_time(2,:),t1);
interp_Person_gps_time=[interplong_Person_gps_time; interplat_Person_gps_time;t1];

data2=interp_Person_gps_time
save('Person2_GPS_accident_final.mat','data2');

hold on
plot(interp_Person_gps_time(1,:),interp_Person_gps_time(2,:),'rx');

%% check if coordinates are correct
outputfile='gps.txt';
fid=fopen(outputfile,'w');
% fprintf(fid,'%7.0f,%2.15f,%2.15f \n',[t1; Tram_gps.data(1,:); Tram_gps.data(2,:)]);
% fprintf(fid,'%2.15f,',[data1(1,:)]); % for latitude and longitude
fprintf(fid,'%7.0f,',[data1(3,:)]);%for the time



%% Create person 2 such as an accident succeeds
% interp_Person_gps_time(1,11)=(Tram6_gps_time(1,12)+Tram6_gps_time(1,13))/2
% interp_Person_gps_time(2,12)=8.54372;%Tram6_gps_time(2,12)
% interp_Person_gps_time(2,13)=8.54374;
% interp_Person_gps_time(1,12)=interp_Person_gps_time(1,11);
% interp_Person_gps_time(1,13)=interp_Person_gps_time(1,11)+0.00002;

Person2_gps_time_final=interp_Person_gps_time; %
data=interp_Person_gps_time
save('Person2_GPS_accident_final.mat','data');
x1 = Tram_gps.data(1,:);
y1 = Tram_gps.data(2,:);
x2 = Person_gps.data(1,:);
y2 = Person_gps.data(2,:);



% comet(x1,y1);
figure(1)%changed
title('GPS Tracking');
ylabel('Longitude [°]');
xlabel('Latitude [°]');
grid on
% plot(47.376841154041095,8.544245,'rs')
hold on
plot(x1,y1,'bo')
hold on
plot(x2,y2,'ro')
animatedline(x2,y2)
legend('Tram','Passant')
n=length(t1);
% AbstandinKM=distanceBetween(x1(1),y1(1),x2(1),y2(1));
figure(2)%changed
title('Abstand zwischen Tram und Person');
ylabel('[m]');

Vi=0;
YA=[x1;y1]';
YB=[x2;y2]';
L=1.5; %[m] Länge der Gefahrenzone in metern
Sicherheitsabstand=1.5;%[m] Länge
norms=0;

for i=1:n
    if i==1
       Vold=0;
       told=starttime;
       ti=t1(i)
    else
    figure(1)%changed
    plot(x1(i),y1(i),'bx',x2(i),y2(i),'rx');
    hold on
    
    Vold=Vi;
    told=ti;
    ti=t1(i);
    Vi=(YA(i,:)-YA(i-1,:))/(ti-told);
    normVi=distanceBetween(YA(i-1,1),YA(i-1,2),YA(i,1),YA(i,2))/(ti-told)%km/sek
    Ai=(Vi-Vold)/(ti-told);
    tkrit=linspace(0,L/(normVi*3600),10);
    SkritX=YA(i,1)+tkrit.*Vi(1)+0.5*tkrit.^2*Ai(1);
    SkritY=YA(i,2)+tkrit.*Vi(2)+0.5*tkrit.^2*Ai(2);
    
    for j=1:length(SkritX)
        
        Abstand=distanceBetween(SkritX(j),SkritY(j),YB(i,1),YB(i,2))*1000;%in m
        if Abstand<Sicherheitsabstand
%         Abstand
        disp(['accident eminent! Abstand nur ',num2str(Abstand),'m'])
        pause
        end
        if Abstand>1000
            %%vehicle is stopping, v almost zero
            disp('tram too far away');
        end
    
    end
    pause(0.1)
    hold on
 
    figure(2) %changed    
norms=[norms,Abstand];
bar(norms)
    hold on
    end
end


