class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.playCell = this.game.addPlayCell();
  }

  animate(time) {
    const timeDelta = time - this.prev;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.prev = time;

    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    this.bindKeyHandlers();
    this.prev = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    const playCell = this.playCell;

    Object.keys(GameView.MOVES).forEach(k => {
      let move = GameView.MOVES[k];
      key(k, () => {
        playCell.power(move);
      });
    });

    key("e", () => {
      playCell.divide(this.ctx);
    });
  }

}

GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

export default GameView;
