import Cell from './cell';
import Util from './util';

class PlayCell extends Cell {
  constructor(options) {
    if (!options.radius) {
      options.radius = 15;
    }
    options.vel = [0, 0];
    super(options);
    this.maxL = 100/options.radius;
  }

  power(impulse) {
    let first = impulse[0]*Math.PI;
    let second = impulse[1]*Math.PI;
    this.vel = Util.scale([first, second], (5/this.radius));
  }

  move(timeDelta) {
    let scale = timeDelta / 30;
    let offsetX = this.vel[0] * scale;
    let offsetY = this.vel[1] * scale;
    let newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (!this.game.isOutOfBounds(newPos)) {
      this.pos = newPos;
    }

  }

  divide(ctx) {
    this.radius = this.radius/2;
    let pos = [(this.pos[0]- 5* this.radius), (this.pos[1] - 5 * this.radius)];
    console.log(this.pos);
    console.log(pos);
    let sibling = new PlayCell({radius: this.radius, pos: pos, color: "black", game: this.game});
    this.game.add(sibling);

  }
}
export default PlayCell;
