-- procedure addUser
call addUser(
	'vietne',
	'ce7bbb1f68b12a9eda4a9e8b679026c8b724b67895417b2363d8b3dbf121a7cf', -- 'vietne'
    '',
    'Nguyễn Hoàng Việt',
    'CSGT',
    '2000-04-21',
    TRUE,
    'Đại Học Bách Khoa',
    '123456789',
    'Không'
);
call addUser(
	'tune',
	'e235bcd54c937d42e7588a2d54e94477d3b268f49787d671d751458a7ac2cf66', -- tune
    '',
    'Đào Thanh Tú',
    'CSGT',
    '2000-05-22',
    TRUE,
    'Đại Học Bách Khoa',
    '234567891',
    'Không'
);
call addUser(
	'truongne',
	'c8333f38ba72c281d514913afc3cf8de9f68c0c9f0c3ab8e1e9690b0d18973c9', -- truongne
    '',
    'Đỗ Lam Trường',
    'CSGT',
    '2000-06-23',
    TRUE,
    'Đại Học Bách Khoa',
    '345678912',
    'Không'
);
call addUser(
	'nhanne',
	'1e1229291d84a6b94e66c8905fbc00b7885d9b976df9cb27ec931a23a4ebb7c3', -- nhanne
    '',
    'Nguyễn Hồng Nhân',
    'CSGT',
    '2000-07-24',
    TRUE,
    'Đại Học Bách Khoa',
    '456789123',
    'Không'
);
call addUser(
	'longne',
	'596ed6d2d3b3ad635f7969da5a2aa2e24e239c24cf6b5072ae509fa678d70568', -- longne
    '',
    'Huỳnh Nhật Long',
    'CSGT',
    '2000-08-25',
    TRUE,
    'Đại Học Bách Khoa',
    '567891234',
    'Không'
);



call addCrossRoad(
    'Lý Thường Kiệt - 3 Tháng 2',
    10.763918,
    106.660007
);

call addCrossRoad(
    'Ngã Tư Thủ Đức',
    10.849108, 
    106.774066
);



call addRoad(
	'Lý Thường Kiệt'
);
call addRoad(
	'3 Tháng 2'
);
call addRoad(
	'Xa Lộ Hà Nội'
);
call addRoad(
	'Võ Văn Ngân'
);


call addRoadCrossRoad(
    1,
    1
);
call addRoadCrossRoad(
    2,
    1
);
call addRoadCrossRoad(
    3,
    2
);
call addRoadCrossRoad(
    4,
    2
);


call addDeviceLocation(
	1,
    FALSE
);
call addDeviceLocation(
	1,
    TRUE
);
call addDeviceLocation(
	2,
    FALSE
);
call addDeviceLocation(
	2,
    TRUE
);



call addTemperatureSensor(
	1
);
call addTemperatureSensor(
	2
);



call addSoundSensor(
	1
);
call addSoundSensor(
	2
);



call addGasSensor(
	1
);
call addGasSensor(
	2
);



call addChipiButtonSensor(
	1
);
call addChipiButtonSensor(
	2
);



call addTrafficSignal(
	1
);
call addTrafficSignal(
	2
);




call addNotification(
	'Test notification nè',
    1,
    TIMESTAMP('2021-05-06 07:00:00')
);


call addNotification(
	'Mật độ xe quá giới hạn',
    1,
    TIMESTAMP('2021-05-07 07:00:00')
);


call addNotification(
	'Nhiệt độ vượt ngưỡng cho phép',
    1,
    TIMESTAMP('2021-05-06 08:00:00')
);

call addNotification(
	'Gas vượt ngưỡng cho phép',
    1,
    TIMESTAMP('2021-05-08 07:00:00')
);

call addNotification(
	'Mật độ xe máy vượt quá ngưỡng cho phép',
    2,
    TIMESTAMP('2021-05-06 07:00:00')
);

call addNotification(
	'Khí gas vượt ngưỡng cho phép',
    2,
    TIMESTAMP('2021-05-07 08:00:00')
);



