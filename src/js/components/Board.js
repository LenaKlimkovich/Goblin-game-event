import goblin from '../../pic/goblin.png';

const game = document.getElementById('game');

export default class Board {
  constructor(boardSize = 16) {
    this.boardSize = boardSize;
    this.cells = [];

    for (let i = 0; i < boardSize; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      game.appendChild(cell);
      this.cells.push(cell);
    }

    this.hero = document.createElement('img');
    this.hero.alt = 'goblin';
    this.hero.src = goblin;
  }

  positionGoblin(index) {
    this.cells[index].append(this.hero);
  }
}