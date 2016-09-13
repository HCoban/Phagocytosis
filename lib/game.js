import Util from './util';
import OtherCell from './other_cell';
import PlayCell from './play_cell';
import Cell from './cell';

class Game {
  constructor() {
    this.otherCells = [];
    this.players = [];

    this.addOtherCells();
  }

  add(object) {
    if (object instanceof OtherCell) {
      this.otherCells.push(object);
    } else if (object instanceof PlayCell) {
      this.players.push(object);
    } else {
      //add exception
    }
  }

  addOtherCells () {
    for (var i = 0; i < Game.NUM_CELLS; i++) {
      this.add(new OtherCell ({ game: this}));
    }
  }

  addPlayCell () {
    const playCell = new PlayCell({
      pos: this.randomPosition(), //consider centering
      game: this
    });

    this.add(playCell);

    return playCell;
  }

  allObjects() {
    let allObjects = [];
    return allObjects.concat(this.players, this.otherCells);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      for (var j = 0; j < allObjects.length; j++) {
        let obj1 = allObjects[i];
        let obj2 = allObjects[j];

        if (obj1.isCollideWith(obj2) && obj1!==obj2) {
          let collision = obj1.collideWith(obj2);
          return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    if (pos[0]<0 || pos[0] > Game.DIM_X) {
      return true;
    } else if (pos[1]<0 || pos[1] > Game.DIM_Y) {
      return true;
    } else {
      return false;
    }
  }

  moveObjects(delta) {
    this.allObjects().forEach(object => {
      object.move(delta);
    });
  }

  remove(object) {
    if (object instanceof OtherCell) {
      this.otherCells.splice(this.otherCells.indexOf(object), 1);
    } else if (object instanceof PlayCell) {
      this.players.splice(this.players.indexOf(object), 1);
    } else {
      throw "object type not recognised";
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }
}

Game.BG_COLOR = "#d3d3d3";
Game.DIM_X = 200;
Game.DIM_Y = 200;
Game.NUM_CELLS = 2;

export default Game;