call addChipiButtonData(
    1,
    TRUE,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addChipiButtonData(
    1,
    FALSE,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addChipiButtonData(
    1,
    TRUE,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addChipiButtonData(
    1,
    FALSE,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addChipiButtonData(
    1,
    TRUE,
    TIMESTAMP('2021-05-06 05:52:05')
);

call addChipiButtonData(
    2,
    FALSE,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addChipiButtonData(
    2,
    TRUE,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addChipiButtonData(
    2,
    FALSE,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addChipiButtonData(
    2,
    TRUE,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addChipiButtonData(
    2,
    FALSE,
    TIMESTAMP('2021-05-06 05:52:05')
);





call addGasData(
    1,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addGasData(
    1,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addGasData(
    1,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addGasData(
    1,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addGasData(
    1,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);

call addGasData(
    2,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addGasData(
    2,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addGasData(
    2,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addGasData(
    2,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addGasData(
    2,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);





call addSoundData(
    1,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addSoundData(
    1,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addSoundData(
    1,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addSoundData(
    1,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addSoundData(
    1,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);

call addSoundData(
    2,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addSoundData(
    2,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addSoundData(
    2,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addSoundData(
    2,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addSoundData(
    2,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);






call addTemperatureData(
    1,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addTemperatureData(
    1,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addTemperatureData(
    1,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addTemperatureData(
    1,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addTemperatureData(
    1,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);

call addTemperatureData(
    2,
    28,
    TIMESTAMP('2021-05-06 05:52:01')
);

call addTemperatureData(
    2,
    29,
    TIMESTAMP('2021-05-06 05:52:02')
);

call addTemperatureData(
    2,
    30,
    TIMESTAMP('2021-05-06 05:52:03')
);

call addTemperatureData(
    2,
    31,
    TIMESTAMP('2021-05-06 05:52:04')
);

call addTemperatureData(
    2,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);




call addTrafficSignalData(
    1,
    '10',
    TIMESTAMP('2021-05-06 05:52:01')
);

call addTrafficSignalData(
    1,
    '10',
    TIMESTAMP('2021-05-06 05:52:02')
);

call addTrafficSignalData(
    1,
    '11',
    TIMESTAMP('2021-05-06 05:52:03')
);

call addTrafficSignalData(
    1,
    '11',
    TIMESTAMP('2021-05-06 05:52:04')
);

call addTrafficSignalData(
    1,
    '01',
    TIMESTAMP('2021-05-06 05:52:05')
);

call addTrafficSignalData(
    2,
    '10',
    TIMESTAMP('2021-05-06 05:52:01')
);

call addTrafficSignalData(
    2,
    '10',
    TIMESTAMP('2021-05-06 05:52:02')
);

call addTrafficSignalData(
    2,
    '11',
    TIMESTAMP('2021-05-06 05:52:03')
);

call addTrafficSignalData(
    2,
    '11',
    TIMESTAMP('2021-05-06 05:52:04')
);

call addTrafficSignalData(
    2,
    '01',
    TIMESTAMP('2021-05-06 05:52:05')
);


call addTrafficDensityData(
	1,
    30,
    TIMESTAMP('2021-05-06 05:52:01')
);
call addTrafficDensityData(
	1,
    32,
    TIMESTAMP('2021-05-06 05:52:02')
);
call addTrafficDensityData(
	1,
    32,
    TIMESTAMP('2021-05-06 05:52:03')
);
call addTrafficDensityData(
	1,
    34,
    TIMESTAMP('2021-05-06 05:52:04')
);
call addTrafficDensityData(
	1,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);

call addTrafficDensityData(
	2,
    32,
    TIMESTAMP('2021-05-06 05:52:05')
);




-- procedure get
call getAllUser();

call getUserById(
	3
);

call getUserByUserName('tune');

call authenticate('longne', 'longne');

call getAllRoadCrossRoad();

call getAllLocations();

call getAllDevicesAtLocation(1);

call getAllDevices();

call getTrafficDensity(1);

call getCurrentTrafficDensity(1);

call getAllDataAtLocation(
	1,
	'2021-05-05',
    '2021-05-07'
);

call getAllData(
    '2021-05-05',
    '2021-05-07'
);

call getChipiButtonData(
	1,
    '2021-05-05',
    '2021-05-07'
);

call getSoundData(
	1,
    '2021-05-05',
    '2021-05-07'
);

call getGasData(
	1,
    '2021-05-05',
    '2021-05-07'
);

call getTemperatureData(
	1,
    '2021-05-05',
    '2021-05-07'
);

call getTrafficSignalData(
	1,
	'2021-05-05',
    '2021-05-07'
);

call getAllNotification();

call getNotificationAtPos(0);