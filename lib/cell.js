import Util from './util';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
  }

  collideWith(otherObject) {
    console.log("collided");
    this.remove();
    return true;
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
    if (this === otherObject) {
      return false;
    }
    const centerDistance = Util.distance(this.pos, otherObject.pos);
    if (centerDistance < (this.radius + otherObject.radius)) {
      return true;
    } else {
      return false;
    }

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


    //add here bouncing
  }

  remove() {
    this.game.remove(this);
  }
}

export default Cell;
