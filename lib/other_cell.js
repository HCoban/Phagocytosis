import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';

class OtherCell extends Cell {
  constructor(options = {}) {
    options.pos = options.game.randomPosition();
    options.radius = Math.floor(Math.random() * 50);
    options.vel = Util.velocity(options.radius);
    super(options);
  }

  move(timeDelta) {
    let scale =
      timeDelta / 30,
      offsetX = this.vel[0] * scale,
      offsetY = this.vel[1] * scale;


    if (this.game.isOutOfBounds(this.pos)) {
      this.vel[0] = -1 * this.vel[0];
      this.vel[1] = -1 * this.vel[1];
      offsetX = this.vel[0] * scale;
      offsetY = this.vel[1] * scale;
      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    }
    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

  }


}

export default OtherCell;
