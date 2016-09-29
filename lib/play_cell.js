import Cell from './cell';
import Util from './util';
import $ from 'jquery';

class PlayCell extends Cell {
  constructor(options) {
    if (!options.radius) {
      options.radius = 15;
    }
    options.vel = [0, 0];
    options.pos = options.pos || [400, 400];
    super(options);
    this.maxL = 100/options.radius;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();

    ctx.fillStyle = "RED";
    ctx.fillText("ME", this.pos[0]-6, this.pos[1]+3);

    if (this.game.canFlagellum === "using") {

      let pos = this.game.randomPosition();
      ctx.lineTo(pos[0], pos[1]);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }

  power(impulse) {
    let first = impulse[0]*Math.PI;
    let second = impulse[1]*Math.PI;
    this.vel = Util.scale([first, second], (15/this.radius));
  }

  move(timeDelta) {
    let l = timeDelta/30;
    let [offsetX, offsetY] = Util.scale(this.vel, l);
    let newPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (!this.game.isOutOfBounds(newPos, this.radius)) {
      this.pos = newPos;
    } else {
      this.vel = [0,0];
    }
  }

  divide(ctx) {
    this.radius = this.radius/2;
    let pos = [(this.pos[0]- 2* this.radius), (this.pos[1] - 2 * this.radius)];
    let sibling = new PlayCell({radius: this.radius, pos: pos, color: "black", game: this.game});
    this.game.add(sibling);
    this.game.canDivide = "used";
  }

  magnetisma() {
    this.game.allObjects().forEach (o => {
      if (o.radius < this.radius) {
        o.mag = true;
      }
    });
    this.game.canMagnetisma = "used";
    $(".notifications li").text("Hunt smaller cells to gain special features");
  }

  spore() {
    this.game.canSpore = "used";
    let that = this;
    this.sporing = true;
    setTimeout(this.unspore.bind(that), 5000);
    $(".notifications li").text("Sporing! You are temporarily uneatable");
  }

  unspore() {
    this.sporing = false;
    $(".notifications li").text("Hunt smaller cells to gain special features");
  }

  removeFlagellum () {
    this.game.canFlagellum = "used";
    $(".notifications li").text("Hunt smaller cells to gain special features");
  }

  attack() {
    this.game.canFlagellum = "using";
    while (!this.checkGameOver()) {
      this.game.increaseScore(25);
      this.game.otherCells[0].remove();
    }
    let that = this;
    setTimeout(this.removeFlagellum.bind(that), 1000);
  }

  bonus() {
    if (this.game.canMagnetisma === "available") {
      this.magnetisma();
    } else if (this.game.canSpore === "available") {
      this.spore();
    } else if (this.game.canDivide === "available") {
      this.divide();
    } else if (this.game.canFlagellum === "available"){
      this.attack();
    }
  }
}
export default PlayCell;
