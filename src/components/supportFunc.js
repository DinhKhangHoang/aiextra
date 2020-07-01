function adjacent2List(adjacent) {
  return Object.keys(adjacent)
    .map((vertex, index) => {
      return Object.keys(adjacent[vertex]).map((adjvertex, index) => {
        return { idxStart: vertex, idxEnd: adjvertex };
      });
    })
    .flat();
}

export { adjacent2List };
