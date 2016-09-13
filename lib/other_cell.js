import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';


const DEFAULTS = {
  COLOR: "#FF0000",
  RADIUS: 25
};
class OtherCell extends Cell {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.game.randomPosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = [0, 0];
    // options.vel = Util.velocity();
    super(options);
  }

  collideWith(otherObject) {
    console.log("collided");
    return true;
  }
}

export default OtherCell;
