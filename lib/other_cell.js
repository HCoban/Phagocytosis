import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';


const DEFAULTS = {
  COLOR: "#FF0000",
  RADIUS: Math.floor(Math.random() * 50)
};
class OtherCell extends Cell {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.game.randomPosition();
    options.radius = Math.floor(Math.random() * 50);
    // options.vel = [0, 0];
    options.vel = Util.velocity(options.radius);
    super(options);
  }


}

export default OtherCell;
