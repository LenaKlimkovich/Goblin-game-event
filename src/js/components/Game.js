import Board from "./Board";

const game = document.getElementById('game');

export default class Game {
  constructor() {
    this.board = new Board();
    this.score = 0;
    this.missed = 0;
    this.currentIndex = -1;
    this.game = game;

    this.start();
    this.initClickHandler();
  }

  initClickHandler() {
    this.game.addEventListener('click', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell) return;

      const clickedIndex = this.board.cells.indexOf(cell);

      if (clickedIndex === this.currentIndex) {
        this.score++;
        cell.innerHTML = "";
        this.currentIndex = -1; 
      }
    });
  }

  start() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {

    if (this.currentIndex !== -1) {
      this.missed++;

      if (this.missed >= 5) {
        clearInterval(this.interval);
        alert(`Вы проиграли!`);
        return;
      }
    }

    let newIndex = this.currentIndex;
    while (newIndex === this.currentIndex) {
      newIndex = Math.floor(Math.random() * this.board.boardSize);
    }

    this.currentIndex = newIndex;
    this.board.positionGoblin(newIndex);
  }
}
