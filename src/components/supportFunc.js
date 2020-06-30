function adjacent2List(adjacent) {
  return Object.keys(adjacent)
    .map((vertex, index) => {
      return Object.keys(adjacent[vertex]).map((adjvertex, index) => {
        return { idxStart: vertex, idxEnd: adjvertex };
      });
    })
    .flat();
}

function latLng2Meter(points) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  var result = {};
  var r = 6371;
  return Object.keys(points).map((point, index) => {
    result[point] = [];
  });
}

export { adjacent2List };
