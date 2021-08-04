INSERT INTO User (
    username, -- VARCHAR(20)
    password, -- VARCHAR(20)
    UrlAvatar, -- VARCHAR(1000)
    Name, -- VARCHAR(200)
    Ranks, -- VARCHAR(200)
    BirthDate, -- DATE
    Sex, -- BOOLEAN
    WorkPlace, -- VARCHAR(200)
    IdNo, -- VARCHAR(15)
    Religion, -- VARCHAR(200)
    CreateAt, -- DATETIME
    UpdateAt -- DATETIME
)
VALUES (
	'vietne',
	'vietne',
    '',
    'Nguyen Hoang Viet',
    'CSGT',
    '2000-04-21',
    TRUE,
    'Dai Hoc Bach Khoa',
    '123456789',
    'Khong',
    '2021-05-06 05:28:00',
    '2021-05-06 05:28:00'
);

INSERT INTO User (
    username, -- VARCHAR(20)
    password, -- VARCHAR(20)
    UrlAvatar, -- VARCHAR(1000)
    Name, -- VARCHAR(200)
    Ranks, -- VARCHAR(200)
    BirthDate, -- DATE
    Sex, -- BOOLEAN
    WorkPlace, -- VARCHAR(200)
    IdNo, -- VARCHAR(15)
    Religion, -- VARCHAR(200)
    CreateAt, -- DATETIME
    UpdateAt -- DATETIME
)
VALUES (
	'tune',
	'tune',
    '',
    'Dao Thanh Tu',
    'CSGT',
    '2000-05-22',
    TRUE,
    'Dai Hoc Bach Khoa',
    '234567891',
    'Khong',
    '2021-05-06 05:30:00',
    '2021-05-06 05:30:00'
);


INSERT INTO User (
    username, -- VARCHAR(20)
    password, -- VARCHAR(20)
    UrlAvatar, -- VARCHAR(1000)
    Name, -- VARCHAR(200)
    Ranks, -- VARCHAR(200)
    BirthDate, -- DATE
    Sex, -- BOOLEAN
    WorkPlace, -- VARCHAR(200)
    IdNo, -- VARCHAR(15)
    Religion, -- VARCHAR(200)
    CreateAt, -- DATETIME
    UpdateAt -- DATETIME
)
VALUES (
	'truongne',
	'truongne',
    '',
    'Do Lam Truong',
    'CSGT',
    '2000-06-23',
    TRUE,
    'Dai Hoc Bach Khoa',
    '345678912',
    'Khong',
    '2021-05-06 05:32:00',
    '2021-05-06 05:32:00'
);

INSERT INTO User (
    username, -- VARCHAR(20)
    password, -- VARCHAR(20)
    UrlAvatar, -- VARCHAR(1000)
    Name, -- VARCHAR(200)
    Ranks, -- VARCHAR(200)
    BirthDate, -- DATE
    Sex, -- BOOLEAN
    WorkPlace, -- VARCHAR(200)
    IdNo, -- VARCHAR(15)
    Religion, -- VARCHAR(200)
    CreateAt, -- DATETIME
    UpdateAt -- DATETIME
)
VALUES (
	'nhanne',
	'nhanne',
    '',
    'Nguyen Hong Nhan',
    'CSGT',
    '2000-07-24',
    TRUE,
    'Dai Hoc Bach Khoa',
    '456789123',
    'Khong',
    '2021-05-06 05:34:00',
    '2021-05-06 05:34:00'
);


INSERT INTO User (
    username, -- VARCHAR(20)
    password, -- VARCHAR(20)
    UrlAvatar, -- VARCHAR(1000)
    Name, -- VARCHAR(200)
    Ranks, -- VARCHAR(200)
    BirthDate, -- DATE
    Sex, -- BOOLEAN
    WorkPlace, -- VARCHAR(200)
    IdNo, -- VARCHAR(15)
    Religion, -- VARCHAR(200)
    CreateAt, -- DATETIME
    UpdateAt -- DATETIME
)
VALUES (
	'longne',
	'longne',
    '',
    'Huynh Nhat Long',
    'CSGT',
    '2000-08-25',
    TRUE,
    'Dai Hoc Bach Khoa',
    '567891234',
    'Khong',
    '2021-05-06 05:34:00',
    '2021-05-06 05:34:00'
);



