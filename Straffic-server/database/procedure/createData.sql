DROP PROCEDURE IF EXISTS addTrafficDensityData;
DELIMITER //
CREATE PROCEDURE 
addTrafficDensityData(
	locationId INTEGER,
	value DOUBLE,
    time DATETIME
)
BEGIN
	INSERT INTO TrafficDensity (
		LocationId, -- INTEGER,
		Value, -- DOUBLE,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME
	)
	VALUES (
		locationId,
		value,
		TIMESTAMP(time),
		current_timestamp(),
		current_time()
	);
	SELECT * FROM TrafficDensity WHERE Id = last_insert_id();
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS addChipiButtonData;
DELIMITER //
CREATE PROCEDURE 
addChipiButtonData(
	deviceId INTEGER,
	value boolean,
    time DATETIME
)
BEGIN
	INSERT INTO ChipiButtonSensorData (
		DeviceId, -- INTEGER,
		Value, -- BOOLEAN,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		deviceId,
		value,
		TIMESTAMP(time),
		current_time(),
		current_time()
	);
    SELECT * FROM ChipiButtonSensorData WHERE Id = last_insert_id();
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS addGasData;
DELIMITER //
CREATE PROCEDURE 
addGasData(
	deviceId INTEGER,
	value double,
    time DATETIME
)
BEGIN
	INSERT INTO GasSensorData (
		DeviceId, -- INTEGER,
		Value, -- DOUBLE,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		deviceId,
		value,
		TIMESTAMP(time),
		current_time(),
		current_time()
	);
    SELECT * FROM GasSensorData WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addSoundData;
DELIMITER //
CREATE PROCEDURE 
addSoundData(
	deviceId INTEGER,
	value double,
    time DATETIME
)
BEGIN
	INSERT INTO SoundSensorData (
		DeviceId, -- INTEGER,
		Value, -- DOUBLE,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		deviceId,
		value,
		TIMESTAMP(time),
		current_time(),
		current_time()
	);
    SELECT * FROM SoundSensorData WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addTemperatureData;
DELIMITER //
CREATE PROCEDURE 
addTemperatureData(
	deviceId INTEGER,
	value double,
    time DATETIME
)
BEGIN
	INSERT INTO TemperatureSensorData (
		DeviceId, -- INTEGER,
		Value, -- DOUBLE,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		deviceId,
		value,
		TIMESTAMP(time),
		current_time(),
		current_time()
	);
    SELECT * FROM TemperatureSensorData WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addTrafficSignalData;
DELIMITER //
CREATE PROCEDURE 
addTrafficSignalData(
	deviceId INTEGER,
	value char(2),
    time DATETIME
)
BEGIN
	INSERT INTO TrafficSignalData (
		DeviceId, -- INTEGER,
		Value, -- STRING,
		Time, -- TIMESTAMP,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		deviceId,
		value,
		TIMESTAMP(time),
		current_time(),
		current_time()
	);
    SELECT * FROM TrafficSignalData WHERE Id = last_insert_id();
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS addUser;
DELIMITER //
CREATE PROCEDURE 
addUser(
    username VARCHAR(20) CHARACTER SET utf8,
    password VARCHAR(20) CHARACTER SET utf8,
    urlAvatar VARCHAR(1000) CHARACTER SET utf8,
    name VARCHAR(200) CHARACTER SET utf8,
    ranks VARCHAR(200) CHARACTER SET utf8,
    birthDate DATE,
    sex BOOLEAN,
    workPlace VARCHAR(200) CHARACTER SET utf8,
    idNo VARCHAR(15) CHARACTER SET utf8,
    religion VARCHAR(200) CHARACTER SET utf8

)
BEGIN
	INSERT INTO User (
		Username, -- VARCHAR(20) CHARACTER SET utf8
		Password, -- VARCHAR(20) CHARACTER SET utf8
		UrlAvatar, -- VARCHAR(1000) CHARACTER SET utf8
		Name, -- VARCHAR(200) CHARACTER SET utf8
		Ranks, -- VARCHAR(200) CHARACTER SET utf8
		BirthDate, -- DATE
		Sex, -- BOOLEAN
		WorkPlace, -- VARCHAR(200) CHARACTER SET utf8
		IdNo, -- VARCHAR(15) CHARACTER SET utf8
		Religion, -- VARCHAR(200) CHARACTER SET utf8
		CreateAt, -- DATETIME
		UpdateAt -- DATETIME
	)
	VALUES (
		username,
        password,
        urlAvatar,
        name,
        ranks,
        birthDate,
        sex,
        workPlace,
        idNo,
        religion,
		current_time(),
		current_time()
	);
    SELECT * FROM User WHERE Id = last_insert_id();
