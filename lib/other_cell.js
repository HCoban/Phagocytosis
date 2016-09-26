import Util from './util';
import Cell from './cell';
import PlayCell from './play_cell';

class OtherCell extends Cell {
  constructor(options = {}) {
    options.pos = options.game.randomPosition();
    options.radius = options.game.randomRadius();
    options.vel = Util.velocity(options.radius);
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
  }

  calcPos(offsetX, offsetY) {
    if (this.mag) {
      return[this.pos[0] + offsetX, this.pos[1] + offsetY];
    } else {
      if (this.nearest()) {
        if (this.radius > this.nearest().radius) {
          return [this.pos[0] + offsetX, this.pos[1] + offsetY];
        } else {
          return [this.pos[0] - offsetX, this.pos[1] - offsetY];
        }
      } else {
        return [this.pos[0] + offsetX, this.pos[1] + offsetY];
      }
    }

  }

  move(timeDelta) {

    let vel = Util.determineVelocity(this);
    let l = timeDelta/30;
    let [offsetX, offsetY] = Util.scale(vel, l);
    let newPos = this.calcPos(offsetX, offsetY);

    if (!this.game.isOutOfBounds(newPos, this.radius)) {
      this.pos = newPos;
    } else {
      if (!this.game.isOutOfBounds([newPos[0], this.pos[1]], this.radius)) {
        this.pos = [newPos[0], this.pos[1]];
      } else if (!this.game.isOutOfBounds([this.pos[0], newPos[1]], this.radius)) {
        this.pos = [this.pos[0], newPos[1]];
      }
    }
  }

}

export default OtherCell;
