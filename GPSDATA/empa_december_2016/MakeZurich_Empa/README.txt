AC0XX.csv
---------

Files contain data from sensor units 9 to 12. Sensor units 9 and 12 are located at Schimmelstrasse, sensor units 10 and 11 are located at Rosengartenstrasse. 

Each sensor unit contains:
- 2 Alphasense NO2 B43F sensors (NO2_00 and NO2_01)
- 2 Alphasense NO B4 sensors (NO_00 and NO_01)
- 1 Temperature and relative humidity sensor (Sensirion SHT21)

Each file contains following columns:

date	:	dd.mm.YYYY HH:MM referring to CET
RH_01	:	Relative humidity [%]
T_01	:	Temperature [deg C]
NO2_00	:	NO2 sensor reading [mV]
NO2_01	:	NO2 sensor reading [mV]
NO_00	:	NO sensor reading [mV]
NO_01	:	NO sensor reading [mV]


NO2 and NO sensor readings can be disturbed during GSM data transmission (every 3 hours). NO sensor data is of higher quality than NO2 sensor data in the December 2016 period due to the prevalent meteorological conditions. NA indicate that no data is available for this time.