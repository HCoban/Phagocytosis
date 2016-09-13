import Util from './util';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
  }

  collideWith(otherObject) {

  }

  draw(ctx) {
    ctx.fillStyle = "#000";

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollideWith(otherObject) {
    const centerDistance = Util.distance(this.pos, otherObject.pos);
    return centerDistance < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    const scale =
      timeDelta / 30,
      offsetX = this.vel[0] * scale,
      offsetY = this.vel[1] * scale;
    if (!this.game.isOutOfBounds(this.pos)) {
      this.pos = [this.pos[0] + 10, this.pos[1] + 10];
    }

    //add here bouncing
  }
}

export default Cell;
