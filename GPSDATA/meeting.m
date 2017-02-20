%%Check if they met
% close all

clc


%% Tram6_gps_time
% Tram6=Tram6(1:end-1)%gerade Anzahl notwendig!
% Tram6_gps=reshape(Tram6,2,length(Tram6)/2)
% Person_gps=reshape(Person_gps,2,length(Person_gps)/2)

% save('Trams6gps.mat','Tram6_gps');
% save('Persongps.mat','Person_gps');

load('Trams6gps.mat')
load('Persongps.mat')
dauer=5*60;
t1=2343242+linspace(1,dauer,length(Tram6_gps));%Timestamp in sekunden
Tram6_gps_time=[Tram6_gps;t1]

t2=2343242+linspace(1,dauer,length(Person_gps));%Timestamp in sekunden
Person_gps_time=[Person_gps;t2];

interplong_Person_gps_time=interp1(t2,Person_gps_time(1,:),t1);
interplat_Person_gps_time=interp1(t2,Person_gps_time(2,:),t1);
interp_Person_gps_time=[interplong_Person_gps_time; interplat_Person_gps_time;t1];

%%


% t = 0:.1:2*pi;
% x1 = cos(2*t).*(cos(t).^2);
% y1 = sin(2*t).*(sin(t).^2);
% x2 = sin(2*t).*(sin(t).^2);
% y2 = cos(2*t).*(cos(t).^2);
x1 = Tram6_gps_time(1,:);
y1 = Tram6_gps_time(2,:);
x2 = interp_Person_gps_time(1,:);
y2 = interp_Person_gps_time(2,:);

% comet(x1,y1);
figure
title('GPS Tracking');
ylabel('Longitude [°]');
xlabel('Latitude [°]');
grid on
plot(47.377031,8.544245,'rx')
hold on
plot(x1,y1,'bo')
hold on
plot(x2,y2,'ro')
animatedline(x2,y2)

n=length(t1);
% AbstandinKM=distanceBetween(x1(1),y1(1),x2(1),y2(1));

Vi=0;
YA=[x1;y1]';
YB=[x2;y2]';
L=1.5; %Länge der Gefahrenzone
Sicherheitsabstand=0.5;
norms=0;

for i=1:n
    if i==1
       Vold=0;
       told=0;
       ti=t1(i)
    else
    figure(1)
    plot(x1(i),y1(i),'ro',x2(i),y2(i),'bo');
    hold on
    
    Vold=Vi;
    told=ti;
    ti=t1(i);
    Vi=(YA(i,:)-YA(i-1,:))/(ti-told);
    Ai=(Vi-Vold)/(ti-told);
    tkrit=[0:0.1:L/norm(Vi)];
    SkritX=YA(i,1)+tkrit.*Vi(1)+0.5*tkrit.^2*Ai(1);
    SkritY=YA(i,2)+tkrit.*Vi(2)+0.5*tkrit.^2*Ai(2);

    for j=1:length(SkritX)
    Abstand=norm([SkritX(j), SkritY(j)]-YB(i,:),2)
        if Abstand<Sicherheitsabstand
        Abstand
        disp('accident eminent')
        end
        if Abstand>10000
            %%vehicle is stopping, v almost zero
            disp('tram is barely moving');
        end
       
    end
    % axis([-40 60 -600 1000]);
    pause(0.1)
    hold on
    
%     subplot(2,1,2)

    figure(2)     
%     plot(t(i),norm(Vi),'rx');
norms=[norms,Abstand];
bar(norms)
    hold on
    end
end
% xlim([min(x1),max(x1)]);ylim([min(y1),max(y1)]);
figure(1)
legend('1','2')


