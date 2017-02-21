%% Create person 2 such as an accident succeeds

clear all
close all

Tram_gps=load('Tram6_gps_time_final.mat')
Person_gps=load('Person1_GPS_final.mat')

%modify the gps data
hold on
plot(Person_gps.data2(1,12),Tram_gps.data1(2,12),'rs')
Person_gps.data2(2,12)=Tram_gps.data1(2,13);
Person_gps.data2(2,13)=Tram_gps.data1(2,13);
Person_gps.data2(1,13)=Person_gps.data2(1,13)-0.00019;

data3=Person_gps.data2
save('Person2_GPS_accident_final.mat','data3'); 

%% print to file to check if coordinates are correct
outputfile='gps.txt';
fid=fopen(outputfile,'w');
% % fprintf(fid,'%7.0f,%2.15f,%2.15f \n',[t1; Tram_gps.data(1,:); Tram_gps.data(2,:)]);
% fprintf(fid,'%2.15f,',[data3(1,:)]); % for latitude and longitude
fprintf(fid,'%7.0f,',[data3(3,:)]);%for the time
fclose(fid);
%% 
dauer=14*60;
starttime=2343242;
t1=starttime+ceil(linspace(1,dauer,length(Tram_gps.data1)));

x1 = Tram_gps.data1(1,:);
y1 = Tram_gps.data1(2,:);
x2 = Person_gps.data2(1,:);
y2 = Person_gps.data2(2,:);



% comet(x1,y1);
figure(1)%changed
title('GPS Tracking');
ylabel('Longitude [�]');
xlabel('Latitude [�]');
grid on
% plot(47.376841154041095,8.544245,'rs')
hold on
plot(x1,y1,'bo')
hold on
plot(x2,y2,'ro')
animatedline(x2,y2)
legend('Tram','Passant 2 accident')
n=length(t1);
% AbstandinKM=distanceBetween(x1(1),y1(1),x2(1),y2(1));
figure(2)%changed
title('Abstand zwischen Tram und Person');
ylabel('[m]');

Vi=0;
YA=[x1;y1]';
YB=[x2;y2]';
L=1.5; %[m] L�nge der Gefahrenzone in metern
Sicherheitsabstand=1.5;%[m] L�nge
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