const Util = {
  scale(vec, l) {
    return [vec[0] * l, vec[1] * l];
  },

  velocity(radius) {
    var degree = 2 * Math.PI * Math.random();
    return this.scale([Math.sin(degree), Math.cos(degree)], (1/radius));
  },

  distance(pos1, pos2) {
    // debugger
    let disX = pos1[0] - pos2[0];
    let disY = pos1[1] - pos2[1];

    return Math.exp((Math.exp(disX, 2) + Math.exp(disY, 2)), 0.5);
  }
};

export default Util;
