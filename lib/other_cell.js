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
    let nearest;
    let min = 500;
    for (var i = 0; i < this.game.allObjects().length; i++) {
      if (this.game.allObjects()[i] !== this) {
        if (Util.distance(this.game.allObjects()[i].pos, this.pos) < min) {
          min = Util.distance(this.game.allObjects()[i].pos, this.pos);
          nearest = this.game.allObjects()[i];
        }
      }
    }
    let first;
    let second;
    if (nearest) {
      if (this.pos[0] < nearest.pos[0]) {
        first = 1 * Math.PI;
      } else {
        first = -1 * Math.PI;
      }

      if (this.pos[1] < nearest.pos[1]) {
        second = 1 * Math.PI;
      } else {
        second = -1 * Math.PI;
      }

      if (nearest.radius < this.radius) {
        this.vel = Util.scale([first, second], (5/this.radius));
      } else {
        this.vel = Util.scale([first * -1, second * -1], (5/this.radius));
      }
    }


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
