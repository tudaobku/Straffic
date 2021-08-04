DROP VIEW IF EXISTS AllDevices;
CREATE VIEW AllDevices AS
SELECT *, "GAS_SENSOR" as Type FROM GasSensor
UNION 
SELECT *, "SOUND_SENSOR" as Type FROM SoundSensor
UNION
SELECT *, "CHIPI_BUTTON_SENSOR" as Type FROM ChipiButtonSensor
UNION
SELECT *, "TEMPERATURE_SENSOR" as Type FROM TemperatureSensor
UNION
SELECT *, "TRAFFIC_SIGNAL" as Type FROM TrafficSignal;

DROP VIEW IF EXISTS AllData;
CREATE VIEW AllData AS
SELECT *, "GAS_SENSOR" as Type FROM GasSensorData
UNION 
SELECT *, "SOUND_SENSOR" as Type FROM SoundSensorData
UNION
SELECT *, "CHIPI_BUTTON_SENSOR" as Type FROM ChipiButtonSensorData
UNION
SELECT *, "TEMPERATURE_SENSOR" as Type FROM TemperatureSensorData
UNION
SELECT *, "TRAFFIC_SIGNAL" as Type FROM TrafficSignalData;


DROP VIEW IF EXISTS CrossRoadView;
CREATE VIEW CrossRoadView AS
SELECT rcr.*, cr.Latitude, cr.Longtitude, r.Name 
	FROM RoadCrossRoad as rcr 
    JOIN CrossRoad as cr ON rcr.CrossRoadId = cr.Id	
    JOIN Road as r ON rcr.RoadId = r.Id
;

DROP VIEW IF EXISTS DeviceLocationView;
CREATE VIEW DeviceLocationView AS
SELECT dl.*, rcr.RoadId, rcr.CrossRoadId, rcr.Latitude, rcr.Longtitude, rcr.Name
	FROM DeviceLocation as dl 
    JOIN CrossRoadView as rcr on dl.RoadCrossRoadId = rcr.Id
;

    