import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';

class OtherCell extends Cell {
  constructor(options = {}) {
    options.pos = options.game.randomPosition();
    options.radius = Math.floor(Math.random() * 25) + 5;
    options.vel = Util.velocity(options.radius);
    super(options);
  }

  move(timeDelta) {
    let vec;
    if (this.mag) {
      vec = Util.scale(Util.changeVec(this, this.game.players[0]), 5/this.radius);
    }
    else {
      if (this.nearest()) {
        vec = Util.scale(Util.changeVec(this, this.nearest()), 5/this.radius);
      } else {
        vec = Util.velocity(this.radius);
      }
    }

    let scale = timeDelta / 30;
    let offsetX = vec[0] * scale;
    let offsetY = vec[1] * scale;


    if (this.game.isOutOfBounds(this.pos)) {
      this.vel[0] = -1 * this.vel[0];
      this.vel[1] = -1 * this.vel[1];
      offsetX = this.vel[0] * scale;
      offsetY = this.vel[1] * scale;
      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    }
    if (this.mag) {
      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    } else {
      if (this.nearest()) {
        if (this.radius > this.nearest().radius) {
          this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        } else {
          this.pos = [this.pos[0] - offsetX, this.pos[1] - offsetY];
        }
      } else {
        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
      }
    }

  }


}

export default OtherCell;
