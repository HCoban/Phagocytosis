import OtherCell from './other_cell';

class Feed extends OtherCell {
  constructor(options= {}) {
    options.pos = options.game.randomPosition();
    options.radius = 5;
    options.vel = [0, 0];
    options.color = "black";
    super(options);
  }

  move(timeDelta) {

  }
}

export default Feed;
