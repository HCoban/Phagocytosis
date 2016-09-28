import Util from './util';
import OtherCell from './other_cell';
import PlayCell from './play_cell';
import Feed from './feed';
import Cell from './cell';
import $ from 'jquery';

class Game {
  constructor() {
    this.otherCells = [];
    this.players = [];
    this.feed = [];
    this.score = 0;
    this.addOtherCells();
    let that = this;
    setInterval(that.addFeed.bind(that), 1000);
    this.increaseScore = this.increaseScore.bind(this);
    this.paused = true;
    this.canMagnetisma = "unused";
    this.canSpore = "unused";
    this.canDivide = "unused";
    this.canFlagellum = "unused";
  }

  increaseScore(r) {
    this.score += Math.round(r);
    $(".score").text(this.score);
    if(!this.paused) {
      if (this.score >100) {
        this.canFlagellum = "available";
        $(".notifications li").text("Flagellum! Press e to attack");
      } else if (this.score > 80) {
        this.canDivide = "available";
        $(".notifications li").text("Mitosis! Press e to divide and speed-up");
      } else if (this.score > 50) {
        this.canSpore = "available";
        $(".notifications li").text("Sporing! Press e to be immortal for 5 seconds");
      } else if (this.score > 5) {
        if (this.canMagnetisma === "unused") {
          this.canMagnetisma = "available";
          $(".notifications li").text("Magnetisma! Press e to attrack smaller cells");
        }
      }
    }
  }


  randomRadius() {
    let RADII = {
      medium: Math.floor(Math.random() * 10 + 10),
      small: Math.floor(Math.random() * 5 + 3)
    };
    let choice = Math.random * 100;
    if (choice < 80) {
      return RADII.small;
    } else {
      return RADII.medium;
    }
  }

  checkCoordinates(x, y, r) {
    x = (x - r < 0 || x + r > Game.DIM_X);
    y = (y - r < 0 || y + r > Game.DIM_Y);
    return [x, y];
  }

  add(object) {
    if (object instanceof Feed) {
      this.feed.push(object);
    } else if (object instanceof OtherCell) {
      this.otherCells.push(object);
    } else if (object instanceof PlayCell) {
      this.players.push(object);
    }
  }

  addOtherCells () {
    for (var i = 0; i < Game.NUM_CELLS; i++) {
      this.add(new OtherCell ({ game: this}));
    }
  }

  addPlayCell () {
    const playCell = new PlayCell({
      game: this
    });

    this.add(playCell);
    return playCell;
  }

  addFeed () {
    let feed = new Feed({
      game: this
    });

    if (this.feed.length <= 10) {
      this.add(feed);
      return feed;
    }
  }

  allObjects() {
    let allObjects = [];
    return allObjects.concat(this.players, this.otherCells, this.feed);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (var i = 0; i < allObjects.length; i++) {
      for (var j = 0; j < allObjects.length; j++) {
        let [obj1, obj2] = [allObjects[i], allObjects[j]];

        if (obj1.isCollideWith(obj2) && obj1!==obj2) {
          obj1.collideWith(obj2);
          return;
        }
      }
    }
  }

  draw(ctx) {
    {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.fillStyle = Game.BG_COLOR;
      ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

      this.allObjects().forEach(object => {
        object.draw(ctx);
      });

    }

  }

  isOutOfBounds(pos, rad) {
    if (pos[0] - rad <0 || pos[0] + rad > Game.DIM_X) {
      return true;
    } else if (pos[1] - rad <0 || pos[1] + rad > Game.DIM_Y) {
      return true;
    } else {
      return false;
    }
  }

  moveObjects(delta) {
    if (!this.paused) {
      this.allObjects().forEach(object => {
        object.move(delta);
      });
    }
  }

  remove(object) {
    if (object instanceof Feed) {
      this.feed.splice(this.feed.indexOf(object), 1);
    } else if (object instanceof OtherCell) {
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

  randomSide (width) {
    return Math.round(Math.random()) * width;
  }

  randomPosition() {
    let width = Game.DIM_X;
    let available = (width/2) - 50;
    let pos = [
      Math.abs(this.randomSide(width) - this.randomloc(available)),
      Math.abs(this.randomSide(width) - this.randomloc(available))
    ];
    return pos;
  }

  randomloc (available) {
    let loc =  Math.round(Math.random()*available);
    if (loc < 50) {
      loc = 50;
    }

    return loc;
  }

}

Game.BG_COLOR = "#d3d3d3";
Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_CELLS = 30;

export default Game;
