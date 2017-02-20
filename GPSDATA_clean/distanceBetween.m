function [ Abstand ] = distanceBetween( lat1,lon1,lat2,lon2 )
%Calculate DistanceBetween between two GPS coordinates
%% lat1, lat2, lon1, lon2: Breite, Länge in Grad
%mit Abstand: Entfernung in km 

% % % BErechnung
% double TinyGPSPlus::distanceBetween(double lat1, double long1, double lat2, double long2)
% {
% %   // returns distance in meters between two positions, both specified
% %   // as signed decimal-degrees latitude and longitude. Uses great-circle
% %   // distance computation for hypothetical sphere of radius 6372795 meters.
% %   // Because Earth is no exact sphere, rounding errors may be up to 0.5%.
% %   // Courtesy of Maarten Lamers
%   double delta = radians(long1-long2);
%   double sdlong = sin(delta);
%   double cdlong = cos(delta);
%   lat1 = radians(lat1);
%   lat2 = radians(lat2);
%   double slat1 = sin(lat1);
%   double clat1 = cos(lat1);
%   double slat2 = sin(lat2);
%   double clat2 = cos(lat2);
%   delta = (clat1 * slat2) - (slat1 * clat2 * cdlong);
%   delta = sq(delta);
%   delta += sq(clat2 * sdlong);
%   delta = sqrt(delta);
%   double denom = (slat1 * slat2) + (clat1 * clat2 * cdlong);
%   delta = atan2(delta, denom);
%   return delta * 6372795;
% }

%aus https://www.kompf.de/gps/distcalc.html 
% lat1, lat2, lon1, lon2: Breite, Länge in Grad
% mit Abstand: Entfernung in km 
lat = (lat1 + lat2) / 2 * 0.01745;
dx = 111.3 * cos(lat) * (lon1 - lon2);
dy = 111.3 * (lat1 - lat2);
Abstand = sqrt(dx * dx + dy * dy);

end

