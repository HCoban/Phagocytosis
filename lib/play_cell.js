import Cell from './cell';
import Util from './util';

class PlayCell extends Cell {
  constructor(options) {
    options.radius = 15;
    options.vel = [0, 0];
    super(options);
  }

  power(impulse) {
    this.move("timeDelta", impulse);
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];
  }

  move(timeDelta, impulse) {
    // let scale = timeDelta / 30;
    // let offsetX = this.vel[0] * scale;
    // let offsetY = this.vel[1] * scale;


    if (impulse && !this.game.isOutOfBounds(this.pos)) {
      this.pos = [this.pos[0] + impulse[0], this.pos[1] + impulse[1]];
    }

  }
}
export default PlayCell;
