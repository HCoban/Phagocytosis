const Util = {
  scale(vec, l) {
    return [vec[0] * l, vec[1] * l];
  },

  velocity(radius, min, org) {
    if (min) {
      let disX = min.pos[0] - org.pos[0];
      let disY = min.pos[1] - min.pos[1];
      var degree = Math.atan(disY/disX);
    } else {
      var degree = 2 * Math.PI * Math.random();
    }
    return this.scale([Math.sin(degree), Math.cos(degree)], (100/radius));
  },

  distance(pos1, pos2) {
    let disX = pos1[0] - pos2[0];
    let disY = pos1[1] - pos2[1];

    return Math.pow((Math.pow(disX, 2) + Math.pow(disY, 2)), 0.5);
  }
};

export default Util;