INSERT INTO CrossRoad (
    Name, -- VARCHAR(200),
    Latitude, -- DOUBLE,
    Longtitude, -- DOUBLE,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Ly Thuong Kiet - 3 Thang 2',
    10.763918,
    106.660007,
    '2021-05-06 05:37:00',
    '2021-05-06 05:37:00'
);

INSERT INTO CrossRoad (
    Name, -- VARCHAR(200),
    Latitude, -- DOUBLE,
    Longtitude, -- DOUBLE,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Nga Tu Thu Duc',
    10.849108, 
    106.774066,
    '2021-05-06 05:39:00',
    '2021-05-06 05:39:00'
);



INSERT INTO Road (
    Name, -- VARCHAR(200),
    CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Ly Thuong Kiet',
    '2021-05-06 05:41:00',
    '2021-05-06 05:41:00'
);

INSERT INTO Road (
    Name, -- VARCHAR(200),
    CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    '3 Thang 2',
    '2021-05-06 05:42:00',
    '2021-05-06 05:42:00'
);

INSERT INTO Road (
    Name, -- VARCHAR(200),
    CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Xa Lo Ha Noi',
    '2021-05-06 05:43:00',
    '2021-05-06 05:43:00'
);

INSERT INTO Road (
    Name, -- VARCHAR(200),
    CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Vo Van Ngan',
    '2021-05-06 05:44:00',
    '2021-05-06 05:44:00'
);

INSERT INTO RoadCrossRoad (
    RoadId, -- INTEGER,
    CrossRoadId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    1,
    '2021-05-06 05:45:00',
    '2021-05-06 05:45:00'
);

INSERT INTO RoadCrossRoad (
    RoadId, -- INTEGER,
    CrossRoadId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    1,
    '2021-05-06 05:45:00',
    '2021-05-06 05:45:00'
);

INSERT INTO RoadCrossRoad (
    RoadId, -- INTEGER,
    CrossRoadId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    3,
    2,
    '2021-05-06 05:46:00',
    '2021-05-06 05:46:00'
);

INSERT INTO RoadCrossRoad (
    RoadId, -- INTEGER,
    CrossRoadId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    4,
    2,
    '2021-05-06 05:45:00',
    '2021-05-06 05:45:00'
);

INSERT INTO DeviceLocation (
    RoadCrossRoadId, -- INTEGER,
    IsNorth, -- BOOLEAN,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    FALSE,
    '2021-05-06 05:50:00',
    '2021-05-06 05:50:00'   
);

INSERT INTO DeviceLocation (
    RoadCrossRoadId, -- INTEGER,
    IsNorth, -- BOOLEAN,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    FALSE,
    '2021-05-06 05:51:00',
    '2021-05-06 05:51:00'   
);




INSERT INTO TemperatureSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO TemperatureSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);






INSERT INTO SoundSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO SoundSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);









INSERT INTO GasSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO GasSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);






INSERT INTO ChipiButtonSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO ChipiButtonSensor (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO Notification (
    Content, -- VARCHAR(1000),
    Time, -- TIMESTAMP,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME
)
VALUES (
    'Test notification ne',
    TIMESTAMP('2021-05-06 07:00:00'),
    '2021-05-06 07:00:00',
    '2021-05-06 07:00:00'
);

INSERT INTO trafficsignal (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    1,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);

INSERT INTO trafficsignal (
    LocationId, -- INTEGER,
	CreateAt, -- DATETIME,
    UpdateAt -- DATETIME,
)
VALUES (
    2,
    '2021-05-06 05:52:00',
    '2021-05-06 05:52:00'
);
