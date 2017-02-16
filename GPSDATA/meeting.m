%%Check if they met

figure
t = 0:.01:2*pi;
x1 = cos(2*t).*(cos(t).^2);
y1 = sin(2*t).*(sin(t).^2);
x2 = sin(2*t).*(sin(t).^2);
y2 = cos(2*t).*(cos(t).^2);

% comet(x1,y1);
hold on
plot(.5,0.2,'ro')
n=length(t);

for i=1:n
plot(x1(i),y1(i),'ro',x2(i),y2(i),'bo');
% axis([-40 60 -600 1000]);
pause(0.1)
hold on
end
% xlim([min(x1),max(x1)]);ylim([min(y1),max(y1)]);
legend('1','2')



% % BErechnung
double TinyGPSPlus::distanceBetween(double lat1, double long1, double lat2, double long2)
{
%   // returns distance in meters between two positions, both specified
%   // as signed decimal-degrees latitude and longitude. Uses great-circle
%   // distance computation for hypothetical sphere of radius 6372795 meters.
%   // Because Earth is no exact sphere, rounding errors may be up to 0.5%.
%   // Courtesy of Maarten Lamers
  double delta = radians(long1-long2);
  double sdlong = sin(delta);
  double cdlong = cos(delta);
  lat1 = radians(lat1);
  lat2 = radians(lat2);
  double slat1 = sin(lat1);
  double clat1 = cos(lat1);
  double slat2 = sin(lat2);
  double clat2 = cos(lat2);
  delta = (clat1 * slat2) - (slat1 * clat2 * cdlong);
  delta = sq(delta);
  delta += sq(clat2 * sdlong);
  delta = sqrt(delta);
  double denom = (slat1 * slat2) + (clat1 * clat2 * cdlong);
  delta = atan2(delta, denom);
  return delta * 6372795;
}