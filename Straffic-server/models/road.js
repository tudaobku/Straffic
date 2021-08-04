const query = require("../db");

let getCrossRoad = (req, res) => {
  query(
    `select CrossRoad.Id, CrossRoad.Name, RoadCrossRoad.Id as RoadCrossRoadId, Road.Name as RoadName, Latitude, Longtitude from CrossRoad
        inner join RoadCrossRoad on CrossRoad.Id = RoadCrossRoad.CrossRoadId
        inner join Road on Road.Id = RoadCrossRoad.RoadId`,
    []
  ).then((data) => {
    let result = [];
    for (let i = 0; i < data.length; i += 2) {
      result.push({
        id: data[i].Id,
        crossRoadName: data[i].Name,
        roadCrossRoadId1: data[i].RoadCrossRoadId,
        roadName1: data[i].RoadName,
        roadCrossRoadId2: data[i + 1].RoadCrossRoadId,
        roadName2: data[i + 1].RoadName,
        lat: data[i].Latitude,
        long: data[i].Longtitude,
      });
    }
    res.json(result);
  });
};

module.exports = { getCrossRoad };