END //
DELIMITER ;



DROP PROCEDURE IF EXISTS addCrossRoad;
DELIMITER //
CREATE PROCEDURE 
addCrossRoad(
    name VARCHAR(200) CHARACTER SET utf8,
    latitude DOUBLE,
    longtitude DOUBLE
)
BEGIN
	INSERT INTO CrossRoad (
		Name, -- VARCHAR(200) CHARACTER SET utf8,
		Latitude, -- DOUBLE,
		Longtitude, -- DOUBLE,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME
	)
	VALUES (
		name,
        latitude,
        longtitude,
		current_time(),
		current_time()
	);
    SELECT * FROM CrossRoad WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addRoad;
DELIMITER //
CREATE PROCEDURE 
addRoad(
    name VARCHAR(200) CHARACTER SET utf8
)
BEGIN
	INSERT INTO Road (
		Name, -- VARCHAR(200) CHARACTER SET utf8
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME
	)
	VALUES (
		name,
		current_time(),
		current_time()
	);
    SELECT * FROM Road WHERE Id = last_insert_id();
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS addRoadCrossRoad;
DELIMITER //
CREATE PROCEDURE 
addRoadCrossRoad(
    roadId INTEGER,
    crossRoadId INTEGER
)
BEGIN
	INSERT INTO RoadCrossRoad (
		RoadId, -- INTEGER,
		CrossRoadId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME
	)
	VALUES (
		roadId,
        crossRoadId,
		current_time(),
		current_time()
	);
    SELECT * FROM RoadCrossRoad WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addDeviceLocation;
DELIMITER //
CREATE PROCEDURE 
addDeviceLocation(
    roadCrossRoadId INTEGER,
    isNorth BOOLEAN
)
BEGIN
	INSERT INTO DeviceLocation (
		RoadCrossRoadId, -- INTEGER,
        IsNorth, -- BOOLEAN
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME
	)
	VALUES (
        roadCrossRoadId,
        isNorth,
		current_time(),
		current_time()
	);
    SELECT * FROM DeviceLocation WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addTemperatureSensor;
DELIMITER //
CREATE PROCEDURE 
addTemperatureSensor(
    locationId INTEGER
)
BEGIN
	INSERT INTO TemperatureSensor (
		LocationId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		locationId,
		current_time(),
		current_time()
	);
    SELECT * FROM TemperatureSensor WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addSoundSensor;
DELIMITER //
CREATE PROCEDURE 
addSoundSensor(
    locationId INTEGER
)
BEGIN
	INSERT INTO SoundSensor (
		LocationId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		locationId,
		current_time(),
		current_time()
	);
    SELECT * FROM SoundSensor WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addGasSensor;
DELIMITER //
CREATE PROCEDURE 
addGasSensor(
    locationId INTEGER
)
BEGIN
	INSERT INTO GasSensor (
		LocationId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		locationId,
		current_time(),
		current_time()
	);
    SELECT * FROM GasSensor WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addChipiButtonSensor;
DELIMITER //
CREATE PROCEDURE 
addChipiButtonSensor(
    locationId INTEGER
)
BEGIN
	INSERT INTO ChipiButtonSensor (
		LocationId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		locationId,
		current_time(),
		current_time()
	);
    SELECT * FROM ChipiButtonSensor WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addTrafficSignal;
DELIMITER //
CREATE PROCEDURE 
addTrafficSignal(
    locationId INTEGER
)
BEGIN
	INSERT INTO TrafficSignal (
		LocationId, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		locationId,
		current_time(),
		current_time()
	);
    SELECT * FROM TrafficSignal WHERE Id = last_insert_id();
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS addNotification;
DELIMITER //
CREATE PROCEDURE 
addNotification(
	content VARCHAR(1000) CHARACTER SET utf8,
    pos INTEGER,
    time DATETIME
)
BEGIN
	INSERT INTO Notification (
		Content, -- VARCHAR(1000) CHARACTER SET utf8,
        Time, -- TIMESTAMP,
        Pos, -- INTEGER,
		CreateAt, -- DATETIME,
		UpdateAt -- DATETIME,
	)
	VALUES (
		content,
        timestamp(time),
        pos,
		current_time(),
		current_time()
	);
    SELECT * FROM Notification WHERE Id = last_insert_id();
END //
DELIMITER ;