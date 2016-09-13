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
    this.prev = 0;
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
