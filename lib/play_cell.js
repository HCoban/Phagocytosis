import Cell from './cell';
import Util from './util';

class PlayCell extends Cell {
  constructor(options) {
    options.radius = 15;
    options.vel = [0, 0];
    options.color = randomColor();
    super(options);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
}

const randomColor = () => {
  const hex = "0123456789ABCDEF";

  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random()*16)];
  }

  return color;
};

export default PlayCell;
