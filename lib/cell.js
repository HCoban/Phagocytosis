import Util from './util';
import OtherCell from './other_cell';
// import PlayCell from './play_cell';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color || randomColor();
  }

  collideWith(otherObject) {
    let small;
    let large;
    if (this.radius < otherObject.radius) {
      small = this;
      large = otherObject;
    } else {
      small = otherObject;
      large = this;
    }

    large.radius = Math.pow(Math.pow(large.radius, 3) + Math.pow(small.radius, 3), (1/3));
    small.remove();
      // otherObject.radius += this.radius;
      // this.remove();

    //   let neighbor;
    //   let min = 500;
    //   for (var i = 0; i < this.game.allObjects().length; i++) {
    //     if (Util.distance(this.game.allObjects()[i], otherObject) < min) {
    //       min = Util.distance(this.game.allObjects()[i], otherObject);
    //       neighbor = this.game.allObjects()[i];
    //     }
    //   }
    //   if (otherObject instanceof OtherCell) {
    //     otherObject.vel = Util.velocity(this.radius, neighbor, this);
    //   }
    // } else {
    //   this.radius += otherObject.radius;
    //   otherObject.remove();
      // let neighbor;
      // let min = 500;
      // for (var i = 0; i < this.game.allObjects().length; i++) {
      //   if (Util.distance())
      //   this.game.allObjects()[i]
      // }

    return true;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
    if (this.constructor.name === "PlayCell") {
      ctx.fillStyle = "RED";
      ctx.fillText("ME", this.pos[0]-6, this.pos[1]+3);
    }
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

  nearest () {
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
    return nearest;
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
