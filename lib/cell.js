import Util from './util';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color || randomColor();
  }

  collideWith(otherObject) {
    if (this.radius < otherObject.radius) {
      otherObject.radius += this.radius;
      this.remove();
    } else {
      this.radius += otherObject.radius;
      otherObject.remove();
    }
    return true;
  }

  draw(ctx) {

    ctx.fillStyle = this.color;

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

  }

  remove() {
    this.game.remove(this);
  }
}

const randomColor = () => {
  const hex = "0123456789ABCDEF";

  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random()*16)];
  }

  return color;
};


export default Cell;
