import { toLatLng, distanceTo } from "geolocation-utils";

function adjacent2List(adjacent) {
  return Object.keys(adjacent)
    .map((vertex, index) => {
      return Object.keys(adjacent[vertex]).map((adjvertex, index) => {
        return { idxStart: vertex, idxEnd: adjvertex };
      });
    })
    .flat();
}

function calculateHeuristic(index, locations) {
  var result = {};
  let point = toLatLng([...locations[index]].reverse());
  for (let i in locations) {
    if (index.toString() !== i) {
      result[i] = distanceTo(point, toLatLng([...locations[i]].reverse()));
    }
  }
  return result;
}

function latLngToMeter(locations) {
  var result = {};
  for (let i in locations) {
    let x = distanceTo({ lat: 0, lon: 0 }, { lat: 0, lon: locations[i][1] });
    let y = distanceTo({ lat: 0, lon: 0 }, { lat: locations[i][0], lon: 0 });
    result[i] = [y, x];
  }
  return result;
}

function dict2ListHeuristic(dict) {
  return Object.keys(dict).map((key, index) => {
    return {
      key: key.toString(),
      points: key,
      value: dict[key],
    };
  });
}

function list2DictHeuristic(lst) {
  var result = {};
  for (let i of lst) {
    result[i.points] = i.value;
  }
  return result;
}

export {
  adjacent2List,
  calculateHeuristic,
  latLngToMeter,
  dict2ListHeuristic,
  list2DictHeuristic,
};
