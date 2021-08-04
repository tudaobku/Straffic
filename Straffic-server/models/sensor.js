const query = require("../db");

let getTempData = (req, res) => {
  query(
    `select UNIX_TIMESTAMP(Time) as x, Value as y from DeviceLocation
        inner join TemperatureSensor on DeviceLocation.Id = TemperatureSensor.LocationId
        inner join TemperatureSensorData on TemperatureSensor.Id = TemperatureSensorData.DeviceId
        where RoadCrossRoadId = ? and (Time between ? and ?) order by Time`,
    [req.body.roadCrossRoadId, req.body.startTime, req.body.endTime]
  ).then((data) => res.json(data));
};

let getSoundData = (req, res) => {
  query(
    `select UNIX_TIMESTAMP(Time) as x, Value as y from DeviceLocation
        inner join SoundSensor on DeviceLocation.Id = SoundSensor.LocationId
        inner join SoundSensorData on SoundSensor.Id = SoundSensorData.DeviceId
        where RoadCrossRoadId = ? and (Time between ? and ?) order by Time`,
    [req.body.roadCrossRoadId, req.body.startTime, req.body.endTime]
  ).then((data) => res.json(data));
};

let getGasData = (req, res) => {
  query(
    `select UNIX_TIMESTAMP(Time) as x, Value as y from DeviceLocation
        inner join GasSensor on DeviceLocation.Id = GasSensor.LocationId
        inner join GasSensorData on GasSensor.Id = GasSensorData.DeviceId
        where RoadCrossRoadId = ? and (Time between ? and ?) order by Time`,
    [req.body.roadCrossRoadId, req.body.startTime, req.body.endTime]
  ).then((data) => res.json(data));
};

const getAllData = (req, res) => {
  query(
    `call getAllDataAtLocation(?, ?, ?)`, 
    [req.body.roadCrossRoadId, toDateTimeMysqlFormat(req.body.startTime), toDateTimeMysqlFormat(req.body.endTime)]
  ).then((data) => {
    const ret = {
      'TEMPERATURE_SENSOR': [],
      'TRAFFIC_SIGNAL': [],
      'SOUND_SENSOR': [],
      'GAS_SENSOR': [],
    }
    for (let i = 0 ; i < data[0].length; i++) {
      value = data[0][i]
      ret[value.Type].push({
        'x': new Date(value.Time).getTime() / 1000,
        'y': Number(value.Value)
      })
    }
    res.json(ret)
  })
  .catch(ex => {console.log(ex)})
}

const toDateTimeMysqlFormat = (datetime) => {
  return datetime.slice(0, 19).replace('T', ' ');
}

module.exports = { getTempData, getGasData, getSoundData, getAllData };
