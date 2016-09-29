import Util from './util';
import OtherCell from './other_cell';
import $ from 'jquery';

class Cell {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color || randomColor();

  }

  compareSizes(otherObject) {
    if (this.radius > otherObject.radius) {
      return [this, otherObject];
    } else {
      return [otherObject, this];
    }
  }

  checkGameOver() {
    if (this.game.players.length == 0 || this.game.otherCells.length == 0) {
      this.gameOver();
      $("#modal").show();
      return true;
    }
  }

  collideWith(otherObject) {
    if (this.constructor.name === "PlayCell" && otherObject.constructor.name === "PlayCell") {
      return true;
    }
    let [large, small] = this.compareSizes(otherObject);

    if (large.constructor.name === "PlayCell") {
      this.game.increaseScore(otherObject.radius);
    }

    if (small.constructor.name === 'PlayCell' && small.sporing) {
      return true;
    } else {
      small.remove();
      large.grow(small);
      this.checkGameOver();
    }
    return true;
  }

  adjustCoordinate(condition, coordinate) {
    if (condition) {
      if (this.pos[coordinate] - this.radius < 0) {
        this.pos[coordinate] = this.radius;
      } else {
        this.pos[coordinate] = this.game.constructor.DIM_X - this.radius;
      }

      coordinate = this.game.checkCoordinates(this.pos[0], this.pos[1], this.radius)[0];
    }
  }

  moveInside() {
    let [x, y] = this.game.checkCoordinates(this.pos[0], this.pos[1], this.radius);
    this.adjustCoordinate(y, 1);
    this.adjustCoordinate(x, 0);
  }

  grow(small) {
    if (small.constructor.name ===  "Feed") {
      this.radius += 2;
    } else {
      this.radius = Math.pow(Math.pow(this.radius, 3) + Math.pow(small.radius, 3), (1/3));
    }
    if (this.game.isOutOfBounds(this.pos, this.radius)) {
      this.moveInside();
    }
  }

  draw(ctx) {

  }


  isCollideWith(otherObject) {
    if (this === otherObject) {
      return false;
    }
    const centerDistance = Util.distance(this.pos, otherObject.pos);
    return centerDistance < (this.radius + otherObject.radius);
  }

  gameOver () {
    if (!this.game.paused) {
      this.game.paused = true;

      $(".modal-content p").hide();
      $(".modal-content").append($("<p>").text("Game Over"));
      $(".modal-content").append($("<p>").text(`Your score: ${this.game.score}`));
      $(".start").hide();
    }
    return true;
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
