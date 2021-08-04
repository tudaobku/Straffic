DROP PROCEDURE IF EXISTS getAllUser;
DELIMITER //
CREATE PROCEDURE 
getAllUser()
BEGIN
	SELECT Id, Username, UrlAvatar, Name, Ranks, BirthDate, Sex, WorkPlace, IdNo, Religion, CreateAt, UpdateAt FROM User;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getUserById;
DELIMITER //
CREATE PROCEDURE 
getUserById(id INTEGER)
BEGIN
	SELECT Id, Username, UrlAvatar, Name, Ranks, BirthDate, Sex, WorkPlace, IdNo, Religion, CreateAt, UpdateAt FROM User
    WHERE User.Id = id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getUserByUsername;
DELIMITER //
CREATE PROCEDURE 
getUserByUsername(username VARCHAR(20))
BEGIN
	SELECT Id, Username, UrlAvatar, Name, Ranks, BirthDate, Sex, WorkPlace, IdNo, Religion, CreateAt, UpdateAt FROM User
    WHERE User.UserName = userName;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS authenticate;
DELIMITER //
CREATE PROCEDURE 
authenticate(
	username VARCHAR(20),
    password VARCHAR(2000)
)
BEGIN
	SELECT Id, Username, UrlAvatar, Name, Ranks, BirthDate, Sex, WorkPlace, IdNo, Religion, CreateAt, UpdateAt FROM User
    WHERE User.UserName = userName AND User.Password = password;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllRoadCrossRoad;
DELIMITER //
CREATE PROCEDURE 
getAllRoadCrossRoad()
BEGIN
	SELECT * FROM CrossRoadView;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getAllLocations;
DELIMITER //
CREATE PROCEDURE 
getAllLocations()
BEGIN
	SELECT * FROM DeviceLocationView;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllDevicesAtLocation;
DELIMITER //
CREATE PROCEDURE 
getAllDevicesAtLocation(locationId INTEGER)
BEGIN
	SELECT * FROM AllDevices WHERE AllDevices.LocationId = locationId;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllDevices;
DELIMITER //
CREATE PROCEDURE 
getAllDevices()
BEGIN
	SELECT * FROM AllDevices;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getTrafficDensity;
DELIMITER //
CREATE PROCEDURE 
getTrafficDensity(
	locationId INTEGER
)
BEGIN
	SELECT * FROM TrafficDensity
		WHERE TrafficDensity.LocationId = locationId;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getCurrentTrafficDensity;
DELIMITER //
CREATE PROCEDURE 
getCurrentTrafficDensity(
	locationId INTEGER
)
BEGIN
	SELECT * FROM TrafficDensity
		WHERE TrafficDensity.LocationId = locationId
        ORDER BY Time DESC
        LIMIT 1;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllDataAtLocation;
DELIMITER //
CREATE PROCEDURE 
getAllDataAtLocation(
	locationId INTEGER,
    fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT d.*, de.LocationId FROM AllData as d 
				JOIN  AllDevices as de ON d.DeviceId = de.Id
									AND d.Type = de.Type
	WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
		AND de.LocationId = locationId
	ORDER BY Time;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllData;
DELIMITER //
CREATE PROCEDURE 
getAllData(
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM AllData
	WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
	ORDER BY Time;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getChipiButtonData;
DELIMITER //
CREATE PROCEDURE 
getChipiButtonData(
	deviceId INTEGER,
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM ChipiButtonSensorData
		WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
        ORDER BY Time;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getGasData;
DELIMITER //
CREATE PROCEDURE 
getGasData(
	deviceId INTEGER,
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM GasSensorData
		WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
        ORDER BY Time;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getSoundData;
DELIMITER //
CREATE PROCEDURE 
getSoundData(
	deviceId INTEGER,
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM SoundSensorData
		WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
        ORDER BY Time;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getTemperatureData;
DELIMITER //
CREATE PROCEDURE 
getTemperatureData(
	deviceId INTEGER,
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM TemperatureSensorData
		WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
        ORDER BY Time;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS getTrafficSignalData;
DELIMITER //
CREATE PROCEDURE 
getTrafficSignalData(
	deviceId INTEGER,
	fromDate DATE,
    toDate DATE
)
BEGIN
	SELECT * FROM TrafficSignalData
		WHERE Time >= timestamp(fromDate) AND  Time <= TIMESTAMP(toDate)
        ORDER BY Time;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getAllNotification;
DELIMITER //
CREATE PROCEDURE 
getAllNotification()
BEGIN 
	SELECT * FROM Notification;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS getNotificationAtPos;
DELIMITER //
CREATE PROCEDURE 
getNotificationAtPos(pos INTEGER)
BEGIN 
	SELECT * FROM Notification
    WHERE Notification.Pos = pos
    ;
END //
DELIMITER ;